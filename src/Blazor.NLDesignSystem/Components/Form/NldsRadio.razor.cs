using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsRadio
    {
        [Parameter]
        public string ErrorText { get; set; }
        [Parameter]
        public string Identifier { get; set; }
        [Parameter]
        public bool IsFilter { get; set; }
        [Parameter]
        public ItemAlignment ItemAlignment { get; set; }
        [Parameter]
        public IEnumerable<RadioItem> Items { get; set; } = new List<RadioItem>();

        [Parameter]
        public RenderFragment Legend { get; set; }
        [Parameter]
        public RenderFragment Hint { get; set; }

        //2-way binding
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
        private string _value;
        [Parameter]
        public EventCallback<string> ValueChanged { get; set; }

        private string InputControlType => InputType.Radio.GetDescription<InputControlAttribute>();
        private bool IsValid => string.IsNullOrWhiteSpace(ErrorText);
        private string ItemAlignmentStyle => ItemAlignment.GetDescription<StyleAttribute>();
    }

    public class RadioItem
    {
        public string Value { get; set; }
        public string Description { get; set; }
        public bool IsDisabled { get; set; }
    }
}
