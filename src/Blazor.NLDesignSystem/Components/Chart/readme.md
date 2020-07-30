# Implementation status
Blazor implementation of [NL Design System](https://nl-design-system.gitlab.io/nl-design-system/index.html) version 0.1.1. 

[Chart](https://nl-design-system.gitlab.io/nl-design-system/componenten/donutchart/index.html)

Status: Fully implemented (See notes!)

### Notes
- The Global variables in donut-chart.js are not configuarable.  
If you want to change `INNER_COLOR` or `GLOBAL_ALPHA_OPACITY` these have to be changed in your copy of the javascript file.
- The JavaScript has been replaced by Blazor. `Draw()` and `Destroy()` should be called on the reference to the chart.