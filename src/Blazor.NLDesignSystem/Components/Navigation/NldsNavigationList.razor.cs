using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsNavigationList
    {
        [Parameter]
        public bool HasSubMenu { get; set; }
        [Parameter]
        public bool HasSubNavigationPopout { get; set; }
        [Parameter]
        public bool IsSubMenu { get; set; }


        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();
            
            if (HasSubNavigationPopout)
            {
                attributes["class"] = "navigation";
            }
            else if (HasSubMenu)
            {
                attributes["class"] = "nav nav--submenu";
            }
            else if (IsSubMenu)
            {
                attributes["class"] = "nav__submenu";
            }
            else
            {
                attributes["class"] = "nav";
            }

            return attributes;
        }
    }
}
