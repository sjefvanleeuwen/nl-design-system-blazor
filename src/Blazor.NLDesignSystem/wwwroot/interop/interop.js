//////
// Event listeners
//////

window.NlDesignSystemBlazor = window.NlDesignSystemBlazor || {};
window.NlDesignSystemBlazor.elements = [];

function setEventListener(eventName, handler, JSObjectRef) {
  let listener = function (e) {
    JSObjectRef.invokeMethodAsync("EventCallback", eventName, JSON.stringify(e));
  };
  switch (eventName) {
    case "combobox-select": handler.addEventListener(eventName, listener);
      break;
  }
}

//////
// Adding and getting Elements
//////

function getElementById(id, unobstrusive = false) {
  let elementHolder = window.NlDesignSystemBlazor.elements.find(e => e.id === id);
  if (!elementHolder) {
    if (unobstrusive) return null;
    throw "Couldn't find the element with id: " + id + " elements.length: " + window.NlDesignSystemBlazor.elements.length;
  }
  else if (!elementHolder.element) {
    if (unobstrusive) return null;
    throw "element is null for elementHolder: " + elementHolder.id;
  }
  return elementHolder.element;
}

function addElement(id, element) {
  var oldElement = getElementById(id, true);
  if (oldElement != null) {
    window.NlDesignSystemBlazor.elements.splice(window.NlDesignSystemBlazor.elements.findIndex(item => item.id === id), 1);
    oldElement.dispose();
  }
  window.NlDesignSystemBlazor.elements.push({ id: id, element: element });
}

//////
// Chart
//////

function donutChart(el, value) {
  System.import('_content/Blazorized.NLDesignSystem/dist/components/donut-chart/donut-chart.js').then(function (module) {
    donutChart = new module.DonutChart(el);
    donutChart.value = value;
    donutChart.draw();
  });
}

// Methods done in Blazor, no javascript needed

//////
// Collapse
//////

function collapse(el) {
  System.import('_content/Blazorized.NLDesignSystem/dist/components/collapse/collapse.js').then(function (module) {
    new module.Collapse(el);
  });
}

//////
// Combobox
//////

async function combobox(el, dataArray) {
  await System.import('_content/Blazorized.NLDesignSystem/dist/components/form/combobox.js').then(function (module) {
    var combobox = new module.Combobox(el);
    combobox.allowUnknown = false;
    combobox.data = dataArray;
  });
}

//////
// Modal
//////

var modalPrefix = "_modal_";

async function modal(el, id) {
  await System.import('_content/Blazorized.NLDesignSystem/dist/components/modal/modal.js').then(function (module) {
    var modal = new module.Modal(el);
    addElement(modalPrefix + id, modal);
  });
}

async function openModal(id) {
  var modal = getElementById(modalPrefix + id);
  modal.open();
}


//////
// Navigation
//////

function navigationSubmenu(el) {
  System.import('_content/Blazorized.NLDesignSystem/dist/components/navigation/navigation.js').then(function (module) {
    new module.SubMenuNavigation(el);
  });
}

function navitationAutoResize() {
  // Load nav component
  System.import('_content/Blazorized.NLDesignSystem/dist/components/navigation/navigation.js').then(function (module) {
    var navs = document.querySelectorAll('.top-nav-autoresize');
    // Initialize all navs
    for (var i = 0; i < navs.length; i++) {
      //new module.AutoResizeNavigation(navs.item(i));
    }
  });
}

//////
// Notification
//////

// Done in Blazor, no javascript needed

//////
// Table
//////

function table(el) {
  System.import('_content/Blazorized.NLDesignSystem/dist/components/table/TableResponsive.js').then(function (module) {
    new module.TableResponsive(el);
  });
}

//////
// Tabs
//////

function tabs(el) {
  System.import('_content/Blazorized.NLDesignSystem/dist/components/tabs/tabs.js').then(function (module) {
    new module.Tabs(el);
  });
}

//////
// Tooltip
//////

function tooltip(el) {
  System.import('_content/Blazorized.NLDesignSystem/dist/components/tooltip/tooltip.js').then(function (module) {
    new module.Tooltip(el);
  });
}