using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsFooter
    {
        [Parameter]
        public Color Color { get; set; } = Color.HemelBlauw;

        [Parameter]
        public RenderFragment FooterColumns { get; set; }
        [Parameter]
        public RenderFragment Title { get; set; }

        private string DisplayColor => Color.GetDescription<StyleAttribute>();
        private bool ShowListColumns => FooterColumns != null;
    }
}
