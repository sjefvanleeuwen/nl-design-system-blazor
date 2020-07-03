export declare class Button {
    private element;
    private keyDownListener;
    constructor(element: HTMLElement);
    /**
     * Removes all references to allow GC
     */
    destroy(): void;
    private onKeyDown(event);
}
