/**
 * @class Notification
 * Listens for click events on the close button for notification to close the notification using javascript
 */
export declare class Notification {
    private element;
    constructor(element: HTMLElement);
    /**
     * Closes the notification
     */
    close(): void;
}
