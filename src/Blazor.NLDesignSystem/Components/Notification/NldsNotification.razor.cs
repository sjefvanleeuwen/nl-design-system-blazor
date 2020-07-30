using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsNotification
    {
        [Parameter]
        public string CloseButtonText { get; set; }
        [Parameter]
        public string Title { get; set; }
        [Parameter]
        public Notification Type { get; set; }
        [Parameter]
        public string TypeText { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private bool IsClosed = false;

        private string NotificationExtension => Type.GetDescription<StyleAttribute>();
        private bool ShowCloseButton => !string.IsNullOrWhiteSpace(CloseButtonText);
        private bool ShowContent => ChildContent != null;

        //Method is public. If a reference is provided to this component it can be called form an other place
        public void Close()
        {
            if (!IsClosed)
            {
                Toggle();
            }
        }

        private void Toggle()
        {
            IsClosed = !IsClosed;
            StateHasChanged();
        }
    }
}
