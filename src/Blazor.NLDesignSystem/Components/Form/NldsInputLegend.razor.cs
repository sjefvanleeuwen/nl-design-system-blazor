using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components.Form
{
    public partial class NldsInputLegend
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}