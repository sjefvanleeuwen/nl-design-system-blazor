using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components.Form
{
    public partial class NldsError
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}
