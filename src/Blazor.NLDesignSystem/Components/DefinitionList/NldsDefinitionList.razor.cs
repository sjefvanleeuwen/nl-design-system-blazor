using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsDefinitionList
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}
