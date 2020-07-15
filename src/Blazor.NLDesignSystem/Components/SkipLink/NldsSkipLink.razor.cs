﻿using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components.Skiplink
{
    public partial class NldsSkiplink
    {
        [Parameter]
        public string ContentId { get; set; } = "content";

        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}
