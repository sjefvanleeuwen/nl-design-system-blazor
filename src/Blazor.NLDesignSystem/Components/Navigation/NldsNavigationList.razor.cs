using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsNavigationList
    {
        [Inject]
        private IJSRuntime JSRuntime { get; set; }

        [CascadingParameter(Name = "IsInSideNavigation")]
        public bool IsInSideNavigation { get; set; }

        [Parameter]
        public bool HasSubMenu { get; set; }
        [Parameter]
        public bool HasSubNavigationPopout { get; set; }
        [Parameter]
        public bool IsSubMenu { get; set; }


        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private ElementReference NavigationListReference { get; set; }

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                if (HasSubMenu)
                {
                    await JSRuntime.InvokeVoidAsync("navigationSubmenu", NavigationListReference);
                }
            }
            await base.OnAfterRenderAsync(firstRender);
        }

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();

            if (IsInSideNavigation) //nothing to be set here, move along
            {
                return attributes;
            }

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
