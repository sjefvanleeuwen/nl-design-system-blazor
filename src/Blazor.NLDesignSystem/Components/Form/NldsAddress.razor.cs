using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsAddress
    {
        /// <summary>
        /// Optional; overrides the default value; if the input contains a hint the value "hint_" + Id will be used by default
        /// </summary>
        [Parameter]
        public string AriaDescribedBy { get; set; }
        [Parameter]
        public string DescriptionZipcode { get; set; } = "Postcode";
        [Parameter]
        public string DescriptionHouseNumber { get; set; } = "Huisnummer";
        [Parameter]
        public string DescriptionHousenumberSuffix { get; set; } = "Jaar";
        [Parameter]
        public string ErrorText { get; set; }
        [Parameter]
        public string Identifier { get; set; }
        [Parameter]
        public string InvalidDateMessage { get; set; } = "De ingevulde waarden vormen geen geldige datum.";
        [Parameter]
        public bool IsDisabled { get; set; }
        [Parameter]
        public bool IsRequired { get; set; }
        [Parameter]
        public LabelAlignment LabelAlignment { get; set; }
        [Parameter]
        public string LabelZipcode { get; set; } = "postcode";
        [Parameter]
        public string LabelHouseNumber { get; set; } = "huisnummer";
        [Parameter]
        public string LabelHousenumberSuffix { get; set; } = "toevoeging";

        [Parameter]
        public RenderFragment Label { get; set; }
        [Parameter]
        public RenderFragment Hint { get; set; }

        //2-way binding
        [Parameter]
        public Address Value
        {
            get => _value;
            set
            {
                if (_value == value) return;
                _value = value;
                ValueChanged.InvokeAsync(value);
            }
        }
        private Address _value = new Address();
        [Parameter]
        public EventCallback<Address> ValueChanged { get; set; }

        private int HouseNumber { get => Value.HouseNumber; set { Value.HouseNumber = value; ValueChanged.InvokeAsync(Value); } }
        private string HouseNumberSuffix { get => Value.HouseNumberSuffix; set { Value.HouseNumberSuffix = value; ValueChanged.InvokeAsync(Value); } }
        private string ZipCode { get => Value.ZipCode; set { Value.ZipCode = value; ValueChanged.InvokeAsync(Value); } }

        private bool IsValid => string.IsNullOrWhiteSpace(ErrorText);
        private string LabelAlignmentStyle => LabelAlignment.GetDescription<StyleAttribute>();

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

    public class Address
    {
        public string ZipCode { get; set; }
        public int HouseNumber { get; set; }
        public string HouseNumberSuffix { get; set; }
    }
}
