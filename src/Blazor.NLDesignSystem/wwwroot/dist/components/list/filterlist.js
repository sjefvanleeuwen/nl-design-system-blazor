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
var FILTER_BUTTON_TEMPLATE = "<button class=\"list--filter-button\">\n    <i class=\"icon icon-cross\"></i>\n</button>";
/**
 * @class FilterList
 */
var FilterList = (function () {
    function FilterList(host, elements) {
        this.host = host;
        this.elements = elements;
        if (host && host.nodeName === 'UL') {
            this.createElements();
        }
        else {
            throw new Error('There is no correct host element specified');
        }
    }
    /**
     * Scaffolding
     */
    FilterList.prototype.createElements = function () {
        for (var i = 0, j = this.elements.length; i < j; i += 1) {
            var value = this.elements[i].value;
            var id = this.elements[i].id;
            var element = this.buildElement(value, id);
            this.host.appendChild(element);
        }
    };
    /**
     * Build the filter element
     * @param value the value of the filter element
     * @param id the id of the filter element
     */
    FilterList.prototype.buildElement = function (value, id) {
        var el = document.createElement('li');
        el.innerHTML = value + FILTER_BUTTON_TEMPLATE;
        el.id = id;
        el.tabIndex = 0;
        el = this.addClickListener(el);
        return el;
    };
    /**
     * Add a listener to the delete button of the filter element
     * @param el the filter element which button needs a delete listener
     */
    FilterList.prototype.addClickListener = function (el) {
        var button = el.querySelector('.list--filter-button');
        button.addEventListener('click', this);
        return el;
    };
    /**
     * Delete a single filter element
     * @param el the element that needs deleting.
     * @fires 'filterlist-deleted-item'
     */
    FilterList.prototype.delete = function (child) {
        this.host.removeChild(child);
        var event = this.createEvent('filterlist-deleted-item');
        event.data = { id: child.id };
        this.host.dispatchEvent(event);
    };
    /**
     * Delete all filter elements
     * @fires 'filterlist-deleted'
     */
    FilterList.prototype.deleteAll = function () {
        var node = this.host;
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        if (!node.firstChild) {
            var event_1 = this.createEvent('filterlist-deleted');
            this.host.dispatchEvent(event_1);
        }
    };
    /**
     * Creates an event
     * @param type the type of the event
     */
    FilterList.prototype.createEvent = function (type, bubble, cancelable) {
        if (bubble === void 0) { bubble = true; }
        if (cancelable === void 0) { cancelable = true; }
        var event = document.createEvent('CustomEvent');
        event.initEvent(type, bubble, cancelable);
        return event;
    };
    /**
     * Handle events for event listeners
     * @param event the event
     */
    FilterList.prototype.handleEvent = function (event) {
        var target = event.currentTarget;
        if (target.classList.contains('list--filter-button')) {
            this.delete(target.parentElement);
        }
    };
    /**
     * Remove listeners and filter elements
     */
    FilterList.prototype.destroy = function () {
        this.deleteAll();
    };
    return FilterList;
})();
exports.FilterList = FilterList;
