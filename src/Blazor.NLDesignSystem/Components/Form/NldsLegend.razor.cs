using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components.Form
{
    public partial class NldsLegend
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}