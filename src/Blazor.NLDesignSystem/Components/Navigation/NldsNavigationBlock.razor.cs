using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsNavigationBlock
    {
        [Inject]
        private IJSRuntime JSRuntime { get; set; }

        [CascadingParameter(Name = "AutoResize")]
        public bool AutoResize { get; set; }

        [Parameter]
        public bool HasSubmenu { get; set; }
        [Parameter]
        public Position Position { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private ElementReference SubmenuReference { get; set; }

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await JSRuntime.InvokeVoidAsync("navigationSubmenu", SubmenuReference);
            }
            await base.OnAfterRenderAsync(firstRender);
        }

        private string DisplayPosition => Position.GetDescription<StyleAttribute>();
    }
}
