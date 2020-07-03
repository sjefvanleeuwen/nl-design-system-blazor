/**
 * @class FilterList
 */
export declare class FilterList {
    private host;
    private elements;
    constructor(host: Element, elements: Array<any>);
    /**
     * Scaffolding
     */
    private createElements();
    /**
     * Build the filter element
     * @param value the value of the filter element
     * @param id the id of the filter element
     */
    private buildElement(value, id);
    /**
     * Add a listener to the delete button of the filter element
     * @param el the filter element which button needs a delete listener
     */
    private addClickListener(el);
    /**
     * Delete a single filter element
     * @param el the element that needs deleting.
     * @fires 'filterlist-deleted-item'
     */
    delete(child: HTMLElement): void;
    /**
     * Delete all filter elements
     * @fires 'filterlist-deleted'
     */
    deleteAll(): void;
    /**
     * Creates an event
     * @param type the type of the event
     */
    private createEvent(type, bubble?, cancelable?);
    /**
     * Handle events for event listeners
     * @param event the event
     */
    handleEvent(event: Event): void;
    /**
     * Remove listeners and filter elements
     */
    destroy(): void;
}
