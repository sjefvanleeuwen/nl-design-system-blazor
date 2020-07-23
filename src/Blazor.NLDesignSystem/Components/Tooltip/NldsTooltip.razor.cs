using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsTooltip
    {
        [Inject]
        private IJSRuntime JSRuntime { get; set; }

        [Parameter]
        public bool UseIcon { get; set; }
        [Parameter]
        public string Tip { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        public ElementReference TooltipReference { get; set; }

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await JSRuntime.InvokeVoidAsync("tooltip", TooltipReference);
            }
            await base.OnAfterRenderAsync(firstRender);
        }

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();

            if (UseIcon)
            {
                attributes["class"] = "tooltip__icon";
            }

            return attributes;
        }
    }
}
