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
var SlideToggle_1 = require('../../core/animations/SlideToggle');
var utils_1 = require('./../../core/utils');
var TOGGLE_CLASS = 'collapse__details--open';
var TOGGLE_TITLE_CLASS = 'collapse__title--open';
/**
 * @class Collapse
 * Creates a summary / details like element, which opens the details on click
 * of the title.
 * Example:
 * <code>
 *     <div class="collapse">
 *          <div x-uno-collapse>
 *              <i class="collapse__indicator"></i>
 *              <span class="collapse__title">Titel van collapse</span>
 *          </div>
 *          <div class="collapse__details">
 *              Humani generiss sunt dominas de nobilis compater.
 *              Cliniass cadunt in audax cirpi! Est placidus urbs, cesaris.
 *          </div>
 *      </div>
 *      <script>
 *          // Load collapse component
 *          System.import('/uno/components/collapse/collapse.js').then(function (module) {
 *             // Select all <details> elements on the page
 *              var collapses = document.querySelectorAll('[x-uno-collapse]');
 *              // Initialize all collapses
 *              for (var i = 0; i < collapses.length; i++) {
 *                 new module.Collapse(collapses.item(i));
 *              }
 *          });
 *      </script>
 * </code>
 */
var Collapse = (function () {
    /**
     * @constructor
     * @param host Element The element which contains a x-uno-collapse attribute
     */
    function Collapse(host) {
        var _this = this;
        this.host = host;
        if (!host) {
            return;
        }
        if (this.host.hasOwnProperty('unoCollapse')) {
            // This element is already initialized
            return;
        }
        this.host.unoCollapse = true;
        if (!host.hasAttribute('x-uno-collapse')) {
            // The attribute is mandatory
            host.setAttribute('x-uno-collapse', '');
        }
        if (host.hasAttribute('data-collapse-target')) {
            console.warn('[data-collapse-target] is deprecated and will be removed in version 4 in favor of [x-uno-collapse-target]');
        }
        if (host.hasAttribute('data-collapse-group')) {
            console.warn('[data-collapse-group] is deprecated and will be removed in version 4 in favor of [x-uno-collapse-group]');
        }
        this.details = this.findTarget(host);
        this.host.addEventListener('click', this);
        this.host.addEventListener('keydown', this);
        this.host.addEventListener('collapse-open', this);
        this.host.addEventListener('collapse-close', this);
        this.details.addEventListener('keydown', function (event) {
            if (utils_1.Utils.IsKeyPressed(event, 'Escape') || utils_1.Utils.IsKeyPressed(event, '')) {
                _this.close();
            }
            if (utils_1.Utils.IsKeyPressed(event, 'Tab')) {
                utils_1.Utils.FocusChild(event, _this.details.querySelectorAll('li a'));
            }
        });
        this.setupAnimation();
        this.groupCollapses(host);
    }
    /**
     * Closes the collapse
     */
    Collapse.prototype.close = function () {
        if (this.details.classList.contains(TOGGLE_CLASS)) {
            var event_1 = document.createEvent('CustomEvent');
            event_1.initCustomEvent('collapse-close', true, true, this.details);
            this.host.dispatchEvent(event_1);
            var hostElement = this.host;
            hostElement.focus();
        }
    };
    /**
     * Opens the collapse
     */
    Collapse.prototype.open = function () {
        if (!this.details.classList.contains(TOGGLE_CLASS)) {
            var event_2 = document.createEvent('CustomEvent');
            event_2.initCustomEvent('collapse-open', true, true, this.details);
            this.host.dispatchEvent(event_2);
            this.focusFirstChild();
        }
    };
    /**
     * Focuses the first child
     */
    Collapse.prototype.focusFirstChild = function () {
        var firstChild = this.details.querySelector('li a');
        if (firstChild) {
            firstChild.focus();
        }
    };
    /**
     * Removes all references to allow GC
     */
    Collapse.prototype.destroy = function () {
        var _this = this;
        this.host.removeEventListener('collapse-open', this);
        this.host.removeEventListener('collapse-close', this);
        this.host.removeEventListener('click', this);
        this.host.removeEventListener('keydown', this);
        delete this.host.unoCollapse;
        this.details.removeEventListener('keydown', this);
        this.details.removeEventListener('uno-animation-end', this);
        this.details.removeEventListener('uno-animation-progress', this);
        if (this.groupedCollapses) {
            this.groupedCollapses.forEach(function (collapse) {
                collapse.removeEventListener('collapse-open', _this);
            });
            this.groupedCollapses = null;
        }
    };
    /**
     * Handles all events for this component
     * @private
     * @param {Event} event
     */
    Collapse.prototype.handleEvent = function (event) {
        switch (event.currentTarget) {
            case this.host:
                switch (event.type) {
                    case 'click':
                        this.onTitleClick();
                        break;
                    case 'keydown':
                        this.onTitleKeyDown(event);
                        break;
                    case 'collapse-open':
                        this.onCollapseOpen(event);
                        break;
                    case 'collapse-close':
                        this.onCollapseClose(event);
                        break;
                    default:
                }
                break;
            case this.details:
                var eventType = utils_1.Utils.CamelCase(event.type);
                this[("onDetails" + eventType)](event);
                break;
            default:
                if (event.type === 'collapse-open') {
                    this.onCollapseGroupOpen(event);
                }
        }
    };
    /**
     * Opens / closes the details. The open / close is done through the
     * animation class.
     */
    Collapse.prototype.toggle = function () {
        this.details = this.findTarget(this.host);
        if (this.details.classList.contains(TOGGLE_CLASS)) {
            this.close();
        }
        else {
            this.open();
        }
    };
    Collapse.prototype.onCollapseOpen = function (event) {
        if (!event.defaultPrevented) {
            this.animate.toggle(true);
        }
    };
    Collapse.prototype.onCollapseClose = function (event) {
        if (!event.defaultPrevented) {
            this.animate.toggle(false);
        }
    };
    /**
     * Called when a collapse in the same group is opened. Close other collapses
     * @param {CustomEvent} evt
     */
    Collapse.prototype.onCollapseGroupOpen = function (evt) {
        if (evt.currentTarget !== this.host && evt.detail !== this.details) {
            this.close();
        }
    };
    /**
     * Called when the user clicks the .collapse__title
     */
    Collapse.prototype.onTitleClick = function () {
        this.toggle();
    };
    /**
     * Add keyboard support, toggle details on ENTER or SPACE key
     * @param event
     */
    Collapse.prototype.onTitleKeyDown = function (event) {
        if (utils_1.Utils.IsKeyPressed(event, 'Enter') || utils_1.Utils.IsKeyPressed(event, ' ')) {
            event.preventDefault();
            this.toggle();
        }
    };
    /**
     * Callback for when the animation has finished
     */
    Collapse.prototype.onDetailsUnoAnimationEnd = function () {
        // Update aria attributes
        var isVisible = this.details.classList.contains(TOGGLE_CLASS);
        this.host.classList.remove(TOGGLE_TITLE_CLASS);
        if (isVisible) {
            this.host.classList.add(TOGGLE_TITLE_CLASS);
        }
        this.host.setAttribute('aria-expanded', isVisible.toString());
        this.details.setAttribute('aria-expanded', isVisible.toString());
    };
    Collapse.prototype.onDetailsUnoAnimationProgress = function (event) {
        this.detailsSibling.style.paddingTop = Math.round(event.detail) + 'px';
    };
    /**
     * Finds the target for the collapse. The collapse is either found by
     * - id, specified in x-uno-collapse-target
     * - id, specified in data-collapse-target
     * - location in dom, next to the host.
     * @param host
     * @return {HTMLElement}
     */
    Collapse.prototype.findTarget = function (host) {
        var target;
        if (host.hasAttribute('x-uno-collapse-target')) {
            target = document.getElementById(host.getAttribute('x-uno-collapse-target'));
        }
        else if (host.hasAttribute('data-collapse-target')) {
            // For backwards compatibility
            target = document.getElementById(host.getAttribute('data-collapse-target'));
        }
        else if (host.nextElementSibling && host.nextElementSibling.classList.contains('collapse__details')) {
            target = host.nextElementSibling;
        }
        if (!target) {
            throw new Error("Collapse cannot find collapse target");
        }
        // Set an id if not present. This is needed for ARIA attributes
        if (!target.hasAttribute('id')) {
            target.setAttribute('id', utils_1.Utils.GenerateUID());
        }
        if (target.classList.contains(TOGGLE_CLASS)) {
            this.host.classList.add(TOGGLE_TITLE_CLASS);
        }
        this.setAria(target);
        return target;
    };
    /**
     * Groups all collapses bases on either
     * - An attribute on each collapse, containing a group identifier (x-uno-collapse-group="{GROUPNAME}")
     * - An attribute on a wrapping element, containing the attribute x-uno-collapse
     * @param host
     */
    Collapse.prototype.groupCollapses = function (host) {
        var collapses, groupAttributes = ['x-uno-collapse-group', 'data-collapse-group'], hostHasGroupAttribute = false;
        // Check both flavors for backwards compatibility
        groupAttributes.forEach(function (attribute) {
            if (host.hasAttribute(attribute)) {
                var groupId = host.getAttribute(attribute);
                collapses = document.querySelectorAll("[" + attribute + "=\"" + groupId + "\"]");
                hostHasGroupAttribute = true;
            }
        });
        if (!hostHasGroupAttribute) {
            // Group attribute not found on host, traverse the dom up to the
            // <body> tag, checking if any parent contains the group attribute.
            while (host.parentElement && !collapses) {
                host = host.parentElement;
                groupAttributes.forEach(function (attribute) {
                    if (host.hasAttribute(attribute)) {
                        // Group found, select all collapses inside group element
                        collapses = host.querySelectorAll("[x-uno-collapse]");
                    }
                });
            }
        }
        if (collapses) {
            this.groupedCollapses = [];
            for (var i = 0; i < collapses.length; i++) {
                this.groupedCollapses.push(collapses.item(i));
                collapses.item(i).addEventListener('collapse-open', this);
            }
        }
    };
    Collapse.prototype.setupAnimation = function () {
        this.animate = new SlideToggle_1.SlideToggle(this.details);
        this.animate.toggleClass = TOGGLE_CLASS;
        this.animate.animationDuration = 1;
        this.details.addEventListener('uno-animation-end', this);
        if (this.details.nodeName.toLowerCase() === 'tr') {
            // We're animating a table, some extra work required here
            this.details.addEventListener('uno-animation-progress', this);
            this.detailsSibling = document.createElement('tr');
            this.detailsSibling.classList.add('collapse__table-divider');
            this.detailsSibling.innerHTML = '<td></td>';
            if (this.details.nextElementSibling) {
                this.details.parentNode.insertBefore(this.detailsSibling, this.details.nextElementSibling);
            }
            else {
                this.details.parentNode.appendChild(this.detailsSibling);
            }
            this.detailsSibling = this.detailsSibling.firstElementChild;
        }
    };
    /**
     * Adds aria attributes to host & target element
     */
    Collapse.prototype.setAria = function (target) {
        var open = target.classList.contains(TOGGLE_CLASS);
        target.setAttribute('aria-expanded', open.toString());
        // Do not override default region
        if (!target.hasAttribute('role')) {
            target.setAttribute('role', 'region');
        }
        this.host.setAttribute('role', 'button');
        this.host.setAttribute('tabindex', '0');
        this.host.setAttribute('aria-expanded', open.toString());
        this.host.setAttribute('aria-controls', target.getAttribute('id'));
    };
    return Collapse;
})();
exports.Collapse = Collapse;
