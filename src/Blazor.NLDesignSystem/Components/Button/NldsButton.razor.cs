﻿using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsButton
    {
        [Parameter]
        public string Title { get; set; }
        [Parameter]
        public ButtonType Type { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private string DisplayType => Type.GetDescription<StyleAttribute>();

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();

            if (!string.IsNullOrWhiteSpace(Title))
            {
                attributes["title"] = Title;
            }

            return attributes;
        }
    }
}
