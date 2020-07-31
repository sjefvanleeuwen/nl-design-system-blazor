using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
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
        public string Identifyer { get; set; }
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
                await JSRuntime.InvokeVoidAsync("collapse", CollapsableReference, Identifyer);
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

        public async void Close()
        {
            await JSRuntime.InvokeVoidAsync("closeCollapse", Identifyer);
        }

        public async void Destroy()
        {
            await JSRuntime.InvokeVoidAsync("destroyCollapse", Identifyer);
        }

        public async void Open()
        {
            await JSRuntime.InvokeVoidAsync("openCollapse", Identifyer);
        }

        public async void Toggle()
        {
            await JSRuntime.InvokeVoidAsync("toggleCollapse", Identifyer);
        }

    }
}