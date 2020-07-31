using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsTab
    {
        [Parameter]
        public string Identifier { get; set; }
        [Parameter]
        public bool IsActive { get; set; }
        [Parameter]
        public bool IsDisabled { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}