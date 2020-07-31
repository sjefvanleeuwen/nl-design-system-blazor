using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsTableCell
    {
        [Inject]
        private IJSRuntime JSRuntime { get; set; }

        [CascadingParameter(Name = "IsHeader")]
        public bool ParentIsHeader { get; set; }

        [Parameter]
        public string Class { get; set; }
        [Parameter]
        public string CollapsedText { get; set; } = "ingeklapt";
        [Parameter]
        public string CollapseTarget { get; set; }
        [Parameter]
        public int Colspan { get; set; } = 1;
        [Parameter]
        public string Headers { get; set; }
        [Parameter]
        public string Identifier { get; set; }
        [Parameter]
        public bool IsHeader { get; set; }
        [Parameter]
        public string UnfoldedText { get; set; } = "uitgeklapt";

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private ElementReference CollapsableReference { get; set; }

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                if (IsCollapsable)
                {
                    await JSRuntime.InvokeVoidAsync("collapse", CollapsableReference);
                }
            }
            await base.OnAfterRenderAsync(firstRender);
        }

        private bool DisplayAsHeader => (ParentIsHeader || IsHeader) && ChildContent != null;
        private bool IsCollapsable => !string.IsNullOrWhiteSpace(CollapseTarget);

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
            if (!string.IsNullOrWhiteSpace(Identifier))
            {
                attributes["id"] = Identifier;
            }
            if (!string.IsNullOrWhiteSpace(Headers))
            {
                attributes["headers"] = Headers;
            }
            if (!string.IsNullOrWhiteSpace(Class))
            {
                attributes["class"] = Class;
            }
            if (IsCollapsable)
            {
                attributes["class"] = attributes.ContainsKey("class") ? $"{attributes["class"]} collapse__header" : "collapse__header";
                attributes["x-uno-collapse-target"] = CollapseTarget;
            }

            return attributes;
        }
    }
}
