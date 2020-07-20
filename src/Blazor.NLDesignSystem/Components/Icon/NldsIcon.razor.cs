using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsIcon
    {
        [Parameter]
        public Icon Icon { get; set; }

        private string DisplayIcon => Icon.GetDescription<StyleAttribute>();
    }
}
