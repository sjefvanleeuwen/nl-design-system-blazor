using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsImage
    {
        [Parameter]
        public string Alt { get; set; }
        [Parameter]
        public int Width { get; set; }
        [Parameter]
        public string Uri { get; set; }
    }
}
