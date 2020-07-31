# Implementation status
Blazor implementation of [NL Design System](https://nl-design-system.gitlab.io/nl-design-system/index.html) version 0.1.1.
This holds the status of the components; if there is an implementation of this component or not.

## Currently implemented

Not all implemented components are fully implemented. Look at the readme for each component for the current status.

- [Backlink](./BackLink)
- [Badge](./Badge)
- [BottomBar](./BottomBar)
- [Button](./Button)
- [Card](./Card)
- [Chart](./Chart)
- [Checkbox](./Form) (as part of Form)
- [Combobox](./Form) (as part of Form)
- [Collapse](./Collapse)
- [ContentHeader](./ContentHeader) (a usable component that is a defined Component in NL-Desing-System, it is used in meta fonr instance and can be re-usable without a meta)
- [DefinitionList](./DefinitionList)
- [File](./File) (as part of Form)
- [Filter](./Form) (is an option in radiobutton and checkbox; IsFilter = true)
- [Footer](./Footer)
- [Form](./Form)
- [Header](./Header)
- [Hint](./Hint)
- [Icon](./Icon) (a usable component that is not a defined Component in NL-Desing-System)
- [Image](./Image)
- [Label](./Label)
- [List](./List)
- [Modal](./Modal)
- [Meta](./Meta)
- [Navigation](./Navigation)
- [Notification](./Notification)
- [Pagination](./Pagination)
- [Quote](./Quote)
- [RadioButton](./Form) (as part of Form)
- [Section](./Section)
- [Skiplink](./Skiplink)
- [Spinner](./Spinner)
- [Switch](./Form) (as part of Form)
- [Table](./Table)
- [Tab](./Tab)
- [Timeline](./Timeline)
- [Tooltip](./Tooltip)
- [Video](./Video)

## Currently not implemented

 - Everything component available in version 0.1.1. has an implementation
 - General makeup like headers and page wrappers need an implementation
 - Colors need to be extented with all other secondary colors
 - Possibly each item can have a specific color (as an example see the background color in the NldsTableRow, part of Table). This should become part of each component; i.e. the components should inherit a base component that can set all the default properties. More input from the developers is needed.

 ## Known Bugs

 - After initialising goes to halfway down the page. This is something that also happens in components description of the [NL Design System](https://nl-design-system.gitlab.io/nl-design-system/componenten/index.html)