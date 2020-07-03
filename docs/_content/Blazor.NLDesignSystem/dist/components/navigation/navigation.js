/*!
NL Design System Componenten library 0.1.1, build date 27-06-2020
Copyright 2011-2020 The NL Design System Authors
Copyright 2011-2020 Duo
Author: DUO & The NL Design System Authors
Author URI: https://nl-design-system.gitlab.io/nl-design-system/
License: EUPL v1.2
License URL: https://joinup.ec.europa.eu/software/page/eupl5
Version: 0.1.1
*/
var utils_1 = require('../../core/utils');
var RESIZE_THROTTLE = 200;
/**
 * All screens lower than this will always show a hamburger
 * @type {number}
 */
var MOBILE_WIDTH = 544;
/**
 * @class AutoResizeNavigation
 * Creates an navigation component that automatically puts items in a menu to fit in the available width
 *
 * Example:
 *
 * <code>
 *   <div>
 *      <nav class="nav nav--simple nav--donkergeel">
 *          <div class="container">
 *               <div class="nav-autoresize">
 *                   <ul class="nav">
 *                       <li class="nav__item">
 *                            <a class="nav__link" href="#">Core</a>
 *                       </li>
 *                       <li class="nav__item">
 *                            <a class="nav__link nav__link--active" href="#">Componenten</a>
 *                       </li>
 *                       <li class="nav__item">
 *                           <a class="nav__link" href="#">Changelog</a>
 *                       </li>
 *                    </ul>
 *               </div>
 *           </div>
 *       </nav>
 *    </div>
 *    <script>
 *      // Load nav component
 *      System.import('/uno/components/navigation/navigation.js').then(function (module) {
 *      var navs = document.querySelectorAll('.nav-autoresize > ul');
 *      // Initialize all navs
 *      for (let i = 0; i < navs.length; i++) {
 *          new module.AutoResizeNavigation(navs.item(i));
 *      }
 *      });
 *    </script>
 * </code>
 */
var AutoResizeNavigation = (function () {
    function AutoResizeNavigation(host) {
        this.host = host;
        this._navWidth = 0;
        if (!host) {
            throw new Error('host element not defined');
        }
        if (!host.classList.contains('top-nav-autoresize')) {
            throw new Error('host element should have class top-nav-autoresize');
        }
        if (!utils_1.Utils.FindParentContainingClass(host, 'container', document.body)) {
            throw new Error('Autoresize navigation should be in parent with class container');
        }
        if (!host.querySelector('ul.nav')) {
            throw new Error('host element should have child ul with class nav');
        }
        this._ul = host.querySelector('ul.nav');
        this._setup();
    }
    /**
     * Creates a 'more' button, which can hold all clones
     * @private
     */
    AutoResizeNavigation.prototype._createMoreNav = function () {
        this._moreNav = document.createElement('li');
        this._moreNav.classList.add('nav__item');
        this._moreNav.classList.add('nav__item--more');
        // Put the text in a separate span to fix underlining / positioning
        // of arrow
        this._moreNav.innerHTML = "\n            <a href=\"#\" class=\"nav__link nav__link--more\">Meer</a>\n            <ul class=\"nav__more\"></ul>";
        this._createClones();
        this._ul.appendChild(this._moreNav);
        this._navClickListener = this._navClassToggle(this._moreNav, 'nav__item--more-open').bind(this);
        this._moreNav.querySelector('a').addEventListener('click', this._navClickListener);
    };
    AutoResizeNavigation.prototype._navClassToggle = function (element, cssClass) {
        return function (event) {
            event.preventDefault();
            event.stopPropagation();
            element.classList.toggle(cssClass);
        };
    };
    AutoResizeNavigation.prototype._onWindowClick = function () {
        this._moreNav.classList.remove('nav__item--more-open');
    };
    AutoResizeNavigation.prototype._setup = function () {
        this.resizeListener = this._onScreenResize.bind(this);
        this.windowClickListener = this._onWindowClick.bind(this);
        window.addEventListener('resize', this.resizeListener);
        window.addEventListener('click', this.windowClickListener);
        this._createMoreNav();
        this._storeWidths();
        this._setFlexClasses();
        // Add negative tabindex to all disabled navs to prevent keyboard nav
        var disabled = this._ul.querySelectorAll('.nav__item--disabled');
        for (var i = 0; i < disabled.length; i++) {
            disabled.item(i).querySelector('a').setAttribute('tabindex', '-1');
        }
        this._rearrange();
    };
    AutoResizeNavigation.prototype._setFlexClasses = function () {
        var el = this.host;
        while (el.nextElementSibling) {
            el = el.nextElementSibling;
            el.classList.add('autoresize__sibling');
        }
        el = this.host;
        while (el.previousElementSibling) {
            el = el.previousElementSibling;
            el.classList.add('autoresize__sibling');
        }
    };
    AutoResizeNavigation.prototype._rearrange = function () {
        this.host.classList.add('top-nav-autoresize--setup');
        // Get the total available width
        var availableWidth = parseInt(getComputedStyle(this._ul).width);
        this.host.classList.remove('top-nav-autoresize--setup');
        if (document.body.offsetWidth <= MOBILE_WIDTH) {
            // Set available width to 0, so all items are forced inside
            // the hamburger
            availableWidth = 0;
        }
        // Get the width of all navs combined
        var navsWidth = this._navWidth;
        // Get all original navs
        var navs = this._ul.querySelectorAll('.nav__item:not(.nav__item--clone)');
        // Get all the clones
        var clones = this._ul.querySelectorAll('.nav__item--clone');
        var numNavs = navs.length - 1;
        navs.item(0).style.maxWidth = '';
        // Make all original navs visible, hide all clones
        while (--numNavs > 0) {
            navs.item(numNavs).classList.remove('nav__item--hidden');
            clones.item(numNavs).classList.add('nav__item--hidden');
        }
        numNavs = navs.length - 1;
        // Iterate over all navs and move them one by one into the more list
        // Until it fits inside the available width or there are no more
        // navs left.
        var numHidden = 0;
        while (navsWidth > availableWidth && --numNavs > 0) {
            var nav = navs.item(numNavs), clone = clones.item(numNavs);
            nav.classList.add('nav__item--hidden');
            clone.classList.remove('nav__item--hidden');
            numHidden++;
            navsWidth -= parseInt(nav.getAttribute('data-width'));
        }
        if (numNavs === 0) {
            // also put last item in more menu
            this._moreNav.querySelector('.nav__link--more').innerHTML = 'MENU';
            navs.item(0).classList.add('nav__item--hidden');
            clones.item(0).classList.remove('nav__item--hidden');
            this._moreNav.classList.add('nav__item--minified');
        }
        else {
            this._moreNav.querySelector('.nav__link--more').innerHTML = 'Meer';
            navs.item(0).classList.remove('nav__item--hidden');
            clones.item(0).classList.add('nav__item--hidden');
            this._moreNav.classList.remove('nav__item--minified');
        }
        // IE10 does not support toggle(class, force) syntax
        if (this._ul.querySelector('.nav__item--clone:not(.nav__item--hidden)') === null) {
            this._moreNav.classList.add('nav__item--hidden');
        }
        else {
            this._moreNav.classList.remove('nav__item--hidden');
        }
    };
    /**
     * Creates a clone of every nav and moves it inside the more button
     * @private
     */
    AutoResizeNavigation.prototype._createClones = function () {
        var moreList = this._moreNav.querySelector('ul');
        var navs = this._ul.querySelectorAll('.nav__item');
        for (var i = 0; i < navs.length; i++) {
            // Copy each nav item and add a --clone & --hidden modifier
            var clone = navs.item(i).cloneNode(true);
            clone.removeAttribute('id');
            clone.classList.add('nav__item--clone');
            clone.classList.add('nav__item--hidden');
            moreList.appendChild(clone);
        }
    };
    AutoResizeNavigation.prototype._onScreenResize = function () {
        clearTimeout(this._resizeTimeout);
        this._resizeTimeout = window.setTimeout(this._rearrange.bind(this), RESIZE_THROTTLE);
    };
    /**
     * Stores the width of each nav and calculates the total width
     * @private
     */
    AutoResizeNavigation.prototype._storeWidths = function () {
        this.host.classList.add('top-nav-autoresize--setup');
        var navs = this._ul.querySelectorAll('.nav__item:not(.nav__item--clone)');
        for (var i = 0; i < navs.length; i++) {
            var nav = navs.item(i);
            var width = Math.ceil(parseFloat(getComputedStyle(nav).width));
            width += Math.ceil(parseFloat(getComputedStyle(nav).marginLeft));
            width += Math.ceil(parseFloat(getComputedStyle(nav).marginRight));
            this._navWidth += width;
            nav.setAttribute('data-width', width.toString());
        }
        this.host.classList.remove('top-nav-autoresize--setup');
    };
    /**
     * Removes references for correct GC
     */
    AutoResizeNavigation.prototype.destroy = function () {
        window.removeEventListener('resize', this.resizeListener);
        window.removeEventListener('click', this.windowClickListener);
        this._moreNav.querySelector('a').removeEventListener('click', this._navClickListener);
    };
    return AutoResizeNavigation;
})();
exports.AutoResizeNavigation = AutoResizeNavigation;
var SubMenuNavigation = (function () {
    function SubMenuNavigation(host) {
        this.host = host;
        if (!host) {
            throw new Error('host element not defined');
        }
        if (!host.classList.contains('nav--submenu')) {
            throw new Error('host element should have class nav--submenu');
        }
        if (!utils_1.Utils.FindParentContainingClass(host, 'container', document.body)) {
            throw new Error('Submenu navigation should be in parent with class container');
        }
        if (!host.querySelector('li.nav__item--parent')) {
            throw new Error('host element should have child li with class nav__item--parent');
        }
        var parentItems = host.querySelectorAll('.nav__item--parent');
        for (var k = 0; k < parentItems.length; k++) {
            var parentItem = parentItems.item(k);
            if (!parentItem.querySelector('a.nav__link--parent')) {
                throw new Error('host element should have child a with class nav__link--parent');
            }
            if (!parentItem.querySelector('ul.nav__submenu')) {
                throw new Error('host element should have child ul with class nav__submenu');
            }
            this._navClickListener = this._navClassToggle(parentItem, 'nav__item--parent-open').bind(this);
            parentItem.querySelector('a').addEventListener('click', this._navClickListener);
            this.windowClickListener = this._navClassRemove(parentItem, 'nav__item--parent-open').bind(this);
            window.addEventListener('click', this.windowClickListener);
        }
    }
    SubMenuNavigation.prototype._navClassToggle = function (element, cssClass) {
        return function (event) {
            event.preventDefault();
            event.stopPropagation();
            element.classList.toggle(cssClass);
        };
    };
    SubMenuNavigation.prototype._navClassRemove = function (element, cssClass) {
        return function () {
            element.classList.remove(cssClass);
        };
    };
    /**
     * Removes references for correct GC
     */
    SubMenuNavigation.prototype.destroy = function () {
        var parentItems = this.host.querySelectorAll('.nav__item--parent');
        for (var k = 0; k < parentItems.length; k++) {
            var parentItem = parentItems.item(k);
            parentItem.querySelector('a').removeEventListener('click', this._navClickListener);
        }
        window.removeEventListener('click', this.windowClickListener);
    };
    return SubMenuNavigation;
})();
exports.SubMenuNavigation = SubMenuNavigation;
