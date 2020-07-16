using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsDefinitionListAction
    {
        [Parameter]
        public string LinkScreenReaderDescription { get; set; }
        [Parameter]
        public string Uri { get; set; } = "#";

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private bool ShowAsLink => Uri != "#";
        private bool ShowLinkScreenReaderDescription { get; set; }
    }
}
