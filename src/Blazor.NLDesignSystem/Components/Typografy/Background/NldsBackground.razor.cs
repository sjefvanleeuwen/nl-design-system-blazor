using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsBackground
    {
        [Parameter]
        public Color Color { get; set; } = Color.HemelBlauw;

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private string DisplayColor => Color.GetDescription<StyleAttribute>();
    }
}
