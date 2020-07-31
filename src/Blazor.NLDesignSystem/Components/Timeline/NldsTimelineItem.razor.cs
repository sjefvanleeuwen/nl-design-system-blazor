using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsTimelineItem
    {
        [CascadingParameter(Name = "IsLarge")]
        public bool IsLarge { get; set; }

        [Parameter]
        public DateTime Date { get; set; }
        [Parameter]
        public bool HeaderIsTime { get; set; }
        [Parameter]
        public bool IsActive { get; set; }
        [Parameter]
        public bool IsDisabled { get; set; }

        [Parameter]
        public RenderFragment Content { get; set; }
        [Parameter]
        public RenderFragment Header { get; set; }

        private IDictionary<string, object> GetTimeAttributes()
        {
            var attributes = new Dictionary<string, object>();

            if (Date != null)
            {
                attributes["datetime"] = string.Format("{0:s}", Date);
            }

            return attributes;
        }
    }
}