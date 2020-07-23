using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsMeta
    {
        [Parameter]
        public bool IsInHeader { get; set; }
        [Parameter]
        public bool IsProgress { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}
