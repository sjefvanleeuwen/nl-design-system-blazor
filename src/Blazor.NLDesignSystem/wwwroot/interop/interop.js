//Event listeners

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

function getElementById (id, unobstrusive = false) {
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

function addElement(id, element, registrationId) {
    var oldElement = getElementById(id, true);
    if (oldElement != null) {
       window.NlDesignSystemBlazor.elements.splice(window.NlDesignSystemBlazor.elements.findIndex(item => item.id === id), 1);
       oldElement.dispose();
    }
    window.NlDesignSystemBlazor.elements.push({ id: registrationId, element: element });
}

//Collapse

function collapse(el) {
  System.import('_content/Blazor.NLDesignSystem/dist/components/collapse/collapse.js').then(function (module) {
    new module.Collapse(el);
  });
}

//Combobox

var comboboxPrefix = "combobox_";

function getComboboxById(id) {
  var retrievalId = comboboxPrefix + id;
  return getElementById(retrievalId);
}

async function combobox(el, id, dataArray) {
  await System.import('_content/Blazor.NLDesignSystem/dist/components/form/combobox.js').then(function (module) {
    var combobox = new module.Combobox(el);
    combobox.allowUnknown = false;
    combobox.data = dataArray;
    var registrationId = comboboxPrefix + id;
    addElement(id, combobox, registrationId);
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