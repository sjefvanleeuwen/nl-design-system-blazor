using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsSection
    {
        [Parameter]
        public Color? BackgroundColor { get; set; }
        [Parameter]
        public bool IsInnerSection { get; set; }
        [Parameter]
        public string Title { get; set; }
        [Parameter]
        public string Uri { get; set; }
        [Parameter]
        public string UriText { get; set; } = "Wijzig";

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private bool HasBackgroundColor => BackgroundColor != null;
        private bool HasLink => !string.IsNullOrWhiteSpace(Uri);
        private bool ShowTitle => !string.IsNullOrWhiteSpace(Title);
        private string DisplayBackgroundColor => BackgroundColor.Value.GetDescription<StyleAttribute>();
    }
}
