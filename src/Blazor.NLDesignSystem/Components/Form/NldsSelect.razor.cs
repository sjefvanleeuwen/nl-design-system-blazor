using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsSelect
    {
        /// <summary>
        /// Optional; overrides the default value; if the input contains a hint the value "hint_" + Id will be used by default
        ///</summary>
        [Parameter]
        public string AriaDescribedBy { get; set; }
        [Parameter]
        public string EmptyValueDescription { get; set; }
        [Parameter]
        public string ErrorText { get; set; }
        [Parameter]
        public string Identifier { get; set; }
        [Parameter]
        public bool IsDisabled { get; set; }
        [Parameter]
        public bool IsRequired { get; set; }
        [Parameter]
        public IEnumerable<SelectItem> Items { get; set; } = new List<SelectItem>();
        [Parameter]
        public LabelAlignment LabelAlignment { get; set; }
        [Parameter]
        public InputSize Size { get; set; }
        [Parameter]
        public bool ShowEmptyValue { get; set; }

        [Parameter]
        public RenderFragment Label { get; set; }
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

        private string InputControlType => InputType.Select.GetDescription<InputControlAttribute>();
        private bool IsValid => string.IsNullOrWhiteSpace(ErrorText);
        private string LabelAlignmentStyle => LabelAlignment.GetDescription<StyleAttribute>();
        private string SizeAppendix => Size.GetDescription<StyleAttribute>();


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

    public class SelectItem
    {
        public string Value { get; set; }
        public string Description { get; set; }
        public bool IsDisabled { get; set; }
    }
}
