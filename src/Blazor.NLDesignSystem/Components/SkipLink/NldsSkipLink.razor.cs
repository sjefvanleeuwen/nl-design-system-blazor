using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components.SkipLink
{
    public partial class NldsSkipLink
    {
        [Parameter]
        public string ContentId { get; set; } = "content";

        [Parameter] 
        public RenderFragment ChildContent { get; set; }
    }
}
