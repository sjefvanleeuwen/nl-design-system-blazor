using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsQuote
    {
        [Parameter]
        public string ImageDescription { get; set; }
        [Parameter]
        public string ImageUri { get; set; }

        [Parameter]
        public RenderFragment Quote { get; set; }
        [Parameter]
        public RenderFragment MetaContent { get; set; }

        private bool ShowMetaContent => MetaContent != null;
        private bool UseImage => !string.IsNullOrWhiteSpace(ImageUri);
    }
}
