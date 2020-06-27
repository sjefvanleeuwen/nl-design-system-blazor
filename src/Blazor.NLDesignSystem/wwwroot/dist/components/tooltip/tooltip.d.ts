/**
 * Abstract class for tooltips.
 */
export declare class Tooltip {
    private host;
    private openOnHover;
    private container;
    private _content;
    private _tooltip;
    private _parent;
    private isHover;
    private hostEvents;
    private stylesheet;
    content: string;
    constructor(host: HTMLElement);
    private setContent();
    private setHover();
    private onClick(evt);
    /**
     * Called when the user clicks the host. Set hover to false to prevent mouse
     * Mouse move events
     * @param evt
     */
    private onHostClick(evt);
    private onFocus(evt);
    private onBlur(evt);
    /**
     * Called when the user hovers over the host component, cancelled when a
     * touch event precedes this event.
     * @param evt
     */
    private onHostMouseOver(evt);
    /**
     * Called when the mouse leaves the component, cancelled when a touch event
     * precedes this event
     * @param evt
     */
    private onHostMouseOut(evt);
    destroy(): void;
    /**
     * Hides the tooltip and restores the focus
     */
    private hide();
    private show();
    /**
     * Creates a stylesheet in the head section of the page. Only 1 stylesheet
     * per page will be created
     * @return {HTMLStyleElement}
     */
    private createStyleSheet();
    /**
     * Calculates the position of the tooltip
     */
    private positionElement(host, target);
    /**
     * Adds an eventlistener to the element, while storing a reference to the
     * listener.
     * @param element
     * @param event
     * @param listener
     */
    private addListener(element, event, listener);
}
