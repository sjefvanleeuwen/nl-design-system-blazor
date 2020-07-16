using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsError
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}
