using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components.Navigation
{
    public partial class NldsNavigation
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
        
        [Parameter]
        public Color Color { get; set; }

        private string DisplayColor => Color.GetDescription<StyleAttribute>();
    }
}
