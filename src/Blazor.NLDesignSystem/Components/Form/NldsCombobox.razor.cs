using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsCombobox
    {
        [Inject]
        private IJSRuntime JSRuntime { get; set; }
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
        public string[] Items { get; set; } = new string[] { };
        [Parameter]
        public bool IsDisabled { get; set; }
        [Parameter]
        public bool IsRequired { get; set; }
        [Parameter]
        public LabelAlignment LabelAlignment { get; set; }
        //The Id used to register the elemtne in javascript. Will be the id of the element is not provided
        [Parameter]
        public InputSize Size { get; set; }

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

        [Parameter]
        public EventCallback<ComboboxSelectItem> OnComboboxSelect { get; set; }

        public ElementReference ComboboxReference { get; set; }

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await JSRuntime.InvokeVoidAsync("combobox", ComboboxReference, Items);
            }
            await base.OnAfterRenderAsync(firstRender);
        }

        private string DisplayType => Type.GetDescription<StyleAttribute>();
        private string InputControlType => Type.GetDescription<InputControlAttribute>();
        private bool IsValid => string.IsNullOrWhiteSpace(ErrorText);
        private string LabelAlignmentStyle => LabelAlignment.GetDescription<StyleAttribute>();
        private string SizeAppendix => Size.GetDescription<StyleAttribute>();
        public InputType Type => InputType.Combobox;

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

        protected override async Task SetEventListeners()
        {
            //always set the combobox-select callback. It sets the value after selecting.
            await SetEventListener("combobox-select", ComboboxReference);
        }

        [JSInvokable]
        public override async Task EventCallback(string eventName, string eventJson)
        {
            switch (eventName)
            {
                case "combobox-select":
                    var comboboxSelectItem = JsonSerializer.Deserialize<ComboboxSelectItem>(eventJson, JsonOptions);
                    Value = comboboxSelectItem.Data;
                    if (OnComboboxSelect.HasDelegate)
                        await OnComboboxSelect.InvokeAsync(comboboxSelectItem);
                    break;
            }
        }
    }

    public class ComboboxSelectItem
    {
        public bool IsTrusted { get; set; }
        public string Data { get; set; }
    }
}
