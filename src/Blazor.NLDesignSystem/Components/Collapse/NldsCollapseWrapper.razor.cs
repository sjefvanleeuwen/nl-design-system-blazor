using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsCollapseWrapper
    {
        [Parameter]
        public string GroupName { get; set; }
        [Parameter]
        public bool HasBackground { get; set; } = true;
        [Parameter]
        public bool IsSimple { get; set; }
        [Parameter]
        public bool UseIcons { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}