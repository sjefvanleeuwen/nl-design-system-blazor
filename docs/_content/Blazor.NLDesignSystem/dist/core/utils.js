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
var Utils = (function () {
    function Utils() {
    }
    /**
     * Generates an unique identifier
     * @return {string}
     * @constructor
     */
    Utils.GenerateUID = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return "uno-" + s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    };
    /**
     * Traverses the dom tree up to find the element containing className
     * @param child
     * @param className The className to find
     * @param root If root is reached while traversing, searching stops and null is returned
     * @return {any}
     */
    Utils.FindParentContainingClass = function (child, className, root) {
        while (child !== root) {
            if (child.classList.contains(className)) {
                return child;
            }
            child = child.parentElement;
        }
        return null;
    };
    Utils.IsDescendant = function (child, parent) {
        var node = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    /**
     * Calculates the total height of an element, combining height & margin
     * @param element
     * @return {number}
     */
    Utils.CalculateElementHeight = function (element) {
        var height = 0;
        if (element) {
            var styles = getComputedStyle(element);
            height += parseInt(styles.height);
            height += parseInt(styles.marginTop);
            height += parseInt(styles.marginBottom);
        }
        return height;
    };
    Utils.CreateNode = function (html) {
        return new DOMParser().parseFromString(html, 'text/html').body.firstChild;
    };
    /**
     * Turns a string-like-this into a StringLikeThis
     * @param {string} string
     * @return {string}
     * @constructor
     */
    Utils.CamelCase = function (dashed) {
        return dashed.split('-').map(function (item) { return item.substring(0, 1).toUpperCase() + item.substring(1).toLowerCase(); }).join('');
    };
    /**
     * Checks if a certain key is pressed, converts keynames to browser specific names.
     * For instance, the 'ArrowDown' key in Chrome is called 'ArrowDown', in IE it's called 'Down'
     * @param event The original event
     * @param key The name of the key, as specified in the docs (https://developer.mozilla.org/nl/docs/Web/API/KeyboardEvent/key/Key_Values)
     * @constructor
     */
    Utils.IsKeyPressed = function (event, key) {
        var ambiguous = {
            ' ': ['Space', 'Spacebar', 'Space Bar'],
            'ArrowDown': ['Down'],
            'ArrowLeft': ['Left'],
            'ArrowRight': ['Right'],
            'ArrowUp': ['Up'],
            'ContextMenu': ['Apps'],
            'CrSel': ['Crsel'],
            'Delete': ['Del'],
            'Escape': ['Esc'],
            'ExSel': ['Exsel']
        };
        if (event.key === key) {
            return true;
        }
        if (ambiguous.hasOwnProperty(key)) {
            return ambiguous[key].reduce(function (pressed, alt) {
                pressed = pressed || event.key === alt;
                return pressed;
            }, false);
        }
        return false;
    };
    /**
     * Focuses the next item in the nodeList (or previous with shift-modifier)
     * @param event the keyboard event
     * @param nodeList the collection of focusable items
     */
    Utils.FocusChild = function (event, nodeList) {
        // get list of focusable items
        var focusableItems;
        // convert Nodelist to Array using array prototype
        focusableItems = Array.prototype.slice.call(nodeList, 0);
        // sort according to tabindex
        focusableItems.sort(function (a, b) {
            var aInd = a.getAttribute('tabindex');
            var bInd = b.getAttribute('tabindex');
            if (aInd > bInd) {
                return 1;
            }
            else if (aInd < bInd) {
                return -1;
            }
            return 0;
        });
        // get currently focused item
        var focusedItem;
        focusedItem = document.querySelector(':focus');
        // get the number of focusable items
        var numberOfFocusableItems;
        numberOfFocusableItems = focusableItems.length;
        // get the index of the currently focused item
        var focusedItemIndex;
        focusedItemIndex = Array.prototype.indexOf.call(focusableItems, focusedItem);
        if (event.shiftKey) {
            // back tab
            // if focused on first item and user preses back-tab, go to the last focusable item
            if (focusedItemIndex === 0) {
                focusableItems[numberOfFocusableItems - 1].focus();
                event.preventDefault();
            }
            else {
                focusableItems[focusedItemIndex - 1].focus();
                event.preventDefault();
            }
        }
        else {
            // forward tab
            // if focused on the last item and user preses tab, go to the first focusable item
            if (focusedItemIndex === numberOfFocusableItems - 1) {
                focusableItems[0].focus();
                event.preventDefault();
            }
            else {
                focusableItems[focusedItemIndex + 1].focus();
                event.preventDefault();
            }
        }
    };
    return Utils;
})();
exports.Utils = Utils;
