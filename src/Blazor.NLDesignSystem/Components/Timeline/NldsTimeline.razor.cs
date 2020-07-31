using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsTimeline
    {
        [Parameter]
        public Color? Color { get; set; }
        [Parameter]
        public int HeadingNumber { get; set; }
        [Parameter]
        public bool IndicateEnd { get; set; } = true;
        [Parameter]
        public bool IndicateStart { get; set; } = true;
        [Parameter]
        public bool IsCompact { get; set; }
        [Parameter]
        public bool IsLarge { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private bool HasColor => Color != null;
        private string DisplayColor => Color.Value.GetDescription<StyleAttribute>();
    }
}
