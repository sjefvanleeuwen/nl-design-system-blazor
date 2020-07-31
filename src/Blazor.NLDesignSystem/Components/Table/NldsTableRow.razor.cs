using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsTableRow
    {
        [Parameter]
        public Color? BackgroundColor { get; set; }
        [Parameter]
        public string Identifyer { get; set; }
        [Parameter]
        public bool IsCollapsableContent { get; set; }
        [Parameter]
        public bool IsSelected { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private string DisplayBackgroundColor => BackgroundColor?.GetDescription<StyleAttribute>() ?? Color.Wit.GetDescription<StyleAttribute>();
        private bool HasBackGroundColor => BackgroundColor != null;

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();

            if (!string.IsNullOrWhiteSpace(Identifyer))
            {
                attributes["id"] = Identifyer;
            }

            return attributes;
        }
    }
}
