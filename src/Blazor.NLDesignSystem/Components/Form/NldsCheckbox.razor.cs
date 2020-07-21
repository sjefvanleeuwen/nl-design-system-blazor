using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;
using System.Linq;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsCheckbox
    {
        [Parameter]
        public string ErrorText { get; set; }
        [Parameter]
        public string Identifier { get; set; }
        [Parameter]
        public ItemAlignment ItemAlignment { get; set; }
        [Parameter]
        public IEnumerable<CheckboxItem> Items { get; set; }

        [Parameter]
        public RenderFragment Legend { get; set; }
        [Parameter]
        public RenderFragment Hint { get; set; }

        //2-way binding
        private IEnumerable<string> _values;

        [Parameter]
        public IEnumerable<string> Values
        {
            get => _values ?? new List<string>();
            set
            {
                if (_values == value) return;
                _values = value;
                ValuesChanged.InvokeAsync(value);
            }
        }

        [Parameter]
        public EventCallback<IEnumerable<string>> ValuesChanged { get; set; }

        private string InputControlType => InputType.Checkbox.GetDescription<InputControlAttribute>();
        private bool IsValid => string.IsNullOrWhiteSpace(ErrorText);
        private string ItemAlignmentStyle => ItemAlignment.GetDescription<StyleAttribute>();

        private void ToggleValue(string value)
        {
            var values = Values.ToList();
            if (values.Contains(value))
            {
                values.Remove(value);
            }
            else
            {
                values.Add(value);
            }

            Values = values;
        }
    }

    public class CheckboxItem
    {
        public string Value { get; set; }
        public string Description { get; set; }
        public bool IsDisabled { get; set; }
    }
}
