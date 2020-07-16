using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsNavigationSubmenu
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
        [Parameter]
        public string DisplayName { get; set; }
        [Parameter]
        public Icon Icon { get; set; }
        [Parameter]
        public string Title { get; set; }

        private string DisplayIcon => Icon.GetDescription<StyleAttribute>();

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();

            if (!string.IsNullOrWhiteSpace(Title))
            {
                attributes["Title"] = Title;
            }

            return attributes;
        }
    }
}