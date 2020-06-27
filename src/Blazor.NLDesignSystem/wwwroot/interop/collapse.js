function collapse(el) {
    System.import('_content/Blazor.NLDesignSystem/dist/components/collapse/collapse.js').then(function (module) {
        new module.Collapse(el);
    });
}