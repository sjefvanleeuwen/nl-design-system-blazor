using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsFooterColumn
    {
        [Parameter]
        public bool HasOffset { get; set; }

        [Parameter]
        public RenderFragment List { get; set; }
        [Parameter]
        public RenderFragment Title { get; set; }
    }
}
