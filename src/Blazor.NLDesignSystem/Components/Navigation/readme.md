# Implementation status
Blazor implementation of [NL Design System](https://nl-design-system.gitlab.io/nl-design-system/index.html) version 0.1.1. 

[Navigation](https://nl-design-system.gitlab.io/nl-design-system/componenten/navigation/index.html)

Status: Some features not implemented:
- Navigatiebalk met breadcrumbs menu en knoppen (Blocks part is done)
- Navigatiebalk met subnavigatie
- Zijnavigatie
- In site navigatie

## Errors

- new module.AutoResizeNavigation(navs.item(i)); in navigation.js will result in an error hence autoresize is not yet implemented correctly
- new module.SubMenuNavigation(el); in navigation works but gives an error but html seems to be generated correctly