//////
// Event listeners
//////

window.NlDesignSystemBlazor = window.NlDesignSystemBlazor || {};
window.NlDesignSystemBlazor.elements = [];

function setEventListener(eventName, handler, JSObjectRef) {
  let listener = function (e) {
    JSObjectRef.invokeMethodAsync("EventCallback", eventName, JSON.stringify(e));
  };
  handler.addEventListener(eventName, listener);
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

function removeElement(id) {
  var oldElement = getElementById(id, true);
  if (oldElement != null) {
    window.NlDesignSystemBlazor.elements.splice(window.NlDesignSystemBlazor.elements.findIndex(item => item.id === id), 1);
  }
}

function addElement(id, element) {
  removeElement(id);
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
// Checkbox
//////

function checkbox(el) {
  System.import('_content/Blazorized.NLDesignSystem/dist/components/form/checkbox.js').then(function (module) {
    new module.CheckboxGroup(el);
  });
}

//////
// Collapse
//////

var collapsePrefix = "_collapse_";

function collapse(el, id) {
  System.import('_content/Blazorized.NLDesignSystem/dist/components/collapse/collapse.js').then(function (module) {
    var collapse = new module.Collapse(el);
    if (id != null) { //on purpose not a type specific comparison
      addElement(collapsePrefix + id, collapse);
    }
  });
}

async function closeCollapse(id) {
  var collapse = getElementById(collapsePrefix + id);
  collapse.close();
}

async function destroyCollapse(id) {
  var collapse = getElementById(collapsePrefix + id);
  collapse.destroy();
  removeElement(collapsePrefix + id);
}

async function openCollapse(id) {
  var collapse = getElementById(collapsePrefix + id);
  collapse.open();
}

async function toggleCollapse(id) {
  var collapse = getElementById(collapsePrefix + id);
  collapse.toggle();
}

//////
// Combobox
//////

var comboboxPrefix = "_combobox_";

async function combobox(el, id, allowUnknown, isAutocomplete, dataArray, isMultiple) {
  await System.import('_content/Blazorized.NLDesignSystem/dist/components/form/combobox.js').then(function (module) {
    var combobox = new module.Combobox(el, isMultiple);
    addElement(comboboxPrefix + id, combobox);
    if (!isMultiple) {
      allowUnknownCombobox(id, allowUnknown);
      setComboboxData(id, dataArray);
    }
    if (isAutocomplete) {
      combobox.mode = module.MODE_AUTOCOMPLETE;
    }
  });
}

async function closeCombobox(id) {
  var combobox = getElementById(comboboxPrefix + id);
  combobox.close();
}

async function allowUnknownCombobox(id, allowUnknown) {
  var combobox = getElementById(comboboxPrefix + id);
  combobox.allowUnknown = allowUnknown;
}

async function comboboxIsOpen(id) {
  var combobox = getElementById(comboboxPrefix + id);
  return combobox.isOpen;
}

async function getComboboxValue(id) {
  var combobox = getElementById(comboboxPrefix + id);
  return combobox.value;
}

async function openCombobox(id) {
  var combobox = getElementById(comboboxPrefix + id);
  combobox.open();
}

async function setComboboxData(id, dataArray) {
  var combobox = getElementById(comboboxPrefix + id);
  combobox.data = dataArray;
}

async function setComboboxLoading(id, loading) {
  var combobox = getElementById(comboboxPrefix + id);
  combobox.loading = loading;
}



async function triggerComboboxUpdateSelectedList(el, JSObjectRef) {
  el.querySelectorAll('ul.list.list--filter.list--filter-inline.list--filter-closable > li').forEach(function (selectedValue) {
    selectedValue.addEventListener('click', function () {
      JSObjectRef.invokeMethodAsync('UpdateSelectedList');
    });
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

function navitationAutoResize(el) {
  System.import('_content/Blazorized.NLDesignSystem/dist/components/navigation/navigation.js').then(function (module) {
      new module.AutoResizeNavigation(el);
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

var tabsPrefix = "_tabs_";

function tabs(el, id) {
  System.import('_content/Blazorized.NLDesignSystem/dist/components/tabs/tabs.js').then(function (module) {
    tabs = new module.Tabs(el);
    if (id != null) { //on purpose not a type specific comparison
      addElement(tabsPrefix + id, tabs);
    }
  });
}

async function destroyTabs(id) {
  var tabs = getElementById(tabsPrefix + id);
  tabs.destroy();
  removeElement(tabsPrefix + id);
}

async function disableTab(id, idx) {
  var tabs = getElementById(tabsPrefix + id);
  tabs.disableTab(idx);
}

async function enableTab(id, idx) {
  var tabs = getElementById(tabsPrefix + id);
  tabs.enableTab(idx);
}

async function getActiveTabIndex (id) {
  var tabs = getElementById(tabsPrefix + id);
  return tabs.activeTabIndex;
}

async function openTab(id, idx) {
  var tabs = getElementById(tabsPrefix + id);
  tabs.openTab(idx);
}

//////
// Tooltip
//////

function tooltip(el) {
  System.import('_content/Blazorized.NLDesignSystem/dist/components/tooltip/tooltip.js').then(function (module) {
    new module.Tooltip(el);
  });
}