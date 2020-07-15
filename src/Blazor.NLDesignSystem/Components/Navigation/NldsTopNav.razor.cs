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

        private string DisplayColor => Color.GetDescription<StyleAttribute>();

        protected override Task OnInitializedAsync()
        {
            StateHasChanged();
            return base.OnInitializedAsync();
        }
    }
}
