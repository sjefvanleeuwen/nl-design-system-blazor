using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsHeader
    {
        [Parameter]
        public string LinkTitle { get; set; }
        [Parameter]
        public string Link { get; set; } = "/";
        [Parameter]
        public string LinkScreenReaderDescription { get; set; }
        [Parameter]
        public bool IsTransparent { get; set; }
        /// <summary>
        /// optional extra class name for the header-logo, like header-logo--white, header-logo--cte
        /// </summary>
        [Parameter]
        public string LogoClass { get; set; }

        private string TransparentClass => IsTransparent ? "header--transparent" : string.Empty;
    }
}
