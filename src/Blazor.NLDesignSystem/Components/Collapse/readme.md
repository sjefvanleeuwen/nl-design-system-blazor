# Implementation status
Blazor implementation of [NL Design System](https://nl-design-system.gitlab.io/nl-design-system/index.html) version 0.1.1. 

[Collapse](https://nl-design-system.gitlab.io/nl-design-system/componenten/collapse/index.html)

Status: Fully implemented (See notes!)

### Notes
- Collapsable table is implemented in [Table](../Table)
- For the javascript methods to work as a Blazor call an Identifyer should be provided

Status: Some features not implemented:
- Interop not implemented
	- Publieke methodes
		- open()
		- close()
		- toggle()
		- destroy()
	- Events
		- collapse-close
		- collapse-open