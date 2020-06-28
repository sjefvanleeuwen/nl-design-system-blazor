using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components.Form
{
    public partial class NldsInputHint
    {
        [Parameter]
        public string HintName { get; set; }
        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}
