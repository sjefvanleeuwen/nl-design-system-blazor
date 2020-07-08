using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components.Header
{
    public partial class NldsHeader
    {
        [Parameter]
        public RenderFragment Content { get; set; }
        [Parameter]
        public string LinkTitle { get; set; }
        [Parameter]
        public string Link { get; set; } = "/";
        [Parameter]
        public string LinkScreenReaderDescription { get; set; }
        public bool IsTransparent { get; set; }
        /// <summary>
        /// optional extra class name for the header-logo, like header-logo--white, header-logo--cte
        /// </summary>
        [Parameter]
        public string LogoClass { get; set; }

        private string TransparentClass => IsTransparent ? "header--transparent" : string.Empty;
    }
}
