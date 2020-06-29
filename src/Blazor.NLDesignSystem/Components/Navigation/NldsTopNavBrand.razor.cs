using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components.Navigation
{
    public partial class NldsTopNavBrand
    {
        [Parameter]
        public string Title { get; set; }
        [Parameter]
        public string HRef { get; set; }
        [Parameter]
        public NLDesignSystem.Icon Icon { get; set; }
        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private string icon => Icon.GetDescription<StyleAttribute>();
    }
}
