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
var ARROW_HEIGHT = 15;
var MOBILE_BREAKPOINT = 768;
// Template for our tooltip
var TOOLTIP = "\n<div class=\"tooltip\" hidden x-uno-tooltip-window>\n    <div class=\"tooltip__backdrop\"></div>\n    <div class=\"tooltip__window\">\n        <div class=\"tooltip__body\" role=\"status\"></div>\n        <div class=\"tooltip__footer\" tabindex=\"0\">\n            <button class=\"tooltip__close-button\"><span class=\"icon icon-cross\" role=\"presentation\"></span>sluit</button>\n        </div>\n    </div>\n</div>";
/**
 * Abstract class for tooltips.
 */
var Tooltip = (function () {
    function Tooltip(host) {
        this.host = host;
        this.isHover = false;
        this.hostEvents = [];
        if (!host.hasAttribute('title')) {
            throw new Error("Tooltip is missing a title attribute");
        }
        this._content = host.getAttribute('title');
        host.removeAttribute('title');
        host.classList.add('tooltip-trigger');
        this.stylesheet = this.createStyleSheet().sheet;
        var wrapper = document.createElement('div');
        wrapper.innerHTML = TOOLTIP;
        wrapper.setAttribute('aria-live', 'polite');
        this.container = wrapper.firstElementChild;
        this._parent = wrapper;
        this._parent.classList.add('tooltip__parent');
        this._tooltip = this.container.querySelector('.tooltip__window');
        var closeButton = this.container.querySelector('.tooltip__close-button');
        this.setHover();
        this.addListener(host, 'click', this.onHostClick.bind(this));
        this.addListener(host, 'mouseover', this.onHostMouseOver.bind(this));
        this.addListener(host, 'mouseout', this.onHostMouseOut.bind(this));
        this.addListener(host, 'focus', this.onFocus.bind(this));
        this.addListener(host, 'blur', this.onBlur.bind(this));
        this.addListener(closeButton, 'click', this.onClick.bind(this));
        host.parentNode.insertBefore(this._parent, host.nextSibling);
    }
    Object.defineProperty(Tooltip.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (value) {
            this._content = value ? value : '';
        },
        enumerable: true,
        configurable: true
    });
    Tooltip.prototype.setContent = function () {
        var tooltipBody = this.container.querySelector('.tooltip__body');
        if (tooltipBody) {
            tooltipBody.innerHTML = this._content;
        }
    };
    Tooltip.prototype.setHover = function () {
        if (window.matchMedia('(min-width: 768px)').matches) {
            this.openOnHover = true;
        }
        else {
            this.openOnHover = false;
        }
    };
    Tooltip.prototype.onClick = function (evt) {
        this.hide();
    };
    /**
     * Called when the user clicks the host. Set hover to false to prevent mouse
     * Mouse move events
     * @param evt
     */
    Tooltip.prototype.onHostClick = function (evt) {
        if (!this.openOnHover) {
            this.isHover = false;
            this.show();
        }
    };
    Tooltip.prototype.onFocus = function (evt) {
        this.show();
    };
    Tooltip.prototype.onBlur = function (evt) {
        this.hide();
    };
    /**
     * Called when the user hovers over the host component, cancelled when a
     * touch event precedes this event.
     * @param evt
     */
    Tooltip.prototype.onHostMouseOver = function (evt) {
        if (!this.openOnHover) {
            evt.preventDefault();
        }
        else {
            this.isHover = true;
            this.show();
        }
    };
    /**
     * Called when the mouse leaves the component, cancelled when a touch event
     * precedes this event
     * @param evt
     */
    Tooltip.prototype.onHostMouseOut = function (evt) {
        if (!this.openOnHover) {
            evt.preventDefault();
        }
        else if (this.isHover) {
            this.hide();
        }
    };
    Tooltip.prototype.destroy = function () {
        // Stop listening for events
        this.hide();
        this.hostEvents.forEach(function (ref) {
            ref.element.removeEventListener(ref.event, ref.listener);
        });
        this.hostEvents = [];
    };
    /**
     * Hides the tooltip and restores the focus
     */
    Tooltip.prototype.hide = function () {
        this.container.classList.remove('tooltip--open');
        this.container.setAttribute('hidden', '');
        // op kleine schermen waar een backdrop getoond wordt, scroll onderdrukken
        if (!(window.matchMedia('(min-width: 768px)').matches)) {
            document.querySelector('body').classList.remove('no-scroll');
        }
        this.isHover = false;
    };
    Tooltip.prototype.show = function () {
        var openTooltips = document.querySelectorAll('.tooltip--open');
        for (var i = 0; i < openTooltips.length; i++) {
            var e = openTooltips[i];
            while (e.classList.contains('tooltip--open')) {
                e.classList.remove('tooltip--open');
            }
        }
        this.container.classList.add('tooltip--open');
        this.container.removeAttribute('hidden');
        this.setContent();
        var tooltipPosition = this.positionElement(this.host, this._tooltip);
        this._tooltip.classList.remove("tooltip__window--top");
        this._tooltip.classList.remove("tooltip__window--bottom");
        this._tooltip.classList.add("tooltip__window--" + tooltipPosition);
        // Trigger reflow
        /* tslint:disable */
        void this.host.offsetWidth;
        /* tslint:enable */
        // Now animate
        this._tooltip.classList.add('tooltip__window--animate');
        this._tooltip.classList.add('tooltip__window--show');
        if (!this.openOnHover) {
            this._tooltip.querySelector('.tooltip__close-button').focus();
        }
        // op kleine schermen waar een backdrop getoond wordt, scroll onderdrukken
        if (!(window.matchMedia('(min-width: 768px)').matches)) {
            document.querySelector('body').classList.add('no-scroll');
        }
    };
    /**
     * Creates a stylesheet in the head section of the page. Only 1 stylesheet
     * per page will be created
     * @return {HTMLStyleElement}
     */
    Tooltip.prototype.createStyleSheet = function () {
        var sheet = document.querySelector('style[x-uno-tooltip-stylesheet]');
        if (!sheet) {
            sheet = document.createElement('style');
            sheet.setAttribute('x-uno-tooltip-stylesheet', '');
            document.head.appendChild(sheet);
        }
        return sheet;
    };
    /**
     * Calculates the position of the tooltip
     */
    Tooltip.prototype.positionElement = function (host, target) {
        if (window.innerWidth > MOBILE_BREAKPOINT) {
            // pre existing rule might no longer be valid, so always remove
            // if necessary it will be added later
            if (this.stylesheet.rules && this.stylesheet.rules.length > 0) {
                this.stylesheet.removeRule(0);
            }
            var tooltipHeight = parseInt(getComputedStyle(target).height);
            var tooltipWidth = parseInt(getComputedStyle(target).width);
            var bodyRect = document.body.getBoundingClientRect();
            var hostRect = host.getBoundingClientRect();
            var tooltipPosition = 'top';
            // Calculate desired tooltip position. Default is above the host
            var x = -hostRect.width / 2 - tooltipWidth / 2;
            var y = -tooltipHeight - ARROW_HEIGHT - 20;
            var dx; // variable used if position is too much to the left or right
            if (hostRect.top - tooltipHeight < 10) {
                // Not enough space at the top, position below the host
                y = hostRect.height;
                tooltipPosition = 'bottom';
            }
            if (hostRect.right + x < 0) {
                // Element positioned too far to the left (offscreen)
                // Position the tooltip 20px from the left of the screen
                dx = -hostRect.right - x;
                x = 20 + x + dx; // 20 - hostRect.width;
                // reposition the arrow as well, default left is 135 px
                var arrowOffset = 135 - dx - 20;
                this.stylesheet.insertRule(".tooltip__window::before { left: " + arrowOffset + "px }", 0);
            }
            else if (hostRect.right + x + tooltipWidth > bodyRect.width) {
                // Element positioned too far to the right
                // Position the tooltip 10px from the right of the screen
                dx = bodyRect.width - hostRect.right - tooltipWidth - x;
                x = x + dx - 10;
                // reposition the arrow as well, default left is 135 px
                var arrowOffset = 135 - dx + 10;
                this.stylesheet.insertRule(".tooltip__window::before { left: " + arrowOffset + "px }", 0);
            }
            target.style.left = Math.round(x) + "px";
            target.style.top = Math.round(y) + "px";
            return tooltipPosition;
        }
    };
    /**
     * Adds an eventlistener to the element, while storing a reference to the
     * listener.
     * @param element
     * @param event
     * @param listener
     */
    Tooltip.prototype.addListener = function (element, event, listener) {
        this.hostEvents.push({
            element: element,
            event: event,
            listener: listener
        });
        element.addEventListener(event, listener);
    };
    return Tooltip;
})();
exports.Tooltip = Tooltip;
