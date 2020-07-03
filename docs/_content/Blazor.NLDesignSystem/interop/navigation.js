function subMenuNavigation(el) {
    System.import('/uno/components/navigation/navigation.js').then(function (module) {
        var submenus = el.querySelectorAll('.nav--submenu');
        // Initialize all submenus
        for (var i = 0; i < submenus.length; i++) {
            new module.SubMenuNavigation(submenus.item(i));
        }
    });
}

