using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Routing;
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
            NavigationManager.LocationChanged += LocationChanged;
            LocationChanged(this, new LocationChangedEventArgs(NavigationManager.Uri, false));
            return base.OnInitializedAsync();
        }

        private void LocationChanged(object sender, LocationChangedEventArgs e)
        {
            NavigationUri = new Uri(NavigationManager.Uri).AbsolutePath.TrimStart('/');
            navLinkActive = NavigationUri == HRef ? "nav__link--active" : string.Empty;
            StateHasChanged();
        }
    }
}
