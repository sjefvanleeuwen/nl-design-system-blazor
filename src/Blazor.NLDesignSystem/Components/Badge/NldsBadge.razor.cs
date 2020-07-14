using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components.Badge
{
    public partial class NldsBadge
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
        [Parameter]
        public Color Color { get; set; }

        private string DisplayColor => Color.GetDescription<StyleAttribute>();

    }
}
