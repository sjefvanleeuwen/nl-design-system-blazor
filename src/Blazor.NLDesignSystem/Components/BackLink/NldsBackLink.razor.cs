using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsBackLink
    {
        [Parameter]
        public string Title { get; set; }
        [Parameter]
        public string Uri { get; set; } = "#";

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();

            if (!string.IsNullOrWhiteSpace(Title))
            {
                attributes["title"] = Title;
            }

            return attributes;
        }
    }
}
