using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsChart
    {
        [Inject]
        private IJSRuntime JSRuntime { get; set; }

        private ElementReference ChartReference { get; set; }

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await JSRuntime.InvokeVoidAsync("donutChart", ChartReference, Percentage);
            }
            await base.OnAfterRenderAsync(firstRender);
        }

        [Parameter]
        public Color Color { get; set; } = Color.HemelBlauw;
        [Parameter]
        public double Percentage { get; set; }
        [Parameter]
        public string TextBelow { get; set; }
        [Parameter]
        public string Title { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private string DisplayColor => Color.GetDescription<StyleAttribute>();
    }
}