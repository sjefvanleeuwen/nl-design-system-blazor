using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components.Icon
{
    public partial class NldsIcon
    {
        [Parameter]
        public string Icon { get; set; }
        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}
