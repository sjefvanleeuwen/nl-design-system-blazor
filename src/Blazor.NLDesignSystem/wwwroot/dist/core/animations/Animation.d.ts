export declare abstract class Animation {
    protected element: HTMLElement;
    private _ease;
    private _animationDuration;
    private _step;
    private _value;
    private _delta;
    private _initialValue;
    protected canAnimate: boolean;
    constructor(element: HTMLElement);
    /**
     * The number of frames this animation runs
     * @default 30
     * @returns {number}
     */
    animationDuration: number;
    /**
     * The easing equation to use
     * @return {string}
     */
    ease: string;
    /**
     * The current value / position of the animation
     * @return {number}
     */
    value: number;
    /**
     * The change between the start & end position of the animation
     * @return {number}
     */
    delta: number;
    /**
     * The start value of the animation
     * @return {number}
     */
    initialValue: number;
    /**
     * Starts the animation, dispatches `uno-animation-start`
     */
    start(): void;
    /**
     * @todo Implement
     */
    cancel(): void;
    /**
     * Called on each iteration of the animation, dispatches `uno-animation-progress`
     */
    protected progress(): void;
    /**
     * Called when the animation is finished, dispatches `uno-animation-end`
     */
    protected end(): void;
    /**
     * Dispatches an event on the host element
     * @param eventName The name of the event to dispatch
     * @param data Additional data to send with the event
     */
    private dispatch(eventName, data?);
}
