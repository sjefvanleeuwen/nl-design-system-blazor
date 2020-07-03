/**
 * @class DonutChart
 * Creates a donut chart.
 */
export declare class DonutChart {
    private element;
    private _value;
    private color;
    private canvas;
    private ctx;
    private xCoord;
    private yCoord;
    private radius;
    private arcWidth;
    constructor(element: HTMLElement);
    value: number;
    private setup();
    private setInner();
    private setupListeners();
    /**
     * draws the donut chart.
     */
    draw(): void;
    private calcOffset();
    private calcStartPoint(offset);
    private calcSwitchPoint(offset);
    private calcEndPoint(offset);
    private setColor();
    private setSize();
    private updateSize();
    destroy(): void;
    private debounce(func, timeout);
}
