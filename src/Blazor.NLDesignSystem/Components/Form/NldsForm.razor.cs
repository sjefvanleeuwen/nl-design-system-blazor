using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components.Form
{
    public partial class NldsForm
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}
