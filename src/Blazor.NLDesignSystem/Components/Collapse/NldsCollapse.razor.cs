using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsCollapse
    {
        [Inject]
        private IJSRuntime JSRuntime { get; set; }

        [CascadingParameter(Name = "GroupName")]
        protected string GroupName { get; set; }

        [Parameter]
        public string CollapsedText { get; set; } = "ingeklapt";
        [Parameter]
        public string Target { get; set; }
        [Parameter]
        public string UnfoldedText { get; set; } = "uitgeklapt";

        [Parameter]
        public RenderFragment Content { get; set; }
        [Parameter]
        public RenderFragment Title { get; set; }

        private ElementReference CollapsableReference { get; set; }

        private bool ShowContent => Content != null;

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await JSRuntime.InvokeVoidAsync("collapse", CollapsableReference);
            }
            await base.OnAfterRenderAsync(firstRender);
        }

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();

            var tagGroup = !string.IsNullOrWhiteSpace(GroupName) ? GroupName : string.Empty;
            if (tagGroup != string.Empty)
            {
                attributes["x-uno-collapse-group"] = tagGroup;
            }
            var tagTarget = !string.IsNullOrWhiteSpace(Target) ? Target : string.Empty;
            if (tagTarget != string.Empty)
            {
                attributes["x-uno-collapse-target"] = tagTarget;
            }

            return attributes;
        }

        private IDictionary<string, object> GetContentAttributes()
        {
            var attributes = new Dictionary<string, object>();

            var tagId = !string.IsNullOrWhiteSpace(Target) ? Target : string.Empty;
            if (tagId != string.Empty)
            {
                attributes["id"] = tagId;
            }

            return attributes;
        }
    }
}