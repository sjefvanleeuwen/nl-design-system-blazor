![nl design system for blazor](docs/img/nl-design-system-blazor.svg)
[![nuget](https://img.shields.io/nuget/v/Blazorized.NLDesignSystem)](https://www.nuget.org/packages/Blazorized.NLDesignSystem/) ![.NET Core](https://github.com/sjefvanleeuwen/nl-design-system-blazor/workflows/.NET%20Core/badge.svg)
# What is it?

The NL Design System is a collection of reusable components, with which you can easily develop digital services as a designer or developer. Think of buttons, form elements and page templates. This project adapts the system so the components can be used from .NET Core Blazor (Web Assembly is supported).

For the look and feel and feel of the design system visit:

[NL Design System](https://nl-design-system.gitlab.io/nl-design-system/index.html) version 0.1.1.


# Status

This project componentized mostly all of the components available for NL-DESIGN-SYSTEM.

For a complete up to date status, please visit:

[Available Components](./src/Blazor.NLDesignSystem/Components/readme.md)

# Installation

## Nuget

Start a new Blazor APP and simply install the nuget package.

```
dotnet add package Blazorized.NLDesignSystem --version 0.1.1-alpha3
```

Or go to the nuget page for more installation options: https://www.nuget.org/packages/Blazorized.NLDesignSystem/

## Index

Depending on running WASM or Server, change your index.html or _Host.cshtml. As a starting point:

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Blazor.NLDesignSystem.Wasm</title>
    <base href="/" />
    <link href="_content/Blazor.NLDesignSystem/dist/core/uno.css" rel="stylesheet" />
    <link href="css/site.css" rel="stylesheet" />
    <link href="manifest.json" rel="manifest" />
    <link rel="apple-touch-icon" sizes="512x512" href="icon-512.png" />
    <script src="_content/Blazor.NLDesignSystem/interop/Promise.min.js"></script>
    <script src="_content/Blazor.NLDesignSystem/interop/system.js"></script>
    <script>
        System.config({
            packages: {
                '/': {
                    defaultExtension: 'js'
                }
            }
        });
    </script>
</head>

<body>
    <app>Loading...</app>

    <div id="blazor-error-ui">
        An unhandled error has occurred.
        <a href="" class="reload">Reload</a>
        <a class="dismiss">🗙</a>
    </div>
    <script src="_framework/blazor.webassembly.js"></script>
    <script>navigator.serviceWorker.register('service-worker.js');</script>
    <script src="_content/Blazor.NLDesignSystem/interop/collapse.js"></script>
</body>
</html>

```

Contents from the Blazor Component Library are served from : _content/Blazor.NLDesignSystem/

# Serve the WASM sample.

Clone the repo and open it up in VS CODE. CWD to ./src/Blazor.NLDesignSystem.Wasm/

Execute the following command:

```
dotnet run
```

Point your favourite browser to https://localhost:5001/
