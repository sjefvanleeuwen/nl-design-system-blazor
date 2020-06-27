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
require('../../core/polyfills');
/**
 * @class CheckboxGroup
 * Adds support for grouped checkboxes in tables or lists
 * Usage:
 * System.import('/node_modules/uno/dist/components/form/checkbox.js').then(function (module) {
 *    var checkboxGroup = document.getElementById('table_nested');
 *    new module.CheckboxGroup(checkboxGroup);
 * });
 */
var CheckboxGroup = (function () {
    function CheckboxGroup(container) {
        var _this = this;
        this.container = container;
        if (this.container.nodeName.toLowerCase() === 'ul' || this.container.nodeName.toLowerCase() === 'table') {
            var checkboxes = this.container.querySelectorAll('.input__control--checkbox');
            checkboxes.forEach(function (checkbox) {
                checkbox.addEventListener('click', _this);
            });
        }
        else {
            throw new Error("Incompatible element passed, expected <ul> or <table>, got " + this.container.nodeName);
        }
    }
    CheckboxGroup.prototype.destroy = function () {
        var _this = this;
        var checkboxes = this.container.querySelectorAll('.input__control--checkbox');
        checkboxes.forEach(function (checkbox) {
            checkbox.removeEventListener('click', _this);
        });
    };
    CheckboxGroup.prototype.handleEvent = function (evt) {
        if (evt.type === 'click') {
            var parent_1 = evt.currentTarget.parentElement;
            if (parent_1.nodeName.toLowerCase() === 'li') {
                // List mode
                this.onListCheckboxClick(evt.currentTarget);
            }
            else {
                // Table mode
                this.onTableCheckboxClick(evt.currentTarget);
            }
        }
    };
    CheckboxGroup.prototype.onListCheckboxClick = function (checkbox) {
        var parent = checkbox.parentElement;
        if (parent.classList.contains('input__group--checkbox')) {
            // group checkbox
            var ul = parent.querySelector('ul');
            if (ul) {
                var checkboxes = ul.querySelectorAll('.input__control--checkbox');
                checkboxes.forEach(function (child) { return child.checked = checkbox.checked; });
            }
        }
        else {
            // child checkbox
            while (parent && !parent.classList.contains('input__group')) {
                parent = parent.parentNode;
            }
            if (parent) {
                var ul = parent.querySelector('ul');
                var parentCheckbox = parent.querySelector('.input__control--checkbox');
                var checkboxesLength = ul.querySelectorAll('.input__control--checkbox').length;
                var checkedCount = ul.querySelectorAll('.input__control--checkbox:checked').length;
                parentCheckbox.checked = checkedCount > 0;
                parentCheckbox.indeterminate = checkedCount > 0 && checkedCount < checkboxesLength;
            }
        }
    };
    CheckboxGroup.prototype.onTableCheckboxClick = function (checkbox) {
        var table = checkbox.parentElement;
        while (table && table.nodeName.toLowerCase() !== 'table') {
            table = table.parentNode;
        }
        var checkboxes = table.querySelectorAll('.input__control--checkbox');
        if (table.querySelector('.input__control--checkbox') === checkbox) {
            // Group checkbox item
            checkboxes.forEach(function (child, idx) {
                // Skip first item, that's the group checkbox
                if (idx > 0) {
                    child.checked = checkbox.checked;
                }
            });
        }
        else {
            // Child checkbox
            var checkboxesLength = checkboxes.length - 1;
            var checkedCount = table.querySelectorAll('tbody .input__control--checkbox:checked').length;
            checkboxes.item(0).checked = checkedCount > 0;
            checkboxes.item(0).indeterminate = checkedCount > 0 && checkedCount < checkboxesLength;
        }
    };
    return CheckboxGroup;
})();
exports.CheckboxGroup = CheckboxGroup;
