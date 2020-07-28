using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsListItem
    {
        [CascadingParameter(Name = "ParentType")]
        public ListType ParentListType { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private string DisplayStyle => ParentListType.GetDescription<StyleAttribute>() ?? string.Empty;
        private bool IsFilter =>
            ParentListType == ListType.Filter ||
            ParentListType == ListType.FilterInline;
        private bool IsSubjects => ParentListType == ListType.Subjects;

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();

            if (IsFilter)
            {
                attributes["tabindex"] = 0;
            }
            if (ParentListType == ListType.Subjects)
            {
                attributes["class"] = "list__item";
            }
            if (ParentListType == ListType.Search)
            {
                attributes["class"] = "list__item list__item--search";
            }

            return attributes;
        }
    }
}
