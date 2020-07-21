using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsCardList
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
        [Parameter]
        public bool Small { get; set; }
    }
}
