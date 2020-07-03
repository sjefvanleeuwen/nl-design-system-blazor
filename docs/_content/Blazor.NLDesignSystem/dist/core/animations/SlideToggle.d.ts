import { Animation } from './Animation';
/**
 * Animation class which adds a slide-toggle effect to the supplied element
 * Example:
 * <code>
 *     var animation = new SlideToggle(document.getElementById('target'));
 *     animation.toggle();
 * </code>
 */
export declare class SlideToggle extends Animation {
    protected element: HTMLElement;
    private elementHeight;
    private _toggleClass;
    constructor(element: HTMLElement);
    /**
     * Class which gets applied when the element is 'toggled'
     * @default 'animate--open'
     * @returns {string}
     */
    toggleClass: string;
    /**
     * Toggles the element, animates between height = 0 and the calculated
     * height of the element. When the previous animation hasn't finished yet,
     * it will animate from the point where the previous animation stopped.
     *
     * @return boolean The state to transform to (toggled or not)
     */
    toggle(force?: boolean): boolean;
    start(): void;
    progress(): void;
    end(): void;
    /**
     * @private
     * Sets the maxHeight property to the initial height.
     */
    private setMaxHeight();
}
