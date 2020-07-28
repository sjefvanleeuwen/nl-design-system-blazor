using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsBottomBar
    {
        [Parameter]
        public string ScreenReaderText { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}
