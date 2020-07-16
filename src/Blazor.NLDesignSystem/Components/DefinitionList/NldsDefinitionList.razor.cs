using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsDefinitionList
    {
        [Parameter]
        public bool HasLargeTitles { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}
