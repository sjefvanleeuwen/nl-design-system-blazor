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

Status: Fully implemented (see Notes)

### Notes

- Includes an implementation of filter
- *Geneste checkboxen* uses own interop and not the javascript supplied.
- *Geneste checkboxen - tabel* See Ghost option below.
- Implemented a "Ghost" option (`IsGhost`). This is a checkbox that will be hidden; but can be referenced / integrated into any html/razor file by using `NldsRechboxReference` and providing the corresponding `Identifier` as `Reference`.

## Combobox

[Combobox](https://nl-design-system.gitlab.io/nl-design-system/componenten/combobox/index.html)

Status: Fully implemented (see Notes)

### Notes

- *Combobox met meerdere items* works but should be updated if available in the future. There is no callback event (like `combobox-select`) once items are selected. Nor is there a callback event when a selected item is removed. Added an update to the selected items by reading the selected values when the combobox closes (*this is not optimal*). Also added an onclick event when removing a selected item.
- *Combobox ajax calls* has not been implemented as indicated since ajax calls should not be part of Blazor. Instead the bound `OnValueSet` should be used to have C# do the API call, and the items should be set again via `SetItems(<items>)`. !Important: Set the Parameter `IsAutocomplete` to `true` for this.
- *Combobox met objecten* has not been implemented since it is a Javascript implementation of how to make a list from an object. This should be handled in C#.
- Since the filtering can (should) be part of C# the properties `filterFuncion` and `labelFunction` are not implemented.
- The `query` property is not implemented, this is represented by `Value` which can be bound to the Combobox.
- The `validationError` is also not implemented; this can be done in blazor by validating the bound `Value` vs. the bound `Items`. The Parameter `ErrorText` can be set with a message.
- There is no known method of changing the text "Geen resultaten gevonden".

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

Status: Fully implemented (See notes)

### Notes

- Includes an implementation of filter

## Switch

[Switch](https://nl-design-system.gitlab.io/nl-design-system/componenten/switch/index.html)

Status Fully Implemented