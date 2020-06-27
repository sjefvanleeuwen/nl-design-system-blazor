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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Animation_1 = require('./Animation');
/**
 * Animation class which adds a slide-toggle effect to the supplied element
 * Example:
 * <code>
 *     var animation = new SlideToggle(document.getElementById('target'));
 *     animation.toggle();
 * </code>
 */
var SlideToggle = (function (_super) {
    __extends(SlideToggle, _super);
    function SlideToggle(element) {
        _super.call(this, element);
        this.element = element;
        this._toggleClass = 'animate--open';
    }
    Object.defineProperty(SlideToggle.prototype, "toggleClass", {
        /**
         * Class which gets applied when the element is 'toggled'
         * @default 'animate--open'
         * @returns {string}
         */
        get: function () {
            return this._toggleClass;
        },
        set: function (value) {
            this._toggleClass = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggles the element, animates between height = 0 and the calculated
     * height of the element. When the previous animation hasn't finished yet,
     * it will animate from the point where the previous animation stopped.
     *
     * @return boolean The state to transform to (toggled or not)
     */
    SlideToggle.prototype.toggle = function (force) {
        if (force === void 0) { force = undefined; }
        this.setMaxHeight();
        this.initialValue = parseInt(this.element.style.maxHeight);
        this.initialValue = isNaN(this.initialValue) ? 0 : this.initialValue;
        var toggled = this.element.classList.toggle(this.toggleClass);
        // No IE support for 2nd param for toggle :(
        if (force === true) {
            this.element.classList.add(this.toggleClass);
            toggled = force;
        }
        else if (force === false) {
            this.element.classList.remove(this.toggleClass);
            toggled = force;
        }
        // Remove the maxHeightProperty to correctly calculate the height
        // Round up a float to prevent missing that one pixel at the bottom
        this.element.style.maxHeight = '';
        this.elementHeight = toggled ? Math.ceil(parseFloat(getComputedStyle(this.element).height)) : 0;
        this.start();
        return toggled;
    };
    SlideToggle.prototype.start = function () {
        this.element.style.maxHeight = this.initialValue + 'px';
        this.element.classList.add(this.toggleClass);
        this.delta = this.elementHeight - this.initialValue;
        _super.prototype.start.call(this);
    };
    SlideToggle.prototype.progress = function () {
        _super.prototype.progress.call(this);
        this.element.style.maxHeight = Math.floor(this.value) + 'px';
    };
    SlideToggle.prototype.end = function () {
        if (Math.floor(this.value) === 0) {
            this.element.classList.remove(this.toggleClass);
        }
        this.element.style.maxHeight = '';
        _super.prototype.end.call(this);
    };
    /**
     * @private
     * Sets the maxHeight property to the initial height.
     */
    SlideToggle.prototype.setMaxHeight = function () {
        this.element.style.maxHeight = '';
        var toggled = this.element.classList.contains(this._toggleClass), height = toggled ? parseInt(getComputedStyle(this.element).height) : 0;
        this.element.style.maxHeight = height + 'px';
    };
    return SlideToggle;
})(Animation_1.Animation);
exports.SlideToggle = SlideToggle;
