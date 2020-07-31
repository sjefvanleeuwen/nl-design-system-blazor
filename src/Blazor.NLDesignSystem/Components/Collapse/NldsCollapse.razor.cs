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
        public string Identifier { get; set; }
        [Parameter]
        public string Target { get; set; }
        [Parameter]
        public string UnfoldedText { get; set; } = "uitgeklapt";

        [Parameter]
        public RenderFragment Content { get; set; }
        [Parameter]
        public RenderFragment Title { get; set; }

        [Parameter]
        public EventCallback OnCollapseClose { get; set; }
        [Parameter]
        public EventCallback OnCollapseOpen { get; set; }

        private ElementReference CollapseReference { get; set; }

        private bool ShowContent => Content != null;

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await JSRuntime.InvokeVoidAsync("collapse", CollapseReference, Identifier);
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
            await JSRuntime.InvokeVoidAsync("closeCollapse", Identifier);
        }

        public async void Destroy()
        {
            await JSRuntime.InvokeVoidAsync("destroyCollapse", Identifier);
        }

        public async void Open()
        {
            await JSRuntime.InvokeVoidAsync("openCollapse", Identifier);
        }

        public async void Toggle()
        {
            await JSRuntime.InvokeVoidAsync("toggleCollapse", Identifier);
        }

        protected override async Task SetEventListeners()
        {
            await SetEventListener("collapse-close", CollapseReference);
            await SetEventListener("collapse-open", CollapseReference);
        }

        [JSInvokable]
        public override async Task EventCallback(string eventName, string eventJson)
        {
            switch (eventName)
            {
                case "collapse-close":
                    if (OnCollapseClose.HasDelegate)
                        await OnCollapseClose.InvokeAsync(this);
                    break;
                case "collapse-open":
                    if (OnCollapseOpen.HasDelegate)
                        await OnCollapseOpen.InvokeAsync(this);
                    break;
            }
        }
    }
}