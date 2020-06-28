using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components.Header
{
    public partial class NldsHeader
    {
        [Parameter]
        public RenderFragment Content { get; set; }
        [Parameter]
        public string LinkTitle { get; set; }
        [Parameter]
        public string Link { get; set; } = "/";
        [Parameter]
        public string LinkScreenReaderDescription { get; set; }
    }
}
