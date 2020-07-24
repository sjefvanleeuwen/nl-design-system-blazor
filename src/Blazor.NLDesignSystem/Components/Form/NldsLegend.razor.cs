using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsLegend
    {
        [CascadingParameter(Name = "IsFilter")]
        public bool IsFilter { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}