/**
 * @class CheckboxGroup
 * Adds support for grouped checkboxes in tables or lists
 * Usage:
 * System.import('/node_modules/uno/dist/components/form/checkbox.js').then(function (module) {
 *    var checkboxGroup = document.getElementById('table_nested');
 *    new module.CheckboxGroup(checkboxGroup);
 * });
 */
export declare class CheckboxGroup implements EventListenerObject {
    private container;
    constructor(container: Element);
    destroy(): void;
    handleEvent(evt: Event): void;
    private onListCheckboxClick(checkbox);
    private onTableCheckboxClick(checkbox);
}
