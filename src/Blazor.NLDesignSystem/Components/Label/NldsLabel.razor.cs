using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsLabel
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
        [Parameter]
        public Color Color { get; set; }

        private string DisplayColor => Color.GetDescription<StyleAttribute>();
    }
}
