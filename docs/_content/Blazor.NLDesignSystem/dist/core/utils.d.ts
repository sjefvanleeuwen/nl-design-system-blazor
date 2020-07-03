export declare class Utils {
    /**
     * Generates an unique identifier
     * @return {string}
     * @constructor
     */
    static GenerateUID(): string;
    /**
     * Traverses the dom tree up to find the element containing className
     * @param child
     * @param className The className to find
     * @param root If root is reached while traversing, searching stops and null is returned
     * @return {any}
     */
    static FindParentContainingClass(child: Element, className: string, root: Element): Element;
    static IsDescendant(child: Element, parent: Element): boolean;
    /**
     * Calculates the total height of an element, combining height & margin
     * @param element
     * @return {number}
     */
    static CalculateElementHeight(element: Element): number;
    static CreateNode(html: string): HTMLElement;
    /**
     * Turns a string-like-this into a StringLikeThis
     * @param {string} string
     * @return {string}
     * @constructor
     */
    static CamelCase(dashed: string): string;
    /**
     * Checks if a certain key is pressed, converts keynames to browser specific names.
     * For instance, the 'ArrowDown' key in Chrome is called 'ArrowDown', in IE it's called 'Down'
     * @param event The original event
     * @param key The name of the key, as specified in the docs (https://developer.mozilla.org/nl/docs/Web/API/KeyboardEvent/key/Key_Values)
     * @constructor
     */
    static IsKeyPressed(event: KeyboardEvent, key: string): boolean;
    /**
     * Focuses the next item in the nodeList (or previous with shift-modifier)
     * @param event the keyboard event
     * @param nodeList the collection of focusable items
     */
    static FocusChild(event: KeyboardEvent, nodeList: NodeList): void;
}
