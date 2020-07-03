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
// Timeout to wait before the actual resize logic is executed
var utils_1 = require('./../../core/utils');
var RESIZE_THROTTLE = 200;
/**
 * @class Tabs
 * Creates an interactive tabs component
 *
 * Example:
 * <code>
 *     <ul class="tab" role="tablist">
 *         <li id="tab1" role="tab" aria-controls="panel1" class="tab__tab"><a href="#panel1">Tab 1</a></li>
 *         <li id="tab2" role="tab" aria-controls="panel2" class="tab__tab"><a href="#panel2">Tab 2</a></li>
 *         <li id="tab3" role="tab" aria-controls="panel3" class="tab__tab"><a href="#panel3">Tab 3</a></li>
 *     </ul>
 *
 *     <div class="content-background tab__content">
 *         <div class="content tab__pane" id="panel1" role="tabpanel" aria-labelledby="tab1">
 *             <p>Tab 3</p>
 *         </div>
 *         <div class="content tab__pane" id="panel2" role="tabpanel" aria-labelledby="tab2">
 *             <p>Tab 2</p>
 *         </div>
 *         <div class="content tab__pane" id="panel3" role="tabpanel" aria-labelledby="tab3">
 *             <p>Tab 3</p>
 *         </div>
 *      </div>
 *      <script>
 *          // Load tabs component
 *          System.import('/uno/components/tabs/tabs.js').then(function (module) {
 *             // Select all <details> elements on the page
 *              var tabs = document.querySelectorAll('.tab');
 *              // Initialize all tabs
 *              for (let i = 0; i < tabs.length; i++) {
 *                 new module.Tabs(tabs.item(i));
 *              }
 *          });
 *      </script>
 * </code>
 */
var Tabs = (function () {
    function Tabs(host) {
        this.host = host;
        this._tabsWidth = 0;
        if (!host) {
            throw new Error('Host element not supplied');
        }
        this._tabs = host.querySelectorAll('.tab__tab a');
        if (this._tabs.length === 0) {
            throw new Error('No tabs found in host element');
        }
        this.setup();
    }
    Object.defineProperty(Tabs.prototype, "activeTabIndex", {
        get: function () {
            var index;
            for (var i = 0; i < this._tabs.length; i++) {
                if (this._tabs.item(i).parentElement.classList.contains('tab__tab--active')) {
                    index = i;
                    break;
                }
            }
            return index;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Deactivates all the panes of the given pane container
     * @param parent
     */
    Tabs.deactivatePanes = function (parent) {
        var elements = parent.querySelectorAll('.tab__pane');
        for (var i = 0; i < elements.length; i += 1) {
            elements.item(i).classList.remove('tab__pane--active');
        }
    };
    /**
     * Get the tab(s) which is/are currently active, there can be more than
     * one, since a cloned tab can have active state as well as the
     * original one.
     */
    Tabs.deactivateTabs = function (host) {
        var activeTabs = host.querySelectorAll('.tab__tab--active');
        if (activeTabs.length > 0) {
            // Deactivate all currently active tabs
            for (var i = 0; i < activeTabs.length; i++) {
                var activeTab = activeTabs.item(i);
                activeTab.querySelector('a').setAttribute('tabindex', '-1');
                activeTab.classList.remove('tab__tab--active');
                activeTab.setAttribute('aria-selected', 'false');
            }
        }
    };
    /**
     * Gets the target pane based on the specified href of the tab link
     * @param tab
     * @returns {HTMLElement}
     */
    Tabs.getTargetPane = function (tab) {
        var target = tab.getAttribute('href').substr(1);
        return document.getElementById(target);
    };
    /**
     * Removes references for correct GC
     */
    Tabs.prototype.destroy = function () {
        window.removeEventListener('resize', this);
        this._tabs = this.host.querySelectorAll('.tab__tab a');
        for (var i = 0; i < this._tabs.length; i++) {
            this._tabs.item(i).removeEventListener('click', this);
        }
    };
    Tabs.prototype.disableTab = function (idx) {
        if (idx === this.activeTabIndex) {
            throw new Error("Cannot disable active tab since it's active");
        }
        else {
            this.toggleEnabled(idx, false);
        }
    };
    Tabs.prototype.enableTab = function (idx) {
        this.toggleEnabled(idx, true);
    };
    /**
     * @private
     * @param {Event} event
     */
    Tabs.prototype.handleEvent = function (event) {
        if (event.currentTarget === window && event.type === 'resize') {
            this.onScreenResize();
        }
        else if (event.currentTarget.parentElement.classList.contains('tab__tab')) {
            this.onTabClick(event);
        }
    };
    Tabs.prototype.openTab = function (idx) {
        // Length -1, last tab is the 'more' tab, which should not be included
        if (idx >= 0 && idx < this._tabs.length - 1) {
            this.setActiveTab(this._tabs.item(idx));
        }
        else {
            throw new Error("Tab index " + idx + " is out of bounds");
        }
    };
    /**
     * Checks if the given tab is not disabled and is not the 'more' button
     * @param tab
     * @return {boolean}
     * @private
     */
    Tabs.prototype.canBeActivated = function (tab) {
        // 'more-tab' cannot be activated
        if (tab.classList.contains('tab__tab--more')) {
            // Toggle a classlist for keyboard navigation
            // mimics hover state
            tab.classList.toggle('tab__tab--more-open');
            return false;
        }
        else {
            this._moreTab.classList.remove('tab__tab--more-open');
        }
        // Check if we're allowed to switch to this tab
        return !tab.classList.contains('tab__tab--disabled');
    };
    /**
     * Creates a clone of every tab and moves it inside the more button
     * @private
     */
    Tabs.prototype.createClones = function () {
        var moreList = this._moreTab.querySelector('ul');
        var tabs = this.host.querySelectorAll('.tab__tab');
        for (var i = 0; i < tabs.length; i++) {
            // Copy each tab and add a --clone & --hidden modifier
            var clone = tabs.item(i).cloneNode(true);
            clone.removeAttribute('id');
            clone.classList.add('tab__tab--clone');
            clone.classList.add('tab__tab--hidden');
            moreList.appendChild(clone);
        }
    };
    /**
     * Creates a 'more' button, which can hold all clones
     * @private
     */
    Tabs.prototype.createMoreTab = function () {
        this._moreTab = utils_1.Utils.CreateNode("<li class=\"tab__tab tab__tab--more\">\n                <a href=\"\"><span class=\"tab__more-link\">Meer</span></a>\n                <ul class=\"tab__more\"></ul>\n            </li>");
        this.createClones();
        this.host.appendChild(this._moreTab);
    };
    Tabs.prototype.onScreenResize = function () {
        clearTimeout(this._resizeTimeout);
        this._resizeTimeout = window.setTimeout(this.rearrange.bind(this), RESIZE_THROTTLE);
    };
    /**
     * Event handler for the tab clicks
     * @param event
     * @private
     */
    Tabs.prototype.onTabClick = function (event) {
        // Do not scroll down
        event.preventDefault();
        this.setActiveTab(event.currentTarget);
    };
    Tabs.prototype.keyboardSwitchTabs = function (tabElement) {
        if (tabElement.key === 'ArrowLeft') {
            // let previousIndex: number = this.activeTabIndex - 1;
            var previousElement = this.getPreviousTab(); // this._tabs.item(previousIndex) as Element;
            if (previousElement) {
                this.setActiveTab(previousElement);
            }
        }
        else if (tabElement.key === 'ArrowRight') {
            // let nextIndex: number = this.activeTabIndex + 1;
            var nextElement = this.getNextTab(); // _tabs.item(nextIndex) as Element;
            // let tabbableList: Array = Array.from(this._tabs).filter((item: Element) => item.tabIndex >= 0);
            if (nextElement) {
                this.setActiveTab(nextElement);
            }
        }
    };
    Tabs.prototype.rearrange = function () {
        // Get the total available with
        var availableWidth = parseInt(getComputedStyle(this.host).width);
        // Get the with of all tabs combined
        var tabsWidth = this._tabsWidth;
        // Get all original tabs
        var tabs = this.host.querySelectorAll('.tab__tab:not(.tab__tab--clone)');
        // Get all the clones
        var clones = this.host.querySelectorAll('.tab__tab--clone');
        var numTabs = tabs.length - 1;
        tabs.item(0).style.maxWidth = '';
        // Make all original tabs visible, hide all clones
        while (--numTabs > 0) {
            tabs.item(numTabs).classList.remove('tab__tab--hidden');
            clones.item(numTabs).classList.add('tab__tab--hidden');
        }
        numTabs = tabs.length - 1;
        // Iterate over all tabs and move them one by one into the more list
        // Until it fits inside the available width or there are no more
        // tabs left.
        while (tabsWidth > availableWidth && --numTabs > 0) {
            var tab = tabs.item(numTabs), clone = clones.item(numTabs);
            tab.classList.add('tab__tab--hidden');
            clone.classList.remove('tab__tab--hidden');
            tabsWidth -= parseInt(tab.getAttribute('data-width'));
        }
        if (numTabs === 0) {
            var maxWidth = availableWidth - parseInt(this._moreTab.getAttribute('data-width'));
            tabs.item(0).style.maxWidth = maxWidth + 'px';
        }
        // IE10 does not support toggle(class, force) syntax
        if (this.host.querySelector('.tab__tab--clone:not(.tab__tab--hidden)') === null) {
            this._moreTab.classList.add('tab__tab--hidden');
        }
        else {
            this._moreTab.classList.remove('tab__tab--hidden');
        }
    };
    Tabs.prototype.setup = function () {
        window.addEventListener('resize', this);
        this.createMoreTab();
        this.storeWidths();
        this._tabs = this.host.querySelectorAll('.tab__tab a');
        var disabled = this.host.querySelectorAll('.tab__tab--disabled');
        for (var i = 0; i < disabled.length; i++) {
            disabled.item(i).setAttribute('disabled', '');
        }
        var activeTab = this.host.querySelector('.tab__tab--active a');
        for (var i = 0; i < this._tabs.length; i++) {
            this._tabs.item(i).addEventListener('click', this);
            this._tabs.item(i).addEventListener('keyup', this.keyboardSwitchTabs.bind(this));
            this._tabs.item(i).setAttribute('tabindex', '-1');
        }
        // If no active tab is set, set first tab as active
        this.setActiveTab(activeTab || this._tabs.item(0));
        this.rearrange();
    };
    /**
     * Returns the requested tab element when not hidden, otherwise returns the clone of the tab element.
     * @param tabs The NodeList with tab elements.
     * @param clones The NodeList with clones of the tab elements.
     * @param index the index of the requested Tab element.
     * @private
     */
    Tabs.prototype.getTabElement = function (tabs, clones, index) {
        var isTabHidden = tabs[index].classList.contains('tab__tab--hidden');
        var tab = isTabHidden ? clones[index] : tabs[index];
        return tab.firstChild;
    };
    /**
     * Returns the first active tab element after the current tab element.
     * @private
     */
    Tabs.prototype.getNextTab = function () {
        var tabs = this.host.querySelectorAll('.tab__tab:not(.tab__tab--clone):not(.tab__tab--more)');
        var clones = this.host.querySelectorAll('.tab__tab--clone');
        var nextTab = this.activeTabIndex + 1;
        var tabIndex = (nextTab < tabs.length) ? nextTab : 0;
        for (var i = tabIndex; i < tabs.length; i += 1) {
            if (this.canBeActivated(utils_1.Utils.FindParentContainingClass(tabs.item(i), 'tab__tab', this.host))) {
                return this.getTabElement(tabs, clones, i);
            }
        }
        return null;
    };
    /**
     * Returns the first active tab element before the current tab element.
     * @private
     */
    Tabs.prototype.getPreviousTab = function () {
        var tabs = this.host.querySelectorAll('.tab__tab:not(.tab__tab--clone )');
        var clones = this.host.querySelectorAll('.tab__tab--clone');
        var prevTab = this.activeTabIndex - 1;
        var tabIndex = (prevTab >= 0) ? prevTab : tabs.length - 1;
        for (var i = tabIndex; i >= 0; i -= 1) {
            if (this.canBeActivated(utils_1.Utils.FindParentContainingClass(tabs.item(i), 'tab__tab', this.host))) {
                return this.getTabElement(tabs, clones, i);
            }
        }
        return null;
    };
    /**
     * Sets the tab__pane active which is linked to the given element. The
     * tab__pane should have the id as specified in the url of the tab
     * @param el The a-tag in the .tab__tab element
     * @private
     */
    Tabs.prototype.setActiveTab = function (el) {
        // Select the node with ID target
        var pane = Tabs.getTargetPane(el), 
        // Get the clicked tab
        tab = utils_1.Utils.FindParentContainingClass(el, 'tab__tab', this.host);
        if (!this.canBeActivated(tab)) {
            return;
        }
        Tabs.deactivateTabs(this.host);
        // Remove active states from panes
        Tabs.deactivatePanes(utils_1.Utils.FindParentContainingClass(pane.parentElement, 'tab__content', this.host));
        // Set all tabs with the same target as active
        var target = el.getAttribute('href'), tabs = this.host.querySelectorAll("a[href=\"" + target + "\"]");
        for (var i = 0; i < tabs.length; i++) {
            tab = utils_1.Utils.FindParentContainingClass(tabs.item(i), 'tab__tab', this.host);
            tabs.item(i).removeAttribute('tabindex');
            // Set active state to current tab / pane
            tab.classList.add('tab__tab--active');
            tab.setAttribute('aria-selected', 'true');
            if (tab.parentElement.classList.contains('tab__more')
                && !tab.classList.contains('tab__tab--hidden')) {
                this._moreTab.classList.add('tab__tab--more-open');
            }
        }
        el.focus();
        pane.classList.add('tab__pane--active');
    };
    /**
     * Stores the width of each tab and calculates the total width
     * @private
     */
    Tabs.prototype.storeWidths = function () {
        // Switch to setup mode so all tabs are placed next to each other
        this.host.classList.add('tab--setup');
        var tabs = this.host.querySelectorAll('.tab__tab:not(.tab__tab--clone)');
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs.item(i);
            var width = Math.ceil(parseFloat(getComputedStyle(tab).width));
            width += Math.ceil(parseFloat(getComputedStyle(tab).marginLeft));
            width += Math.ceil(parseFloat(getComputedStyle(tab).marginRight));
            this._tabsWidth += width;
            tab.setAttribute('data-width', width.toString());
        }
        this.host.classList.remove('tab--setup');
    };
    Tabs.prototype.toggleEnabled = function (idx, enabled) {
        if (idx >= 0 && idx < this._tabs.length - 1) {
            var tabs = this.host.querySelectorAll('.tab__tab:not(.tab__tab--clone)'), clones = this.host.querySelectorAll('.tab__tab--clone'), classListAction = enabled ? 'remove' : 'add';
            if (enabled) {
                tabs.item(idx).removeAttribute('disabled');
                clones.item(idx).removeAttribute('disabled');
            }
            else {
                tabs.item(idx).setAttribute('disabled', '');
                clones.item(idx).setAttribute('disabled', '');
            }
            tabs.item(idx).classList[classListAction]('tab__tab--disabled');
            tabs.item(idx).querySelector('a').setAttribute('tabindex', enabled ? (0).toString() : (-1).toString());
            clones.item(idx).classList[classListAction]('tab__tab--disabled');
            clones.item(idx).querySelector('a').setAttribute('tabindex', enabled ? (0).toString() : (-1).toString());
        }
        else {
            throw new Error("Tab index " + idx + " is out of bounds");
        }
    };
    return Tabs;
})();
exports.Tabs = Tabs;
