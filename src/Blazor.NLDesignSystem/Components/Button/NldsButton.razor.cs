using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
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
        public EventCallback<MouseEventArgs> OnClick { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private string DisplayType => Type.GetDescription<StyleAttribute>();

        private async void DoOnClick(MouseEventArgs e)
        {
            if (OnClick.HasDelegate && Type != ButtonType.Disabled)
            {
                await OnClick.InvokeAsync(e);
            }
        }

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
