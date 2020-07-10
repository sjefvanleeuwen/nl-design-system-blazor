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

        //2-way binding
        private string _value;

        [Parameter]
        public string Value
        {
            get => _value;
            set
            {
                if (_value == value) return;
                _value = value;
                ValueChanged.InvokeAsync(value);
            }
        }

        [Parameter]
        public EventCallback<string> ValueChanged { get; set; }
    }

    public class RadioItem
    {
        public string Value { get; set; }
        public MarkupString Description { get; set; }
    }
}
