using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsTabs
    {
        [Inject]
        private IJSRuntime JSRuntime { get; set; }

        [Parameter]
        public bool Inline { get; set; }

        [Parameter]
        public RenderFragment Tabs { get; set; }
        [Parameter]
        public RenderFragment TabContents { get; set; }

        public ElementReference TabsReference { get; set; }

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await JSRuntime.InvokeVoidAsync("tabs", TabsReference);
            }
            await base.OnAfterRenderAsync(firstRender);
        }
    }
}