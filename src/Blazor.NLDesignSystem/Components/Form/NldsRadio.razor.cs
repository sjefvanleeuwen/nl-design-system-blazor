using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components.Form
{
    public partial class NldsRadio
    {
        [Parameter]
        public string Group { get; set; }
        [Parameter]
        public string Legend { get; set; }
        [Parameter]
        public List<RadioItem> Items { get; set; }

        [Parameter]
        public RadioItem CurrentItem { get; set; }

        [Parameter]
        public EventCallback<NldsRadio> OnChange { get; set; }

        private async void onChange(RadioItem item)
        {
            CurrentItem = item;
            if (OnChange.HasDelegate)
            {
                await OnChange.InvokeAsync(this);
            }

        }
    }

    public class RadioItem
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
