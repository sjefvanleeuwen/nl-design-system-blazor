using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsTableCell
    {
        [CascadingParameter(Name = "IsHeader")]
        public bool ParentIsHeader { get; set; }

        [Parameter]
        public string Class { get; set; }
        [Parameter]
        public int Colspan { get; set; } = 1;
        [Parameter]
        public string Headers { get; set; }
        [Parameter]
        public string Identifyer { get; set; }
        [Parameter]
        public bool IsHeader { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private bool DisplayAsHeader => (ParentIsHeader || IsHeader) && ChildContent != null;

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();
            if (DisplayAsHeader)
            {
                if (ParentIsHeader)
                {
                    if (Colspan > 1)
                    {
                        attributes["scope"] = "colgroup";
                    }
                    else
                    {
                        attributes["scope"] = "col";
                    }
                }
                else if (IsHeader)
                {
                    attributes["scope"] = "row";
                }
            }
            if (Colspan > 1)
            {
                attributes["colspan"] = Colspan;
            }
            if (!string.IsNullOrWhiteSpace(Identifyer))
            {
                attributes["id"] = Identifyer;
            }
            if (!string.IsNullOrWhiteSpace(Headers))
            {
                attributes["headers"] = Headers;
            }
            if (!string.IsNullOrWhiteSpace(Class))
            {
                attributes["class"] = Class;
            }

            return attributes;
        }
    }
}
