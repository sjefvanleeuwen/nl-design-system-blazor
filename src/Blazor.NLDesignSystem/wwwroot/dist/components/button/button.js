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
/**
 * Adds a11y attributes to a link which is styled as a button. Normally, links
 * are triggered with the [ENTER] key, while buttons as triggered with the
 * [SPACE] key. This scripts makes sure that links can also be triggered using
 * the [SPACE] key. Since there are no visual clues that the element is actually
 * an a element, rather than a button element, we have to mimic the behaviour of
 * the button element.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role
 */
var utils_1 = require('../../core/utils');
var Button = (function () {
    function Button(element) {
        this.element = element;
        this.keyDownListener = this.onKeyDown.bind(this);
        element.addEventListener('keydown', this.keyDownListener);
        element.setAttribute('role', 'button');
        if (!this.element.classList.contains('btn--disabled')) {
            element.setAttribute('tabindex', '0');
        }
    }
    /**
     * Removes all references to allow GC
     */
    Button.prototype.destroy = function () {
        this.element.removeEventListener('keydown', this.keyDownListener);
    };
    Button.prototype.onKeyDown = function (event) {
        if (utils_1.Utils.IsKeyPressed(event, ' ')) {
            event.preventDefault();
            if (this.element.classList.contains('btn--disabled')) {
                return;
            }
            if (typeof this.element.click === 'function') {
                this.element.click();
            }
            else {
                // Fallback for browsers which don't support click();
                var clickEvent = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: false,
                    view: window
                });
                this.element.dispatchEvent(clickEvent);
            }
        }
    };
    return Button;
})();
exports.Button = Button;
