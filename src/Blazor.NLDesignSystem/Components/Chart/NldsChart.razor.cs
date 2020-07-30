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

        [Parameter]
        public Color Color { get; set; } = Color.HemelBlauw;
        [Parameter]
        public bool DrawOnCreate { get; set; } = true;
        [Parameter]
        public double Percentage { get; set; }
        [Parameter]
        public string TextBelow { get; set; }
        [Parameter]
        public string Title { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private ElementReference ChartReference { get; set; }

        private bool Show { get; set; }

        protected override void OnInitialized()
        {
            Show = DrawOnCreate;
            base.OnInitialized();
        }

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (Show)
            {
                await JSRuntime.InvokeVoidAsync("donutChart", ChartReference, Percentage);
            }
            await base.OnAfterRenderAsync(firstRender);
        }

        public void Destroy()
        {
            Show = false;
        }

        public void Draw()
        {
            Show = true;
        }

        private string DisplayColor => Color.GetDescription<StyleAttribute>();
    }
}