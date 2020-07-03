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
export declare class Modal {
    private element;
    private resizeTimeout;
    private previousFocus;
    private focusableElementsString;
    private closeListener;
    private keyDownListener;
    private resizeListener;
    constructor(element: HTMLElement);
    private onKeyDown(event);
    /**
     * Opens the modal, sets correct aria-attributes
     */
    open(): void;
    /**
     * Closes the modal, restores focus
     */
    close(): void;
    /**
     * Performs housekeeping for correct garbage collection
     */
    destroy(): void;
    /**
     * Resizes the body of the modal to the maximum available width. This is only
     * done when the body height exceeds the height of the modal, which only
     * occurs in IE <= 11.
     */
    resize(): void;
    /**
     * Event handler for the close button
     * @param event
     */
    private onClose(event);
    private onResize();
    /**
     * Sets the ARIA attributes for better accessibility
     */
    private setAria();
    /**
     * Sets the focus to the first focusable element. If the modal contains a
     * form, it will be the first field in the form, otherwise, it will be the
     * primary button (if available), or the first button found. If no buttons
     * are present, the close button will receive focus.
     */
    private setFocus();
}
