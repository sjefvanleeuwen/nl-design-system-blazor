using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsTable
    {
        [Inject]
        private IJSRuntime JSRuntime { get; set; }

        [Parameter]
        public string Identifier { get; set; }
        [Parameter]
        public bool IsResponsive { get; set; }
        [Parameter]
        public bool IsHoverable { get; set; }
        [Parameter]
        public bool IsStriped { get; set; }
        [Parameter]
        public bool UseFullWidth { get; set; }
        [Parameter]
        public bool UseSmallFont { get; set; }

        [Parameter]
        public RenderFragment Body { get; set; }
        [Parameter]
        public RenderFragment Caption { get; set; }
        [Parameter]
        public RenderFragment Header { get; set; }
        [Parameter]
        public RenderFragment Label { get; set; }

        public ElementReference TableReference { get; set; }

        private bool ShowCaption => Label != null;
        private bool ShowLabel => Label != null;

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                if (IsResponsive)
                {
                    await JSRuntime.InvokeVoidAsync("table", TableReference);
                }
            }
            await base.OnAfterRenderAsync(firstRender);
        }

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();

            if (ShowLabel && !string.IsNullOrWhiteSpace(Identifier))
            {
                attributes["aria-describedby"] = Identifier;
            }

            return attributes;
        }

        private IDictionary<string, object> GetLabelAttributes()
        {
            var attributes = new Dictionary<string, object>();

            if (ShowLabel && !string.IsNullOrWhiteSpace(Identifier))
            {
                attributes["id"] = Identifier;
            }

            return attributes;
        }
    }
}
