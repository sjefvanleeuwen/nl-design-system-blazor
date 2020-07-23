using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsFileList
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}
