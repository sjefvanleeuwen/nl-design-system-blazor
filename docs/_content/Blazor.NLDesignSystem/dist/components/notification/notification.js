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
/**
 * @class Notification
 * Listens for click events on the close button for notification to close the notification using javascript
 */
var Notification = (function () {
    function Notification(element) {
        this.element = element;
    }
    /**
     * Closes the notification
     */
    Notification.prototype.close = function () {
        this.element.parentNode.removeChild(this.element);
    };
    return Notification;
})();
exports.Notification = Notification;
