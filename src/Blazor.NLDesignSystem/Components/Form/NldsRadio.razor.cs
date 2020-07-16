using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsRadio
    {
        /// <summary>
        /// Optional; overrides the default value; if the input contains a hint the value "hint_" + Id will be used by default
        /// </summary>
        [Parameter]
        public string AriaDescribedBy { get; set; }
        [Parameter]
        public string ErrorText { get; set; }
        [Parameter]
        public string Identifier { get; set; }
        [Parameter]
        public ItemAlignment ItemAlignment { get; set; }
        [Parameter]
        public IEnumerable<RadioItem> Items { get; set; }

        [Parameter]
        public RenderFragment Legend { get; set; }
        [Parameter]
        public RenderFragment Hint { get; set; }

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

        private bool IsValid => string.IsNullOrWhiteSpace(ErrorText);
        private string ItemAlignmentStyle => ItemAlignment.GetDescription<StyleAttribute>();

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();

            var tagAriaDescribedby = AriaDescribedBy ?? (Hint != null && !string.IsNullOrWhiteSpace(Identifier) ? $"hint_{Identifier}" : null) ?? string.Empty;
            if (tagAriaDescribedby != string.Empty)
            {
                attributes["aria-describedby"] = tagAriaDescribedby;
            }

            return attributes;
        }
    }

    public class RadioItem
    {
        public string Value { get; set; }
        public string Description { get; set; }
        public bool IsDisabled { get; set; }
    }
}
