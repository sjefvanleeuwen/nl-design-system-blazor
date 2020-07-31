# Implementation status
Blazor implementation of [NL Design System](https://nl-design-system.gitlab.io/nl-design-system/index.html) version 0.1.1. 

[Button](https://nl-design-system.gitlab.io/nl-design-system/componenten/button/index.html)

Status: Fully implemented (See notes!)

### Notes
- When using an icon in the button use the [NldsIcon component](../Icon).  
The Link als een knop is not implemented because it is a [non preferred practice by Mozilla](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role) (which is also stated in the description of the [Button component](https://nl-design-system.gitlab.io/nl-design-system/componenten/button/index.html))  
This means the DigiD button [a]-tag is not implemented. The Javascript needed is not implemented either.  