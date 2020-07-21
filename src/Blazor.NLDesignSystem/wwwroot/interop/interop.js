//Combobox

<script>
  System.import('/uno/components/form/combobox.js').then(function (module) {
        var combobox = new module.Combobox(document.getElementById('example_combobox'));
        combobox.allowUnknown = false;
        combobox.data = data; // your data
    });

</script>



//Collapse

function collapse(el) {
    System.import('_content/Blazor.NLDesignSystem/dist/components/collapse/collapse.js').then(function (module) {
        new module.Collapse(el);
    });
}

//Navigation

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