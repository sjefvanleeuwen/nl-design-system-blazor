using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsDate
    {
        /// <summary>
        /// Optional; overrides the default value; if the input contains a hint the value "hint_" + Id will be used by default
        /// </summary>
        [Parameter]
        public string AriaDescribedBy { get; set; }
        [Parameter]
        public string DescriptionDay { get; set; } = "Dag";
        [Parameter]
        public string DescriptionMonth { get; set; } = "Maand";
        [Parameter]
        public string DescriptionYear { get; set; } = "Jaar";
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
        public string LabelDay { get; set; } = "dag";
        [Parameter]
        public string LabelMonth { get; set; } = "maand";
        [Parameter]
        public string LabelYear { get; set; } = "jaar";

        [Parameter]
        public RenderFragment Label { get; set; }
        [Parameter]
        public RenderFragment Hint { get; set; }

        //2-way binding
        [Parameter]
        public DateTime Value
        {
            get => _value;
            set
            {
                if (_value == value) return;
                _value = value;
                ValueChanged.InvokeAsync(value);
            }
        }
        private DateTime _value = DateTime.Today;
        [Parameter]
        public EventCallback<DateTime> ValueChanged { get; set; }

        private int _day;
        private bool _invalidDate;
        private int _month;
        private int _year;

        private int Day { get => _day; set { _day = value; UpdateValue(); } }
        private int Month { get => _month; set { _month = value; UpdateValue(); } }
        private int Year { get => _year; set { _year = value; UpdateValue(); } }

        private string DisplayErrorText => 
            $"{ErrorText}" +
            $"{(!string.IsNullOrWhiteSpace(ErrorText) && _invalidDate ? Environment.NewLine : string.Empty)}" +
            $"{(_invalidDate ? InvalidDateMessage : string.Empty)}";
        private bool IsValid => string.IsNullOrWhiteSpace(DisplayErrorText);
        private string LabelAlignmentStyle => LabelAlignment.GetDescription<StyleAttribute>();

        protected override void OnInitialized()
        {
            Day = Value.Day;
            Month = Value.Month;
            Year = Value.Year;
            base.OnInitialized();
        }

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

        private void UpdateValue()
        {
            _invalidDate = false;
            try
            {
                var newDate = new DateTime(Year, Month, Day);
                if (newDate.Year != Year ||
                    newDate.Month != Month ||
                    newDate.Day != Day)
                {
                    SetInvalidMessage();
                }
                else
                {
                    Value = newDate;
                }
            }
            catch (ArgumentOutOfRangeException ex)
            {
                SetInvalidMessage();
            }
        }

        private void SetInvalidMessage()
        {
            if (!string.IsNullOrWhiteSpace(InvalidDateMessage))
            {
                _invalidDate = true;
            }
        }
    }
}
