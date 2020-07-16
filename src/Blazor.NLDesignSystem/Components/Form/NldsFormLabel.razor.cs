using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsFormLabel
    {
        [CascadingParameter(Name = "ElementIdentifier")]
        protected string ElementIdentifier { get; set; }

        /// <summary>
        /// Optional; if it is encapsulated in an input the cascading value (InputName) is taken over this value
        /// </summary>
        [Parameter]
        public string For { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();

            var tagFor = (!string.IsNullOrWhiteSpace(ElementIdentifier) ? $"{ElementIdentifier}" : null) ?? For ?? string.Empty;
            if (tagFor != string.Empty)
            {
                attributes["for"] = tagFor;
            }

            return attributes;
        }
    }
}