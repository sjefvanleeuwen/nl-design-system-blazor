using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Text.Json;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components
{
    public abstract class NldsEventComponent : ComponentBase
    {
        [Inject]
        private IJSRuntime JSRuntime { get; set; }

        protected JsonSerializerOptions JsonOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        public DotNetObjectReference<NldsEventComponent> JSObjectRef { get; set; }

        protected override void OnInitialized()
        {
            JSObjectRef = DotNetObjectReference.Create(this);
            base.OnInitialized();
        }

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await SetEventListeners();
            }
            await base.OnAfterRenderAsync(firstRender);
        }

        protected abstract Task SetEventListeners();

        protected async Task SetEventListener(string eventName, ElementReference reference)
        {
            if (JSRuntime == null)
                return;
            await JSRuntime.InvokeVoidAsync("setEventListener", eventName, reference, JSObjectRef);
        }

        public abstract Task EventCallback(string eventName, string eventJson);
    }
}
