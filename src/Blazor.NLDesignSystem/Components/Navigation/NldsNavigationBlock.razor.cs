using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components.Navigation
{
    public partial class NldsNavigationBlock
    {

        [CascadingParameter(Name = "AutoResize")]
        public bool AutoResize { get; set; }

        [Parameter]
        public Position Position { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private string DisplayPosition => Position.GetDescription<StyleAttribute>();
    }
}
