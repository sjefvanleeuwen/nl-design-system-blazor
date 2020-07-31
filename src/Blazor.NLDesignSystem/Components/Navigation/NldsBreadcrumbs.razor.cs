using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsBreadcrumbs
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}
