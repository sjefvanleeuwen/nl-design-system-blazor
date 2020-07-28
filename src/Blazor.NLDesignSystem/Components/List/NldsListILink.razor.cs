using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsListILink
    {
        [CascadingParameter(Name = "ParentListType")]
        public ListType? ParentListType { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        [Parameter]
        public string Uri { get; set; }

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();

            if (ParentListType != null) //there is a parent list item 
            {
                attributes["class"] = "list__link";
            }

            return attributes;
        }
    }
}
