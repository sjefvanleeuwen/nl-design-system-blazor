using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components.Navigation
{
    public partial class NldsTopNav
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
        [Parameter]
        public Color Color { get; set; }

        private string color => Color.GetDescription<StyleAttribute>();
    }
}
