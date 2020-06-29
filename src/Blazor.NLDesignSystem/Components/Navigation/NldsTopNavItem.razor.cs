using Microsoft.AspNetCore.Components;
using System;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components.Navigation
{
    public partial class NldsTopNavItem
    {
        [Inject] 
        NavigationManager NavigationManager { get; set; }
        [Parameter]
        public string HRef { get; set; } = "#";
        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private string navLinkActive { get; set; }
        private string NavigationUri { get; set; }
        protected override Task OnInitializedAsync()
        {
            NavigationUri = new Uri(NavigationManager.Uri).AbsolutePath.TrimStart('/');
            if (NavigationUri == HRef)
            {
                navLinkActive = "nav__link--active";
            }
            return base.OnInitializedAsync();
        }
    }
}
