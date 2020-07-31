using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsNavigationCollapseBlock
    {
        [Parameter]
        public string GroupName { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}
