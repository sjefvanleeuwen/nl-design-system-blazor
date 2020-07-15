function navigationSubmenu(el) {
  System.import('_content/Blazor.NLDesignSystem/dist/components/navigation/navigation.js').then(function (module) {
    new module.SubMenuNavigation(el);
  });
}

function navitationAutoResize() {
  // Load nav component
  System.import('_content/Blazor.NLDesignSystem/dist/components/navigation/navigation.js').then(function (module) {
    var navs = document.querySelectorAll('.top-nav-autoresize');
    // Initialize all navs
    for (var i = 0; i < navs.length; i++) {
      //new module.AutoResizeNavigation(navs.item(i));
    }
  });
}