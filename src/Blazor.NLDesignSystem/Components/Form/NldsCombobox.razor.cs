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

        [Parameter]
        public bool AllowUnknown { get; set; }
        /// <summary>
        /// Optional; overrides the default value; if the input contains a hint the value "hint_" + Id will be used by default
        /// </summary>
        [Parameter]
        public string AriaDescribedBy { get; set; }
        [Parameter]
        public string ErrorText { get; set; }
        [Parameter]
        public string Identifier { get; set; } = Guid.NewGuid().ToString(); //If no identifyer is supplied there needs to be a unique referal
        [Parameter]
        public bool IsAutocomplete { get; set; }
        [Parameter]
        public bool IsDisabled { get; set; }
        [Parameter]
        public bool IsMultiple { get; set; }
        [Parameter]
        public bool IsRequired { get; set; }
        [Parameter]
        public LabelAlignment LabelAlignment { get; set; }
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
                if (IsAutocomplete)
                {
                    SetData(_items.Select(i => i.Value)).ConfigureAwait(false);
                }
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
                if (OnValueSet.HasDelegate && IsInitialized)
                {
                    SetLoading(true);
                    OnValueSet.InvokeAsync(this);
                    SetData(Items.Select(i => i.Value)).ConfigureAwait(false);
                    SetLoading(false);
                }
            }
        }

        private string _value;
        [Parameter]
        public EventCallback<string> ValueChanged { get; set; }

        [Parameter]
        public EventCallback OnComboboxSelect { get; set; }
        [Parameter]
        public EventCallback OnComboboxOpen { get; set; }
        [Parameter]
        public EventCallback OnComboboxClose { get; set; }
        [Parameter]
        public EventCallback OnValueSet { get; set; }

        public ElementReference ComboboxReference { get; set; }

        private string DisplayType => Type.GetDescription<StyleAttribute>();
        private string InputControlType => Type.GetDescription<InputControlAttribute>();
        private bool IsValid => string.IsNullOrWhiteSpace(ErrorText);
        private string LabelAlignmentStyle => LabelAlignment.GetDescription<StyleAttribute>();
        private string SizeAppendix => Size.GetDescription<StyleAttribute>();
        public InputType Type => InputType.Combobox;

        private bool IsInitialized { get; set; }

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await JSRuntime.InvokeVoidAsync("combobox", ComboboxReference, Identifier, AllowUnknown, IsAutocomplete, Items.Where(i => !i.IsDisabled).Select(i => i.Value), IsMultiple);
            }
            await base.OnAfterRenderAsync(firstRender);
        }

        protected override void OnInitialized()
        {
            IsInitialized = true;
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

        protected override async Task SetEventListeners()
        {
            //always set the combobox-select callback. It sets the value after selecting.
            await SetEventListener("combobox-select", ComboboxReference);
            await SetEventListener("combobox-close", ComboboxReference);
            if (OnComboboxOpen.HasDelegate)
            {
                await SetEventListener("combobox-open", ComboboxReference);
            }
        }

        [JSInvokable]
        public override async Task EventCallback(string eventName, string eventJson)
        {
            switch (eventName)
            {
                case "combobox-select":
                    var comboboxSelectItem = JsonSerializer.Deserialize<ComboboxSelectedItem>(eventJson, JsonOptions);
                    var selectedDescription = comboboxSelectItem.Data;
                    var items = Items.ToList();
                    items.ForEach(i => i.IsChecked = i.Value == selectedDescription);
                    Items = items;
                    if (OnComboboxSelect.HasDelegate)
                    {
                        await OnComboboxSelect.InvokeAsync(this);
                    }
                    break;
                case "combobox-open":
                    await OnComboboxOpen.InvokeAsync(this);
                    break;
                case "combobox-close":
                    await UpdateSelectedList();
                    if (OnComboboxClose.HasDelegate)
                    {
                        await OnComboboxClose.InvokeAsync(this);
                    }
                    break;
            }
        }

        [JSInvokable]
        public async Task UpdateSelectedList()
        {
            if (!IsMultiple || !Items.Any())
            {
                return;
            }
            var items = Items.ToList();
            var selectedValues = await GetValue();
            items.ForEach(i => i.IsChecked = selectedValues.Contains(i.Value));
            Items = items;
            //set a callback to all the items added above the combobox
            await JSRuntime.InvokeVoidAsync("triggerComboboxUpdateSelectedList", ComboboxReference, JSObjectRef);
        }

        public async Task<IEnumerable<string>> GetValue()
        {
            if (IsMultiple)
            {
                return await JSRuntime.InvokeAsync<IEnumerable<string>>("getComboboxValue", Identifier) ?? new List<string>();
            }

            return new List<string> { await JSRuntime.InvokeAsync<string>("getComboboxValue", Identifier) } ?? new List<string>();
        }

        public async void Close()
        {
            await JSRuntime.InvokeVoidAsync("closeCombobox", Identifier);
        }

        public async Task<bool> IsOpen()
        {
            return await JSRuntime.InvokeAsync<bool>("comboboxIsOpen", Identifier);
        }

        public async void Open()
        {
            await JSRuntime.InvokeVoidAsync("openCombobox", Identifier);
        }

        public async Task SetData(IEnumerable<string> data)
        {
            await JSRuntime.InvokeVoidAsync("setComboboxData", Identifier, data);
        }

        public void SetItems(IEnumerable<ComboboxItem> items)
        {
            Items = items;
        }

        public void SetLoading(bool loading)
        {
            JSRuntime.InvokeVoidAsync("setComboboxLoading", Identifier, loading);
        }
    }

    public class ComboboxSelectedItem
    {
        public bool IsTrusted { get; set; }
        public string Data { get; set; }
    }

    public class ComboboxItem
    {
        public string Value { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsChecked { get; set; }
    }
}
