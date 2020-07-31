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
        public string Identifier { get; set; }
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
                await JSRuntime.InvokeVoidAsync("tabs", TabsReference, Identifier);
            }
            await base.OnAfterRenderAsync(firstRender);
        }

        public void Destroy()
        {
            JSRuntime.InvokeVoidAsync("destroyTabs", Identifier);
        }

        public void DisableTab(int tabIndex)
        {
            JSRuntime.InvokeVoidAsync("disableTab", Identifier, tabIndex);
        }

        public void EnableTab(int tabIndex)
        {
            JSRuntime.InvokeVoidAsync("enableTab", Identifier, tabIndex);
        }

        public async Task<int> GetActiveTabIndexAsync()
        {
            return await JSRuntime.InvokeAsync<int>("getActiveTabIndex", Identifier);
        }

        public void OpenTab(int tabIndex)
        {
            JSRuntime.InvokeVoidAsync("openTab", Identifier, tabIndex);
        }
    }
}