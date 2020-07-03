(function () {
    if (window.addEventListener) {
        window.addEventListener('load', onLoad);
    }

    function onLoad() {
        "use strict";
        if (location.search.indexOf('debug') !== -1) {
            document.querySelector('.debug input').setAttribute('checked', 'checked');
        }
    }
})();
