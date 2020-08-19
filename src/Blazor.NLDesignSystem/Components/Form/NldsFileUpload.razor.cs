using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsFileUpload
    {
        /// <summary>
        /// Optional; overrides the default value; if the input contains a hint the value "hint_" + Id will be used by default
        /// </summary>
        [Parameter]
        public string AriaDescribedBy { get; set; }
        [Parameter]
        public string ButtonText { get; set; } = "Bestand uploaden";
        [Parameter]
        public string ErrorText { get; set; }
        [Parameter]
        public string Identifier { get; set; }
        [Parameter]
        public bool IsDisabled { get; set; }
        [Parameter]
        public bool IsRequired { get; set; }
        [Parameter]
        public LabelAlignment LabelAlignment { get; set; }

        [Parameter]
        public RenderFragment Hint { get; set; }

        [Parameter]
        public EventCallback OnUpload { get; set; }

        private bool IsValid => string.IsNullOrWhiteSpace(ErrorText);
        private string LabelAlignmentStyle => LabelAlignment.GetDescription<StyleAttribute>();

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();

            var tagAriaDescribedby = AriaDescribedBy ?? (Hint != null && !string.IsNullOrWhiteSpace(Identifier) ? $"hint_{Identifier}" : null) ?? string.Empty;
            if (tagAriaDescribedby != string.Empty)
            {
                attributes["aria-describedby"] = tagAriaDescribedby;
            }

            return attributes;
        }

        private async Task DoOnUpload()
        {
            if (OnUpload.HasDelegate)
            {
                await OnUpload.InvokeAsync(this);
            }
        }
    }
}
