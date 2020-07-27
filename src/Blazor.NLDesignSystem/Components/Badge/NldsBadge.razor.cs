using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsBadge
    {
        [Parameter]
        public int Number { get; set; }
        [Parameter]
        public Color Color { get; set; } = Color.HemelBlauw;
        [Parameter]
        public bool UseOnIcon { get; set; }

        private string DisplayColor => Color.GetDescription<StyleAttribute>();
    }
}