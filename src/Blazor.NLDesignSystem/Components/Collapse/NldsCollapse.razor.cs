using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components.Collapse
{
    public partial class NldsCollapse
    {
        [Inject] private IJSRuntime JS { get; set; }
        private ElementReference HeaderRef { get; set; }
        [Parameter]
        public string Name { get; set; }
        [Parameter]
        public string CollapsedText { get; set; } = "ingeklapt";
        [Parameter]
        public string UnfoldedText { get; set; } = "uitgeklapt";
        [Parameter]
        public RenderFragment Title { get; set; }
        [Parameter]
        public RenderFragment Content { get; set; }

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await JS.InvokeVoidAsync("collapse", HeaderRef);
            }
        }
    }
}