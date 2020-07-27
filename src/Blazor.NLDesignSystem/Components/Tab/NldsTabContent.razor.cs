using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsTabContent
    {
        [Parameter]
        public string Identifier { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}