using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsNavigationItem
    {
        [Inject]
        NavigationManager NavigationManager { get; set; }

        [Parameter]
        public string Title { get; set; }
        [Parameter]
        public string Uri { get; set; } = "#";

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private bool IsActiveLink => new Uri(NavigationManager.Uri).AbsolutePath.TrimStart('/') == Uri;

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
