using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components.Button
{
    public partial class NldsButton
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
        [Parameter]
        public ButtonType Type { get; set; }

        private string classType => Type.GetDescription<StyleAttribute>();
    }
}
