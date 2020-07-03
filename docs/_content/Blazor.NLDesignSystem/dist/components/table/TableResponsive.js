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
var TableResponsive = (function () {
    function TableResponsive(table) {
        this.table = table;
        var columns = table.querySelectorAll('thead tr:first-child th');
        var columnHeadings = [];
        var rows = table.querySelectorAll('tbody tr');
        table.classList.add('table--responsive');
        for (var i = 0; i < columns.length; i++) {
            columnHeadings.push(columns.item(i).textContent);
        }
        for (var i = 0; i < rows.length; i++) {
            var rowCols = rows.item(i).querySelectorAll('td');
            if (rowCols.length === columnHeadings.length) {
                for (var j = 0; j < rowCols.length; j++) {
                    rowCols.item(j).setAttribute('data-col', columnHeadings[j]);
                }
            }
        }
    }
    return TableResponsive;
})();
exports.TableResponsive = TableResponsive;
