using Microsoft.AspNetCore.Components;
namespace Blazor.NLDesignSystem.Components
{
    partial class NldsTimelineItemHeaderWrapper
    {
        [CascadingParameter(Name = "HeadingNumber")]
        public int HeadingNumber { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}
