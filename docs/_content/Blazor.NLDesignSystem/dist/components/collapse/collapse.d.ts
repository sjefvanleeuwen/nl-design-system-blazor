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
export declare class Collapse {
    private host;
    private animate;
    private details;
    private detailsSibling;
    private groupedCollapses;
    /**
     * @constructor
     * @param host Element The element which contains a x-uno-collapse attribute
     */
    constructor(host: Element);
    /**
     * Closes the collapse
     */
    close(): void;
    /**
     * Opens the collapse
     */
    open(): void;
    /**
     * Focuses the first child
     */
    focusFirstChild(): void;
    /**
     * Removes all references to allow GC
     */
    destroy(): void;
    /**
     * Handles all events for this component
     * @private
     * @param {Event} event
     */
    handleEvent(event: Event): void;
    /**
     * Opens / closes the details. The open / close is done through the
     * animation class.
     */
    toggle(): void;
    private onCollapseOpen(event);
    private onCollapseClose(event);
    /**
     * Called when a collapse in the same group is opened. Close other collapses
     * @param {CustomEvent} evt
     */
    private onCollapseGroupOpen(evt);
    /**
     * Called when the user clicks the .collapse__title
     */
    private onTitleClick();
    /**
     * Add keyboard support, toggle details on ENTER or SPACE key
     * @param event
     */
    private onTitleKeyDown(event);
    /**
     * Callback for when the animation has finished
     */
    private onDetailsUnoAnimationEnd();
    private onDetailsUnoAnimationProgress(event);
    /**
     * Finds the target for the collapse. The collapse is either found by
     * - id, specified in x-uno-collapse-target
     * - id, specified in data-collapse-target
     * - location in dom, next to the host.
     * @param host
     * @return {HTMLElement}
     */
    private findTarget(host);
    /**
     * Groups all collapses bases on either
     * - An attribute on each collapse, containing a group identifier (x-uno-collapse-group="{GROUPNAME}")
     * - An attribute on a wrapping element, containing the attribute x-uno-collapse
     * @param host
     */
    private groupCollapses(host);
    private setupAnimation();
    /**
     * Adds aria attributes to host & target element
     */
    private setAria(target);
}
