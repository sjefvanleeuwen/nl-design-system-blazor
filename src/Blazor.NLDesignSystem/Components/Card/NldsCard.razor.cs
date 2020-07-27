using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsCard
    {
        [CascadingParameter(Name = "Small")]
        public bool Small { get; set; }
        [Parameter]
        public string ImageUri { get; set; }
        [Parameter]
        public bool Square { get; set; }
        [Parameter]
        public string Uri { get; set; } = "#";
        [Parameter]
        public RenderFragment Title { get; set; }
        [Parameter]
        public RenderFragment Content { get; set; }
    }
}
