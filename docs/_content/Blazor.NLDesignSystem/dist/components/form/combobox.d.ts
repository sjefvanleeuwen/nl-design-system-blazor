export declare const MODE_FILTER: number;
export declare const MODE_AUTOCOMPLETE: number;
/**
 * Combobox / autocomplete component
 * @version 1.0.0
 *
 * <div class="input combobox">
 *  <label class="input__label">Opleiding</label>
 *  <div class="input__hint">Voer een opleidingsnaam of crebonummer in</div>
 *  <input type="text" class="combobox__input input__control input__control--text input__control--xl input__control--select">
 * </div>
 */
export declare class Combobox implements EventListenerObject {
    private host;
    private isCheckboxFilter;
    private _allowUnknown;
    private _data;
    private _filterFunction;
    private _icon;
    private _initTimeoutId;
    private _initTimeout;
    private _inputTimeout;
    private _inputTimeoutId;
    private _input;
    private _list;
    private _labelField;
    private _labelFunction;
    private _loading;
    private _mode;
    private _prevQuery;
    private _toggle;
    private _validationError;
    private _value;
    private _filterContainer;
    /**
     * Highlight matched text? Only on default filter
     * @type {boolean}
     * @private
     */
    private _highlight;
    constructor(host: Element, isCheckboxFilter?: Boolean);
    /**
     * Indicates whether or not an entered value must be present in the
     * data list.
     * @default true
     * @return {Boolean}
     */
    allowUnknown: Boolean;
    /**
     * Sets the values of the combobox, can be an array of strings or
     * an array objects. When using objects, be sure to set the `labelField`
     * property
     * @param {Array<any>} value
     */
    data: Array<any>;
    /**
     * A custom filter function for the data array.
     * Signature: function(element: any, index: number, array: any[]): boolean
     * @see https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
     * @return {Function}
     */
    filterFunction: any;
    /**
     * The number of milliseconds to wait before applying the filtering after the user
     * has changed the input
     * @return {string}
     */
    inputTimeout: number;
    /**
     * Sets which property of the objects to use to display in the list
     * @return {string}
     */
    labelField: string;
    /**
     * Sets which property of the objects to use to display in the list. May contain HTML
     * Signature: function(value: any): string
     * @return {function}
     */
    labelFunction: any;
    /**
     * Indicates the combobox is loading data
     * @return {boolean}
     */
    loading: boolean;
    /**
     * Set the mode of the combobox
     * MODE_AUTOCOMPLETE: Always show the full list
     * MODE_FILTER: Filter the list based on the input value
     * @return {number}
     */
    mode: number;
    /**
     * Set the error which is shown when the form is validated and the value
     * of the combobox is invalid
     * @return {string}
     */
    validationError: string;
    /**
     * Sets the current selected value of the combobox
     * @param value
     */
    value: any;
    /**
     * Indicates if the list of the combobox is visible to the user
     * @readonly
     * @return {boolean}
     */
    isOpen: boolean;
    /**
     * Returns the current value of the input
     * @return {string}
     */
    query: string;
    /**
     * @private
     * @param {Event} event
     */
    handleEvent(event: Event): void;
    /**
     * Opens the dropdown
     * @fires 'combobox-open'
     */
    open(): void;
    /**
     * Closes the dropdown
     * @fires 'combobox-close'
     */
    close(): void;
    /**
     * Call when the combobox is removed from the page
     * Clean up listeners
     */
    destroy(): void;
    /**
     * Create the listitems based on the data array
     */
    private createListItems();
    /**
     * Adds a no result node to the list.
     */
    private createNoResultItem();
    /**
     * This is the default filterFunction.
     * @param item
     * @param idx
     */
    private defaultFilter(item, idx);
    /**
     * This is the default labelFunction, which will return the item if it's a string,
     * or the labelField if it's an object
     * @param item
     * @param idx
     */
    private defaultLabel(item, idx);
    /**
     * Filters the list based on the value of the input
     */
    private filterInput();
    /**
     * Show the no result item in the dropdown.
     */
    private showNoResultItem();
    /**
     * Hide the no result item in the dropdown.
     */
    private hideNoResultItem();
    /**
     * Move the focus to the next item in the list
     * @param {number} direction, 1 for forward, -1 for backward
     */
    private focusNextItem(direction?);
    /**
     * Called when anything which alters the displayed data has changed
     * (data / labelField)
     */
    private initialize();
    /**
     * Applies validation to the input. Called when the value of the input has changed
     */
    private onInputinput();
    /**
     * Called when the user uses keyboard nav on the input,
     * prevents body scrolling and event propagation.
     * @param {KeyboardEvent} event
     */
    private onInputkeydown(event);
    /**
     * Keyboard handler for the input
     * Escape: Close the dropdown
     * ArrowDown / ArrowUp: Move the focus to the list
     * @param {KeyboardEvent} event
     */
    private onInputkeyup(event);
    /**
     * Called when the user clicks an item from the list
     * @param {Event} event
     */
    private onListclick(event);
    private onBodyclick(event);
    /**
     * When the user clicks on the text instead of the list item, we need to find
     * the element with the datafield.
     * We traverse the parents until an element with [DATAFIELD] is found, or no parent is found (should not happen)
     *
     * @param {HTMLElement} el
     * @returns {any}
     */
    private findDataField(el);
    /**
     * Called when the user uses keyboard nav inside the list,
     * prevents body scrolling and event propagation
     * @param {KeyboardEvent} event
     */
    private onListkeydown(event);
    /**
     * Keyboard handling for the select list,
     * Escape: Close the dropdown
     * ArrowDown: Focus to the next item in the list
     * ArrowUp: Focus to the previous item in the list
     * Enter: Select the currently focused item
     * @param {KeyboardEvent} event
     */
    private onListkeyup(event);
    /**
     * Called when the user clicks the dropdown button
     * @param {Event} event
     */
    private onToggleclick(event);
    /**
     * Updates the filter list with passed items.
     *      * Adds event listener to the filter to uncheck the
     *      * corresponding checkbox and rebuild the filterlist.
     * @param collection The filters we are adding
     */
    private updateFilterList(collection);
    private onFilterLabelClick(element);
    /**
     * Adds a list--filter to the combobox for showing the
     * currently checked checkboxes.
     * If the element does not exist within the host, a new
     * element will be inserted.
     */
    private getFilterContainer();
    /**
     * Prepares the filterlist by passing all checked boxes to the updateFilterList
     */
    private buildFilterList();
    /**
     * Set the value of the input based on a list item
     * Dispatches an 'combobox-select' event
     * @param {string} value
     */
    private setValue(value);
    /**
     * Scaffolding, add correct classes & elements
     */
    private setup();
    private setupListeners();
    /**
     * Removes all the listitems from the suggest list
     */
    private removeListItems();
}
