using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsNavigation
    {
        [Inject]
        private IJSRuntime JSRuntime { get; set; }

        [Parameter]
        public bool AutoResize { get; set; }
        [Parameter]
        public Color? Color { get; set; }
        [Parameter]
        public bool IsSideNavigation { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private ElementReference NavigationResizeReference { get; set; }

        private string DisplayColor => Color.GetDescription<StyleAttribute>();
        private bool UseColor => Color != null;

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                if (AutoResize)
                {
                    await JSRuntime.InvokeVoidAsync("navitationAutoResize", NavigationResizeReference);
                }
            }
            await base.OnAfterRenderAsync(firstRender);
        }
    }
}