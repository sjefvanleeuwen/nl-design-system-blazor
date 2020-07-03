/*!
NL Design System Componenten library 0.1.1, build date 27-06-2020
Copyright 2011-2020 The NL Design System Authors
Copyright 2011-2020 Duo
Author: DUO & The NL Design System Authors
Author URI: https://nl-design-system.gitlab.io/nl-design-system/
License: EUPL v1.2
License URL: https://joinup.ec.europa.eu/software/page/eupl5
Version: 0.1.1
*/
var utils_1 = require('../../core/utils');
var ITEM_TEMPLATE = "<li role=\"button\" tabindex=\"-1\" class=\"combobox__item\">\n    <span class=\"combobox__link\">%s</span>\n </li>";
var NO_RESULT_TEMPLATE = "<li tabindex=\"-1\" class=\"combobox__item combobox__item--no-results\" hidden>\n <span class=\"combobox__link\">Geen resultaten gevonden.</span>\n</li>";
var ITEM_COMBOBOX_TEMPLATE = "<li class=\"input__group input__group--compact input__group--checkbox\" role=\"group\">\n<input role=checkbox type=\"checkbox\" id=\"chkbx-compact-$id\" class=\"input__control input__control--checkbox\">\n<label class=\"input__label input__label--checkbox combobox__link\" for=\"chkbx-compact-$id\">$label</label>\n</li>";
var DATAFIELD = 'comboboxItem';
exports.MODE_FILTER = 1;
exports.MODE_AUTOCOMPLETE = 2;
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
var Combobox = (function () {
    function Combobox(host, isCheckboxFilter) {
        if (isCheckboxFilter === void 0) { isCheckboxFilter = false; }
        this.host = host;
        this.isCheckboxFilter = isCheckboxFilter;
        this._allowUnknown = true;
        this._filterFunction = this.defaultFilter;
        this._initTimeout = 2;
        this._inputTimeout = 100;
        this._labelFunction = this.defaultLabel;
        this._loading = false;
        this._mode = exports.MODE_FILTER;
        this._validationError = 'Ongeldige invoer';
        this._value = null;
        this._filterContainer = null;
        /**
         * Highlight matched text? Only on default filter
         * @type {boolean}
         * @private
         */
        this._highlight = true;
        if (!host) {
            throw new Error('No host element specified');
        }
        this.setup();
        this.setupListeners();
    }
    Object.defineProperty(Combobox.prototype, "allowUnknown", {
        /**
         * Indicates whether or not an entered value must be present in the
         * data list.
         * @default true
         * @return {Boolean}
         */
        get: function () {
            return this._allowUnknown;
        },
        set: function (value) {
            this._allowUnknown = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Sets the values of the combobox, can be an array of strings or
         * an array objects. When using objects, be sure to set the `labelField`
         * property
         * @param {Array<any>} value
         */
        set: function (value) {
            this._data = value;
            this.initialize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "filterFunction", {
        /**
         * A custom filter function for the data array.
         * Signature: function(element: any, index: number, array: any[]): boolean
         * @see https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
         * @return {Function}
         */
        get: function () {
            return this._filterFunction;
        },
        set: function (value) {
            this._highlight = false;
            this._filterFunction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "inputTimeout", {
        /**
         * The number of milliseconds to wait before applying the filtering after the user
         * has changed the input
         * @return {string}
         */
        get: function () {
            return this._inputTimeout;
        },
        set: function (value) {
            this._inputTimeout = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "labelField", {
        /**
         * Sets which property of the objects to use to display in the list
         * @return {string}
         */
        get: function () {
            return this._labelField;
        },
        set: function (value) {
            this._labelField = value;
            this.initialize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "labelFunction", {
        /**
         * Sets which property of the objects to use to display in the list. May contain HTML
         * Signature: function(value: any): string
         * @return {function}
         */
        get: function () {
            return this._labelFunction;
        },
        set: function (value) {
            this._labelFunction = value;
            this.initialize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "loading", {
        /**
         * Indicates the combobox is loading data
         * @return {boolean}
         */
        get: function () {
            return this._loading;
        },
        set: function (isLoading) {
            this._loading = isLoading;
            if (this._icon) {
                var action = isLoading ? 'add' : 'remove';
                this._icon.classList[action]('combobox__icon--loading');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "mode", {
        /**
         * Set the mode of the combobox
         * MODE_AUTOCOMPLETE: Always show the full list
         * MODE_FILTER: Filter the list based on the input value
         * @return {number}
         */
        get: function () {
            return this._mode;
        },
        set: function (value) {
            this._mode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "validationError", {
        /**
         * Set the error which is shown when the form is validated and the value
         * of the combobox is invalid
         * @return {string}
         */
        get: function () {
            return this._validationError;
        },
        set: function (value) {
            this._validationError = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Sets the current selected value of the combobox
         * @param value
         */
        set: function (value) {
            if (!this.allowUnknown && this.data.indexOf(value) === -1) {
                throw new Error("Unknown item '" + value.toString() + "'");
            }
            this._value = value;
            var el = document.createElement('div');
            el.innerHTML = this.labelFunction(value);
            this._input.value = el.textContent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "isOpen", {
        /**
         * Indicates if the list of the combobox is visible to the user
         * @readonly
         * @return {boolean}
         */
        get: function () {
            return this.host.classList.contains('combobox--autocomplete-open');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "query", {
        /**
         * Returns the current value of the input
         * @return {string}
         */
        get: function () {
            return this._input ? this._input.value : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {Event} event
     */
    Combobox.prototype.handleEvent = function (event) {
        switch (event.currentTarget) {
            case this._toggle:
                this[("onToggle" + event.type)](event);
                break;
            case this._list:
                if (!this.isCheckboxFilter) {
                    this[("onList" + event.type)](event);
                }
                break;
            case this._input:
                this[("onInput" + event.type)](event);
                break;
            case document.body:
                this[("onBody" + event.type)](event);
                break;
            default:
        }
    };
    /**
     * Opens the dropdown
     * @fires 'combobox-open'
     */
    Combobox.prototype.open = function () {
        if (!this.data) {
            return;
        }
        var event = document.createEvent('CustomEvent');
        event.initEvent('combobox-open', true, true);
        if (this.host.dispatchEvent(event)) {
            if (!this.isOpen) {
                // (Re-)opening the combobox. Reset the query to force filtering
                this._prevQuery = null;
            }
            this.host.classList.add('combobox--autocomplete-open');
            this._list.hidden = false;
            this.filterInput();
        }
    };
    /**
     * Closes the dropdown
     * @fires 'combobox-close'
     */
    Combobox.prototype.close = function () {
        if (!this.isOpen) {
            return;
        }
        var event = document.createEvent('CustomEvent');
        event.initEvent('combobox-close', true, true);
        if (this.host.dispatchEvent(event)) {
            this.host.classList.remove('combobox--autocomplete-open');
            this._list.hidden = true;
        }
    };
    /**
     * Call when the combobox is removed from the page
     * Clean up listeners
     */
    Combobox.prototype.destroy = function () {
        this._toggle.removeEventListener('click', this);
        this._input.removeEventListener('keyup', this);
        this._input.removeEventListener('keydown', this);
        this._input.removeEventListener('input', this);
        this._list.removeEventListener('click', this);
        this._list.removeEventListener('keyup', this);
        this._list.removeEventListener('keydown', this);
        this._list.remove();
        document.body.removeEventListener('click', this);
    };
    /**
     * Create the listitems based on the data array
     */
    Combobox.prototype.createListItems = function () {
        var _this = this;
        if (this.isCheckboxFilter) {
            this.data.forEach(function (item, index) {
                var el = utils_1.Utils.CreateNode(ITEM_COMBOBOX_TEMPLATE
                    .replace('$label', item.name)
                    .replace(/\$id/g, index.toString()));
                el[DATAFIELD] = item;
                el.querySelector('input').addEventListener('change', function () {
                    _this.buildFilterList();
                });
                el.querySelector('input').addEventListener('keydown', function (event) {
                    if (utils_1.Utils.IsKeyPressed(event, 'Escape')) {
                        _this.close();
                    }
                    if (utils_1.Utils.IsKeyPressed(event, 'Tab')) {
                        var allItems = _this._list.querySelectorAll('input');
                        if (!event.shiftKey) {
                            if (index >= allItems.length - 1) {
                                _this.close();
                            }
                        }
                        else if (index === 0) {
                            _this.close();
                        }
                    }
                });
                _this._list.appendChild(el);
            });
            return;
        }
        if (!this.data) {
            return;
        }
        this.data.forEach(function (item) {
            var label = _this.labelFunction(item);
            var el = utils_1.Utils.CreateNode(ITEM_TEMPLATE.split('%s').join(label));
            el[DATAFIELD] = item;
            _this._list.appendChild(el);
        });
    };
    /**
     * Adds a no result node to the list.
     */
    Combobox.prototype.createNoResultItem = function () {
        var el = utils_1.Utils.CreateNode(NO_RESULT_TEMPLATE);
        this._list.appendChild(el);
    };
    /**
     * This is the default filterFunction.
     * @param item
     * @param idx
     */
    Combobox.prototype.defaultFilter = function (item, idx) {
        // Return if matched, this way, we can easily check if there
        // are any matches
        if (this.isCheckboxFilter) {
            item = item.name;
        }
        return item.toString().toLowerCase().indexOf(this.query.toLowerCase()) > -1;
    };
    /**
     * This is the default labelFunction, which will return the item if it's a string,
     * or the labelField if it's an object
     * @param item
     * @param idx
     */
    Combobox.prototype.defaultLabel = function (item, idx) {
        if (typeof item === 'string') {
            return item;
        }
        else if (this.labelField && item.hasOwnProperty(this.labelField)) {
            return item[this.labelField].toString();
        }
        // Fallback, we don't want to do this, probably returns [Object object]
        return item.toString();
    };
    /**
     * Filters the list based on the value of the input
     */
    Combobox.prototype.filterInput = function () {
        var _this = this;
        if (!this.data) {
            return;
        }
        window.clearTimeout(this._inputTimeoutId);
        this._inputTimeoutId = window.setTimeout(function () {
            if (_this._prevQuery !== _this.query) {
                _this._prevQuery = _this.query;
                var results = _this.data.filter(function (item, idx, arr) {
                    var listItem = _this._list.children[idx];
                    var link = listItem.querySelector('.combobox__link'), match = _this.filterFunction.call(_this, item, idx, arr);
                    // Initially hide all items
                    listItem.hidden = true;
                    if (match) {
                        // Show only matches
                        listItem.hidden = false;
                        // When using the default filter, we can highlight the results
                        if (_this._highlight && _this.query) {
                            link.innerHTML = link.textContent
                                .split(_this.query)
                                .join("<span class=\"combobox__match\">" + _this.query + "</span>");
                        }
                    }
                    else if (_this._highlight) {
                        // Reset matches for non matching items (remove <spans>)
                        link.nodeValue = link.textContent;
                    }
                    return match;
                });
                results.length ? _this.hideNoResultItem() : _this.showNoResultItem();
                if (!_this.isOpen) {
                    _this.open();
                }
            }
        }, this.inputTimeout);
    };
    /**
     * Show the no result item in the dropdown.
     */
    Combobox.prototype.showNoResultItem = function () {
        var noResultElement = this._list.querySelector('.combobox__item--no-results');
        noResultElement.hidden = false;
        // remove event listeners because we don't want the no result item to be interactable.
        this._list.removeEventListener('click', this);
        this._list.removeEventListener('keyup', this);
        this._list.removeEventListener('keydown', this);
    };
    /**
     * Hide the no result item in the dropdown.
     */
    Combobox.prototype.hideNoResultItem = function () {
        var noResultElement = this._list.querySelector('.combobox__item--no-results');
        noResultElement.hidden = true;
        // reinstate event listeners.
        if (!this.isCheckboxFilter) {
            this._list.addEventListener('click', this);
        }
        this._list.addEventListener('keyup', this);
        this._list.addEventListener('keydown', this);
    };
    /**
     * Move the focus to the next item in the list
     * @param {number} direction, 1 for forward, -1 for backward
     */
    Combobox.prototype.focusNextItem = function (direction) {
        if (direction === void 0) { direction = 1; }
        var focusableItem = document.activeElement;
        // Check if item belongs to this combobox
        if (focusableItem.classList.contains('combobox__item') &&
            utils_1.Utils.IsDescendant(focusableItem, this.host)) {
            // Are we moving forward or backward
            var method = direction === 1 ? 'nextElementSibling' : 'previousElementSibling';
            // Find next focusable element. Focusable elements are elements
            // that are not hidden
            while (focusableItem[method]) {
                focusableItem = focusableItem[method];
                if (!focusableItem.hidden) {
                    // When we found an element, focus it
                    focusableItem.focus();
                    break;
                }
            }
        }
        else {
            var items = this._list.querySelectorAll('.combobox__item');
            for (var i = 0, j = items.length; i < j; i += 1) {
                var item = items[i];
                if (!item.hasAttribute('hidden')) {
                    item.focus();
                    break;
                }
            }
        }
    };
    /**
     * Called when anything which alters the displayed data has changed
     * (data / labelField)
     */
    Combobox.prototype.initialize = function () {
        var _this = this;
        clearTimeout(this._initTimeoutId);
        this._initTimeoutId = window.setTimeout(function () {
            _this.removeListItems();
            _this.createListItems();
            _this.createNoResultItem();
            if (_this.mode === exports.MODE_AUTOCOMPLETE) {
                _this.filterInput();
            }
        }, this._initTimeout);
    };
    /**
     * Applies validation to the input. Called when the value of the input has changed
     */
    Combobox.prototype.onInputinput = function () {
        if (this.data && !this.allowUnknown && this.data.indexOf(this._input.value) === -1) {
            this._input.setCustomValidity(this.validationError);
        }
        else {
            this._input.setCustomValidity('');
        }
    };
    /**
     * Called when the user uses keyboard nav on the input,
     * prevents body scrolling and event propagation.
     * @param {KeyboardEvent} event
     */
    Combobox.prototype.onInputkeydown = function (event) {
        event.stopPropagation();
    };
    /**
     * Keyboard handler for the input
     * Escape: Close the dropdown
     * ArrowDown / ArrowUp: Move the focus to the list
     * @param {KeyboardEvent} event
     */
    Combobox.prototype.onInputkeyup = function (event) {
        if (utils_1.Utils.IsKeyPressed(event, 'Escape')) {
            return this.close();
        }
        else if (utils_1.Utils.IsKeyPressed(event, 'ArrowDown') || utils_1.Utils.IsKeyPressed(event, 'ArrowUp')) {
            if (!this.isOpen) {
                this.open();
                var list = this._list.querySelector('.combobox__item');
                if (list) {
                    list.focus();
                }
            }
            else {
                this.focusNextItem(utils_1.Utils.IsKeyPressed(event, 'ArrowDown') ? 1 : -1);
            }
        }
        if (this.mode === exports.MODE_FILTER) {
            this._value = null;
            this.filterInput();
        }
    };
    /**
     * Called when the user clicks an item from the list
     * @param {Event} event
     */
    Combobox.prototype.onListclick = function (event) {
        this.setValue(this.findDataField(event.target));
    };
    Combobox.prototype.onBodyclick = function (event) {
        if (event.target !== this._input &&
            event.target !== this._toggle &&
            event.target !== this._icon &&
            event.target !== this._list) {
            // don't close the flyout if we are checking off an checkbox item.
            if (this.isCheckboxFilter && this.findDataField(event.target) != null) {
                return;
            }
            this.close();
        }
    };
    /**
     * When the user clicks on the text instead of the list item, we need to find
     * the element with the datafield.
     * We traverse the parents until an element with [DATAFIELD] is found, or no parent is found (should not happen)
     *
     * @param {HTMLElement} el
     * @returns {any}
     */
    Combobox.prototype.findDataField = function (el) {
        while (el && !el[DATAFIELD]) {
            el = el.parentElement;
        }
        return el && el[DATAFIELD];
    };
    /**
     * Called when the user uses keyboard nav inside the list,
     * prevents body scrolling and event propagation
     * @param {KeyboardEvent} event
     */
    Combobox.prototype.onListkeydown = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    /**
     * Keyboard handling for the select list,
     * Escape: Close the dropdown
     * ArrowDown: Focus to the next item in the list
     * ArrowUp: Focus to the previous item in the list
     * Enter: Select the currently focused item
     * @param {KeyboardEvent} event
     */
    Combobox.prototype.onListkeyup = function (event) {
        event.preventDefault();
        if (utils_1.Utils.IsKeyPressed(event, 'Escape')) {
            this._value = null;
            this.close();
        }
        else if (utils_1.Utils.IsKeyPressed(event, 'ArrowDown') || utils_1.Utils.IsKeyPressed(event, 'ArrowUp')) {
            this.focusNextItem(utils_1.Utils.IsKeyPressed(event, 'ArrowDown') ? 1 : -1);
        }
        else if (utils_1.Utils.IsKeyPressed(event, 'Enter')) {
            var focusedItem = document.activeElement;
            if (focusedItem.classList.contains('combobox__item')) {
                var val = this.findDataField(focusedItem);
                this.setValue(val);
            }
        }
    };
    /**
     * Called when the user clicks the dropdown button
     * @param {Event} event
     */
    Combobox.prototype.onToggleclick = function (event) {
        if (this.isOpen) {
            this._value = null;
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Updates the filter list with passed items.
     *      * Adds event listener to the filter to uncheck the
     *      * corresponding checkbox and rebuild the filterlist.
     * @param collection The filters we are adding
     */
    Combobox.prototype.updateFilterList = function (collection) {
        var _this = this;
        var container = this.getFilterContainer();
        container.innerHTML = '';
        var index;
        for (var i = 0; i < collection.length; i++) {
            index = i;
            var filterNode = utils_1.Utils.CreateNode('<li tabindex="0">' + collection[i] + '</li>');
            filterNode.id = i.toString();
            filterNode.addEventListener('click', function (event) { return _this.onFilterLabelClick(event.target); });
            filterNode.addEventListener('keyup', function (event) {
                if (utils_1.Utils.IsKeyPressed(event, 'Enter')) {
                    _this.onFilterLabelClick(event.target);
                }
            });
            container.appendChild(filterNode);
        }
    };
    Combobox.prototype.onFilterLabelClick = function (element) {
        // uncheck the corresponding checkbox if we are using
        // a checkbox filter
        if (this.isCheckboxFilter) {
            var filterNode = element;
            var controllingCheckbox = this._list.querySelectorAll('.input__control:checked')[filterNode.id];
            controllingCheckbox.checked = false;
            var container = this.getFilterContainer();
            // rebuild the list
            this.buildFilterList();
            // check focus
            if (container.querySelectorAll('li').length === 0) {
                // focus list
                this._input.focus();
            }
            else {
                // focus previous element
                var previousSibling = parseInt(filterNode.id) > 0 ? parseInt(filterNode.id) - 1 : 0;
                var focusableItem = container.querySelectorAll('li')[previousSibling];
                focusableItem.focus();
            }
        }
    };
    /**
     * Adds a list--filter to the combobox for showing the
     * currently checked checkboxes.
     * If the element does not exist within the host, a new
     * element will be inserted.
     */
    Combobox.prototype.getFilterContainer = function () {
        // if no element is referenced
        if (this._filterContainer === null) {
            // does a list--filter already exist on the host?
            this._filterContainer = this.host.querySelector('.list--filter');
            if (this._filterContainer === null) {
                // create a new list--filter and add it before the input
                this._filterContainer = utils_1.Utils.CreateNode("<ul class=\"list list--filter list--filter-inline list--filter-closable\" />");
                this.host.insertBefore(this._filterContainer, this.host.querySelector('.combobox__input'));
            }
        }
        return this._filterContainer;
    };
    /**
     * Prepares the filterlist by passing all checked boxes to the updateFilterList
     */
    Combobox.prototype.buildFilterList = function () {
        this._value = [];
        var checkedItems = this._list.querySelectorAll('.input__control:checked');
        for (var i = 0; i < checkedItems.length; i++) {
            this._value.push(checkedItems[i].parentElement.querySelector('.input__label').textContent);
        }
        this.updateFilterList(this._value);
    };
    /**
     * Set the value of the input based on a list item
     * Dispatches an 'combobox-select' event
     * @param {string} value
     */
    Combobox.prototype.setValue = function (value) {
        var event = document.createEvent('CustomEvent');
        event.initEvent('combobox-select', true, true);
        event.data = value;
        if (!this.isCheckboxFilter && this.host.dispatchEvent(event)) {
            this.value = value;
            this.close();
        }
    };
    /**
     * Scaffolding, add correct classes & elements
     */
    Combobox.prototype.setup = function () {
        if (!this.host.querySelector('.combobox__input')) {
            throw new Error('Host element should contain a text input');
        }
        if (!this.host.classList.contains('combobox')) {
            this.host.classList.add('combobox');
        }
        // Check if the icon is present
        if (!this.host.querySelector('.combobox__icon')) {
            this._icon = utils_1.Utils.CreateNode("<i class=\"combobox__icon icon icon-magnifier\" role=\"presentation\"></i>");
            this.host.appendChild(this._icon);
        }
        // Check if the button is present
        this._toggle = this.host.querySelector('.combobox__toggle');
        if (!this._toggle) {
            // No button, create it
            this._toggle = utils_1.Utils.CreateNode("<button type=\"button\" class=\"combobox__toggle\"></button>");
            this.host.appendChild(this._toggle);
        }
        // Check if the autocomplete list is present
        if (!this.host.querySelector('.combobox__autocomplete')) {
            var list = utils_1.Utils.CreateNode("<div class=\"combobox__autocomplete\">\n                     <div class=\"combobox__list-wrapper\">\n                         <ul class=\"combobox__list\" tabindex=\"0\" hidden>\n                         </ul>\n                     </div>\n                 </div>");
            this.host.appendChild(list);
        }
        // Store a reference to the <ul>
        this._list = this.host.querySelector('.combobox__list');
        // When we allow multiple, we create compact checkboxes from the element children
        if (this.isCheckboxFilter) {
            // add the modifier
            this._list.classList.add('combobox__list--multiple');
            this._list.setAttribute('tabindex', '-1');
            // get reference to the current input
            var checkboxValues = this.host.querySelector('.combobox__input');
            // use the _data for storing the items
            this._data = [];
            for (var i = 0; i < checkboxValues.children.length; i++) {
                this._data.push({ name: checkboxValues.children[i].textContent, value: '' });
            }
            // swap the current element with an original input and copy the classes
            var inputElement = utils_1.Utils.CreateNode('<input />');
            inputElement.className = checkboxValues.className;
            this.host.replaceChild(inputElement, checkboxValues);
            // create the items in the list
            this.createListItems();
            // create no result item in the  list
            this.createNoResultItem();
        }
        // Store a reference to the <input>
        this._input = this.host.querySelector('.combobox__input');
    };
    Combobox.prototype.setupListeners = function () {
        // Add a click listener to the button
        this._toggle.addEventListener('click', this);
        this._input.addEventListener('keyup', this);
        this._input.addEventListener('keydown', this);
        this._input.addEventListener('input', this);
        if (!this.isCheckboxFilter) {
            this._list.addEventListener('click', this);
        }
        this._list.addEventListener('keyup', this);
        this._list.addEventListener('keydown', this);
        document.body.addEventListener('click', this);
    };
    /**
     * Removes all the listitems from the suggest list
     */
    Combobox.prototype.removeListItems = function () {
        // list.remove
        while (this._list.lastChild) {
            this._list.removeChild(this._list.lastChild);
        }
    };
    return Combobox;
})();
exports.Combobox = Combobox;
