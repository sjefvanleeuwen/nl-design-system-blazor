using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsSpinner
    {
        [Parameter]
        public bool FullPage { get; set; }

        [Parameter]
        public RenderFragment DisplayText { get; set; }
        [Parameter]
        public RenderFragment ScreenReaderText { get; set; }

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();

            if (ScreenReaderText != null)
            {
                attributes["aria-live"] = "assertive";
                attributes["class"] = "screenreader-only";
            }

            return attributes;
        }
    }
}
