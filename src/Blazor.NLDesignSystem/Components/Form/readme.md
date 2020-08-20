# Implementation status
Blazor implementation of [NL Design System](https://nl-design-system.gitlab.io/nl-design-system/index.html) version 0.1.1. 

## Form

[Form](https://nl-design-system.gitlab.io/nl-design-system/componenten/form/index.html)

Status: Fully implemented (see Notes)

### Notes
- The file upload does not yet handle file uploads (it is better to wait for .net5 to implement this)

## Checkbox

[Checkbox](https://nl-design-system.gitlab.io/nl-design-system/componenten/checkbox/index.html)  
[Filter](https://nl-design-system.gitlab.io/nl-design-system/componenten/filter/index.html)

Status: Some features not implemented:

- Geneste checkboxen - The JavaScript messes with the blazor events when selecting a subitem (the changed event for the parent is triggered). A solution has not been implemented yet.
- Geneste checkboxen - tabel

### Notes
- Includes an implementation of filter

## Combobox

[Combobox](https://nl-design-system.gitlab.io/nl-design-system/componenten/combobox/index.html)

Status: Fully implemented (see Notes)

### Notes

- *Combobox met meerdere items* works but there is no callback event (like `combobox-select`) once items are selected. Nor is there a callback event when a selected item is removed. Manually added an update to the selected items by reading the selected values when the combobox closes, as onclick (removing) of a selected item.
- *Combobox ajax calls* has not been implemented as indicated since ajax calls should not be part of Blazor. Instead the bound Value should be used to have C# do the API call. Then when the call is loaded and the Items are filled, the `Open()` method should be called.
- *Combobox met objecten* has not been implemented since it is a Javascript implementation of how to make a list from an object. This should be handled in C#.
- Since the filtering should be part of C# the `filterFuncion` is not implemented.

## Filter

[Filter](https://nl-design-system.gitlab.io/nl-design-system/componenten/filter/index.html)

Status: Fully Implemented (See Notes)

### Notes

- Filter is implemented as part of the Radiobutton and Checkboxes also to be found in this form.

## File

[File](https://nl-design-system.gitlab.io/nl-design-system/componenten/file/index.html)

Status: Fully implemented (see Notes)

### Notes

- This is a implementation File and an implmentation FileList. FileList is a warpper that can contain multiple files. When a File is part of a Filelist the Property IsPartOfList should be set to true.

## Radiobutton

[Radiobutton](https://nl-design-system.gitlab.io/nl-design-system/componenten/radio/index.html)  
[Filter](https://nl-design-system.gitlab.io/nl-design-system/componenten/filter/index.html)

Status: Fully implemented (See notes!)

### Notes

- Includes an implementation of filter

## Switch

[Switch](https://nl-design-system.gitlab.io/nl-design-system/componenten/switch/index.html)

Status Fully Implemented