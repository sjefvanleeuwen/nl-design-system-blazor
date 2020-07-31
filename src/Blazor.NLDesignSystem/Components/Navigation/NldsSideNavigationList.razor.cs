using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsSideNavigationList
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}
