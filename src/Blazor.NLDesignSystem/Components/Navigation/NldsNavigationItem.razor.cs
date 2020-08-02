using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsNavigationItem
    {
        [CascadingParameter(Name = "IsInBreadCrumbs")]
        public bool IsInBreadCrumbs { get; set; }
        [CascadingParameter(Name = "IsInCollapse")]
        public bool IsInCollapse { get; set; }
        [CascadingParameter(Name = "IsInSideNavigation")]
        public bool IsInSideNavigation { get; set; }
        [CascadingParameter(Name = "IsInSubNavigation")]
        public bool IsInSubNavigation { get; set; }
        [CascadingParameter(Name = "IsInSubNavigationPopout")]
        public bool IsInSubNavigationPopout { get; set; }

        [Parameter]
        public bool IsActive { get; set; }
        [Parameter]
        public bool IsExternal { get; set; }
        [Parameter]
        public string Title { get; set; }
        [Parameter]
        public string Uri { get; set; }

        [Parameter]
        public RenderFragment Content { get; set; }
        [Parameter]
        public RenderFragment SubMenu { get; set; }

        public bool HasSubMenu => SubMenu != null;

        private IDictionary<string, object> GetAAttributes()
        {
            var attributes = new Dictionary<string, object>();

            if (!string.IsNullOrWhiteSpace(Title))
            {
                attributes["title"] = Title;
            }
            if (!IsInBreadCrumbs && !IsInCollapse)
            {
                if (IsInSubNavigation)
                {
                    if (IsInSubNavigationPopout)
                    {
                        attributes["class"] = "navigation__popout-link";
                    }
                    else
                    {
                        attributes["class"] = "navigation__link";
                    }
                }
                else if (!IsInSideNavigation)
                {
                    attributes["class"] = "nav__link";
                    if (IsActive)
                    {
                        attributes["class"] = $"{attributes["class"]} nav__link--active";
                    }
                }
            }
            if (IsExternal)
            {
                attributes["rel"] = "external";
            }
            if (HasSubMenu)
            {
                if (!attributes.ContainsKey("class"))
                {
                    attributes["class"] = string.Empty;
                }
                attributes["class"] = $"{attributes["class"]} nav__link--parent";
            }

            return attributes;
        }

        private IDictionary<string, object> GetLiAttributes()
        {
            var attributes = new Dictionary<string, object>();

            if (!IsInBreadCrumbs && !IsInCollapse)
            {
                if (IsInSubNavigation)
                {
                    if (IsInSubNavigationPopout)
                    {
                        attributes["class"] = "navigation__popout-item";
                    }
                    else
                    {
                        attributes["class"] = "navigation__item";
                    }
                }
                else if (IsInSideNavigation)
                {
                    attributes["class"] = "sidenav__item";
                    if (IsActive)
                    {
                        attributes["class"] = $"{attributes["class"]} sidenav__item--active";
                    }
                }
                else
                {
                    attributes["class"] = "nav__item";
                }
            }
            if (HasSubMenu)
            {
                if (!attributes.ContainsKey("class"))
                {
                    attributes["class"] = string.Empty;
                }
                attributes["class"] = $"{attributes["class"]} nav__item--parent";
            }

            return attributes;
        }
    }
}
