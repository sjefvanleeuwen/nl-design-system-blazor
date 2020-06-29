using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components.Navigation
{
    public partial class NldsTopNav
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
        [Parameter]
        public Color Color { get; set; }

        private string color => Color.GetDescription<StyleAttribute>();

        protected override Task OnInitializedAsync()
        {
            StateHasChanged();
            return base.OnInitializedAsync();
        }

        protected override Task OnAfterRenderAsync(bool firstRender)
        {

            return base.OnAfterRenderAsync(firstRender);
        }
    }
}
