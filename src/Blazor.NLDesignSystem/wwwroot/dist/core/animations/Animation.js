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
var Easings_1 = require('./Easings');
var Animation = (function () {
    function Animation(element) {
        this.element = element;
        this._ease = 'easeOutCubic';
        this._animationDuration = 30;
        this._step = 0;
        // Feature detection
        this.canAnimate = typeof window.requestAnimationFrame === 'function';
    }
    Object.defineProperty(Animation.prototype, "animationDuration", {
        /**
         * The number of frames this animation runs
         * @default 30
         * @returns {number}
         */
        get: function () {
            return this._animationDuration;
        },
        set: function (value) {
            this._animationDuration = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "ease", {
        /**
         * The easing equation to use
         * @return {string}
         */
        get: function () {
            return this._ease;
        },
        set: function (value) {
            if (Easings_1.Easings.hasOwnProperty(value)) {
                this._ease = value;
            }
            else {
                throw new Error("Easing equation '" + value + "' does not exist");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "value", {
        /**
         * The current value / position of the animation
         * @return {number}
         */
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "delta", {
        /**
         * The change between the start & end position of the animation
         * @return {number}
         */
        get: function () {
            return this._delta;
        },
        set: function (value) {
            this._delta = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "initialValue", {
        /**
         * The start value of the animation
         * @return {number}
         */
        get: function () {
            return this._initialValue;
        },
        set: function (value) {
            this._initialValue = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Starts the animation, dispatches `uno-animation-start`
     */
    Animation.prototype.start = function () {
        this.dispatch('uno-animation-start');
        if (this.canAnimate) {
            this._step = 0;
            this.element.classList.add('animating');
            requestAnimationFrame(this.progress.bind(this));
        }
        else {
            this.value = this.initialValue + this.delta;
            this.end();
        }
    };
    /**
     * @todo Implement
     */
    Animation.prototype.cancel = function () {
        this.element.classList.remove('uno-animating');
        this.dispatch('uno-animation-cancel');
    };
    /**
     * Called on each iteration of the animation, dispatches `uno-animation-progress`
     */
    Animation.prototype.progress = function () {
        this.value = Easings_1.Easings[this.ease](Math.min(this._step++, this.animationDuration), this.initialValue, this.delta, this.animationDuration);
        this.dispatch('uno-animation-progress', this.value);
        if (this._step <= this.animationDuration) {
            requestAnimationFrame(this.progress.bind(this));
        }
        else {
            // Call end via an animationFrame to make sure it's executed
            // in the next 'tick'. Otherwise, it will be called before the
            // last progress event;
            requestAnimationFrame(this.end.bind(this));
        }
    };
    /**
     * Called when the animation is finished, dispatches `uno-animation-end`
     */
    Animation.prototype.end = function () {
        this.element.classList.remove('animating');
        this.dispatch('uno-animation-end');
    };
    /**
     * Dispatches an event on the host element
     * @param eventName The name of the event to dispatch
     * @param data Additional data to send with the event
     */
    Animation.prototype.dispatch = function (eventName, data) {
        if (data === void 0) { data = null; }
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, true, true, data);
        this.element.dispatchEvent(event);
    };
    return Animation;
})();
exports.Animation = Animation;
