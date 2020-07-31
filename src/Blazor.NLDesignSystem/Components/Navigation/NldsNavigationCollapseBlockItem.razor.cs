using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsNavigationCollapseBlockItem
    {
        [Inject]
        private IJSRuntime JSRuntime { get; set; }

        [CascadingParameter(Name = "GroupName")]
        public string GroupName { get; set; }

        [Parameter]
        public string Target { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private ElementReference NavigationCollapseBlockItemReference { get; set; }

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await JSRuntime.InvokeVoidAsync("collapse", NavigationCollapseBlockItemReference); // no identifier needed, this menu should not become visible on some other action
            }
            await base.OnAfterRenderAsync(firstRender);
        }
    }
}
