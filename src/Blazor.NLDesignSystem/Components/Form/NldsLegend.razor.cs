using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsLegend
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}