using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsCollapseContent
    {
        [Parameter]
        public bool IsIndented { get; set; }
        [Parameter]
        public string Id { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();

            var tagId = !string.IsNullOrWhiteSpace(Id) ? Id : string.Empty;
            if (tagId != string.Empty)
            {
                attributes["id"] = tagId;
            }

            return attributes;
        }
    }
}