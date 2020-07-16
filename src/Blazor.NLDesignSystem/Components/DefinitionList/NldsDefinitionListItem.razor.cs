using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsDefinitionListItem
    {
        [Parameter]
        public bool ShowHorizontal { get; set; }
        [Parameter]
        public string Title { get; set; }

        [Parameter]
        public RenderFragment Action { get; set; }
        [Parameter]
        public RenderFragment Description { get; set; }

        private bool ShowAction => Action != null;
        private bool ShowDescription => Description != null;
        private bool ShowTitle => !string.IsNullOrWhiteSpace(Title);
    }
}
