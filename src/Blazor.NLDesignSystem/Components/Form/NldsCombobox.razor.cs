using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public string Identifier { get; set; } = Guid.NewGuid().ToString();
        [Parameter]
        public bool IsDisabled { get; set; }
        [Parameter]
        public bool IsMultiple { get; set; }
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
        public IEnumerable<ComboboxItem> Items
        {
            get => _items;
            set
            {
                if (_items == value) return;
                _items = value;
                ItemsChanged.InvokeAsync(value);
                StateHasChanged();
            }
        }
        private IEnumerable<ComboboxItem> _items = new List<ComboboxItem>();
        [Parameter]
        public EventCallback<IEnumerable<ComboboxItem>> ItemsChanged { get; set; }

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
        public EventCallback<ComboboxSelectedItem> OnComboboxSelect { get; set; }

        public ElementReference ComboboxReference { get; set; }

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                if (IsMultiple)
                {
                    await JSRuntime.InvokeVoidAsync("comboboxMultiple", ComboboxReference, Identifier);
                }
                else
                {
                    await JSRuntime.InvokeVoidAsync("combobox", ComboboxReference, Identifier, Items.Where(i => !i.IsDisabled).Select(i => i.Value));
                }
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
                    var comboboxSelectItem = JsonSerializer.Deserialize<ComboboxSelectedItem>(eventJson, JsonOptions);
                    var selectedDescription = comboboxSelectItem.Data;
                    var itemList = Items.ToList();
                    itemList.ForEach(i => i.IsChecked = i.Value == selectedDescription);
                    Items = itemList;
                    if (OnComboboxSelect.HasDelegate)
                        await OnComboboxSelect.InvokeAsync(comboboxSelectItem);
                    break;
            }
        }
    }

    public class ComboboxSelectedItem
    {
        public bool IsTrusted { get; set; }
        public string Data { get; set; }
    }

    public class ComboboxItem { 
        public string Value { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsChecked { get; set; }
    }
}
