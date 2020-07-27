using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsTableRow
    {
        [Parameter]
        public bool IsSelected { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }       
    }
}
