using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components.Header
{
    public partial class NldsHeader
    {
        [Parameter]
        public string Text { get; set; }
        [Parameter]
        public string Title { get; set; }
        [Parameter]
        public string Link { get; set; } = "/";
        [Parameter]
        public string LinkScreenReaderDescription { get; set; }
    }
}
