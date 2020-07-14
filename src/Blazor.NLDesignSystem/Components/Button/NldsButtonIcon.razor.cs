using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components.Button
{
    public partial class NldsButtonIcon
    {
        [Parameter]
        public string Icon { get; set; }

        [Parameter]
        public RelativePosition Position { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}
