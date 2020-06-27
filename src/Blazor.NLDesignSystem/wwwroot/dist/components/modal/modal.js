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
var utils_1 = require('./../../core/utils');
var RESIZE_TIMEOUT = 200;
/**
 * @class Modal
 * Creates a modal window which can be opened / closed using javascript
 * Example:
 * <code>
 *     <div class="modal" role="dialog">
 *          <section class="modal__content">
 *              <header class="modal__title">
 *                  <a href="#" class="modal__close-button">
 *                      <i class="icon icon-cross"></i><span>Sluit</span>
 *                  </a>
 *                  <h1>Titel van modal</h1>
 *              </header>
 *
 *              <div class="modal__body">
 *                  <p>Ut quis congue sapien. Proin maximus augue molestie.</p>
 *              </div>
 *
 *              <footer class="modal__footer">
 *                  <button class="btn btn--primary">Bevestig</button>
 *              </footer>
 *          </section>
 *      </div>
 *      <script>
 *          System.import('/uno/components/modal/modal.js').then(function (module) {
 *              var el = document.querySelector('.modal'),
 *                  modal = new module.Modal(el);
 *
 *              modal.open();
 *          });
 *      </script>
 * </code>
 */
var Modal = (function () {
    function Modal(element) {
        this.element = element;
        this.focusableElementsString = "\n        a[href],\n        area[href],\n        input:not([disabled]),\n        select:not([disabled]),\n        textarea:not([disabled]),\n        button:not([disabled]),\n        iframe,\n        object,\n        embed,\n        *[tabindex],\n        *[contenteditable]";
        this.closeListener = this.onClose.bind(this);
        this.keyDownListener = this.onKeyDown.bind(this);
        this.resizeListener = this.onResize.bind(this);
        element.setAttribute('tabindex', '-1');
        if (element.querySelector('.modal__close-button')) {
            element.querySelector('.modal__close-button').addEventListener('click', this.closeListener);
        }
        element.addEventListener('keydown', this.keyDownListener);
        window.addEventListener('resize', this.resizeListener);
        this.setAria();
    }
    Modal.prototype.onKeyDown = function (event) {
        // if escape pressed
        if (utils_1.Utils.IsKeyPressed(event, 'Escape')) {
            event.preventDefault();
            this.close();
        }
        else 
        // if tab or shift-tab pressed
        if (utils_1.Utils.IsKeyPressed(event, 'Tab')) {
            // get list of focusable items
            var focusableItems;
            // convert Nodelist to Array using array prototype
            focusableItems = Array.prototype.slice.call(this.element.querySelectorAll(this.focusableElementsString), 0);
            // sort according to tabindex
            focusableItems.sort(function (a, b) {
                var aInd = a.getAttribute('tabindex');
                var bInd = b.getAttribute('tabindex');
                if (aInd > bInd) {
                    return 1;
                }
                else if (aInd < bInd) {
                    return -1;
                }
                return 0;
            });
            // get currently focused item
            var focusedItem;
            focusedItem = document.querySelector(':focus');
            // get the number of focusable items
            var numberOfFocusableItems;
            numberOfFocusableItems = focusableItems.length;
            // get the index of the currently focused item but make sure to always return >= 0
            var focusedItemIndex = Math.max(Array.prototype.indexOf.call(focusableItems, focusedItem), 0);
            if (event.shiftKey) {
                // back tab
                // if focused on first item and user preses back-tab, go to the last focusable item
                if (focusedItemIndex === 0) {
                    focusableItems[numberOfFocusableItems - 1].focus();
                    event.preventDefault();
                }
                else {
                    focusableItems[focusedItemIndex - 1].focus();
                    event.preventDefault();
                }
            }
            else {
                // forward tab
                // if focused on the last item and user preses tab, go to the first focusable item
                if (focusedItemIndex === numberOfFocusableItems - 1) {
                    focusableItems[0].focus();
                    event.preventDefault();
                }
                else {
                    focusableItems[focusedItemIndex + 1].focus();
                    event.preventDefault();
                }
            }
        }
    };
    /**
     * Opens the modal, sets correct aria-attributes
     */
    Modal.prototype.open = function () {
        this.previousFocus = document.activeElement;
        this.element.classList.add('modal--open');
        this.resize();
        this.setFocus();
    };
    /**
     * Closes the modal, restores focus
     */
    Modal.prototype.close = function () {
        this.element.classList.remove('modal--open');
        if (this.previousFocus) {
            // Restore focus
            this.previousFocus.focus();
        }
    };
    /**
     * Performs housekeeping for correct garbage collection
     */
    Modal.prototype.destroy = function () {
        clearTimeout(this.resizeTimeout);
        if (this.element.querySelector('.modal__close-button')) {
            this.element.querySelector('.modal__close-button').removeEventListener('click', this.closeListener);
        }
        this.element.removeEventListener('keydown', this.keyDownListener);
        window.removeEventListener('resize', this.resizeListener);
    };
    /**
     * Resizes the body of the modal to the maximum available width. This is only
     * done when the body height exceeds the height of the modal, which only
     * occurs in IE <= 11.
     */
    Modal.prototype.resize = function () {
        var body = this.element.querySelector('.modal__body'), title = this.element.querySelector('.modal__title'), footer = this.element.querySelector('.modal__footer'), styles;
        body.style.maxHeight = '100%';
        styles = getComputedStyle(this.element.querySelector('.modal__content'));
        var modalHeight = parseInt(styles.height), bodyHeight = parseInt(getComputedStyle(body).height);
        // This is only needed for IE, which doesn't follow the flexbox spec
        // correctly and will not resize the body container.
        if (bodyHeight > modalHeight) {
            // IE
            var maxHeight = modalHeight
                - parseInt(styles.paddingTop)
                - parseInt(styles.paddingBottom)
                - parseInt(getComputedStyle(body).marginTop)
                - parseInt(getComputedStyle(body).marginBottom)
                - 10; // Don't know where these 10px come from
            if (title) {
                maxHeight -= utils_1.Utils.CalculateElementHeight(title);
            }
            if (footer) {
                maxHeight -= utils_1.Utils.CalculateElementHeight(footer);
            }
            body.style.maxHeight = maxHeight + 'px';
        }
    };
    /**
     * Event handler for the close button
     * @param event
     */
    Modal.prototype.onClose = function (event) {
        event.preventDefault();
        this.close();
    };
    Modal.prototype.onResize = function () {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = window.setTimeout(this.resize.bind(this), RESIZE_TIMEOUT);
    };
    /**
     * Sets the ARIA attributes for better accessibility
     */
    Modal.prototype.setAria = function () {
        this.element.setAttribute('role', 'dialog');
        var title = this.element.querySelector('.modal__title h1');
        if (title) {
            if (!title.hasAttribute('id')) {
                // Generate unique id
                title.setAttribute('id', utils_1.Utils.GenerateUID());
            }
            this.element.setAttribute('aria-labelledby', title.getAttribute('id'));
        }
    };
    /**
     * Sets the focus to the first focusable element. If the modal contains a
     * form, it will be the first field in the form, otherwise, it will be the
     * primary button (if available), or the first button found. If no buttons
     * are present, the close button will receive focus.
     */
    Modal.prototype.setFocus = function () {
        var target, selectors = [
            // First, check for form elements
            '.modal__body input, .modal__body textarea',
            // Next, check for primary buttons
            '.btn--primary',
            // Next, check for arbitrary buttons
            '.btn',
            // Finally, select the close button
            '.modal__close-button'
        ];
        for (var _i = 0; _i < selectors.length; _i++) {
            var selector = selectors[_i];
            target = this.element.querySelector(selector);
            if (target) {
                target.focus();
                break;
            }
        }
    };
    return Modal;
})();
exports.Modal = Modal;
