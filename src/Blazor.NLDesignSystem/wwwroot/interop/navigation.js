function navigationSubmenu(el) {
  System.import('/uno/components/navigation/navigation.js').then(function (module) {
    var submenus = el.querySelectorAll('.nav--submenu');
    // Initialize all submenus
    for (var i = 0; i < submenus.length; i++) {
      new module.SubMenuNavigation(submenus.item(i));
    }
  });
}

function navitationAutoResize() {
  // Load nav component
  System.import('/uno/components/navigation/navigation.js').then(function (module) {
    var navs = document.querySelectorAll('.top-nav-autoresize');
    // Initialize all navs
    for (var i = 0; i < navs.length; i++) {
      new module.AutoResizeNavigation(navs.item(i));
    }
  });
}