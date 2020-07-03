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
export declare class Tabs implements EventListenerObject {
    private host;
    private _tabs;
    private _tabsWidth;
    private _moreTab;
    private _resizeTimeout;
    activeTabIndex: number;
    /**
     * Deactivates all the panes of the given pane container
     * @param parent
     */
    static deactivatePanes(parent: Element): void;
    /**
     * Get the tab(s) which is/are currently active, there can be more than
     * one, since a cloned tab can have active state as well as the
     * original one.
     */
    static deactivateTabs(host: Element): void;
    /**
     * Gets the target pane based on the specified href of the tab link
     * @param tab
     * @returns {HTMLElement}
     */
    static getTargetPane(tab: Element): Element;
    constructor(host: Element);
    /**
     * Removes references for correct GC
     */
    destroy(): void;
    disableTab(idx: number): void;
    enableTab(idx: number): void;
    /**
     * @private
     * @param {Event} event
     */
    handleEvent(event: Event): void;
    openTab(idx: number): void;
    /**
     * Checks if the given tab is not disabled and is not the 'more' button
     * @param tab
     * @return {boolean}
     * @private
     */
    private canBeActivated(tab);
    /**
     * Creates a clone of every tab and moves it inside the more button
     * @private
     */
    private createClones();
    /**
     * Creates a 'more' button, which can hold all clones
     * @private
     */
    private createMoreTab();
    private onScreenResize();
    /**
     * Event handler for the tab clicks
     * @param event
     * @private
     */
    private onTabClick(event);
    private keyboardSwitchTabs(tabElement);
    private rearrange();
    private setup();
    /**
     * Returns the requested tab element when not hidden, otherwise returns the clone of the tab element.
     * @param tabs The NodeList with tab elements.
     * @param clones The NodeList with clones of the tab elements.
     * @param index the index of the requested Tab element.
     * @private
     */
    private getTabElement(tabs, clones, index);
    /**
     * Returns the first active tab element after the current tab element.
     * @private
     */
    private getNextTab();
    /**
     * Returns the first active tab element before the current tab element.
     * @private
     */
    private getPreviousTab();
    /**
     * Sets the tab__pane active which is linked to the given element. The
     * tab__pane should have the id as specified in the url of the tab
     * @param el The a-tag in the .tab__tab element
     * @private
     */
    private setActiveTab(el);
    /**
     * Stores the width of each tab and calculates the total width
     * @private
     */
    private storeWidths();
    private toggleEnabled(idx, enabled);
}
