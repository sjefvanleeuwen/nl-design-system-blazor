using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsCheckbox
    {
        [Inject]
        private IJSRuntime JSRuntime { get; set; }

        [Parameter]
        public string ErrorText { get; set; }
        [Parameter]
        public string Identifier { get; set; }
        [Parameter]
        public bool IsFilter { get; set; }
        [Parameter]
        public ItemAlignment ItemAlignment { get; set; }
        [Parameter]
        public RenderFragment Legend { get; set; }
        [Parameter]
        public RenderFragment Hint { get; set; }

        //2-way binding
        [Parameter]
        public IEnumerable<CheckboxItem> Items
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
        private IEnumerable<CheckboxItem> _items = new List<CheckboxItem>();

        [Parameter]
        public EventCallback<IEnumerable<CheckboxItem>> ItemsChanged { get; set; }

        private ElementReference CheckboxListReference { get; set; }

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                if (IsNested)
                {
                    await JSRuntime.InvokeVoidAsync("checkbox", CheckboxListReference);
                }
            }
            await base.OnAfterRenderAsync(firstRender);
        }

        private string InputControlType => InputType.Checkbox.GetDescription<InputControlAttribute>();
        private bool IsNested => Items.Any(i => i.HasSubItems);
        private bool IsValid => string.IsNullOrWhiteSpace(ErrorText);
        private string ItemAlignmentStyle => ItemAlignment.GetDescription<StyleAttribute>();
    }

    public class CheckboxItem
    {

        public string Value { get; set; }
        public string Description { get; set; }
        public bool IsDisabled { get; set; }
        public IEnumerable<CheckboxItem> SubItems { get; set; }
        public bool IsChecked { get; set; }

        public bool HasSubItems => SubItems != null && SubItems.Any();

        public void Toggle()
        {
            IsChecked = !IsChecked;
            if (!HasSubItems)
            {
                return;
            }
            foreach (var subItem in SubItems)
            {
                subItem.IsChecked = IsChecked;
            }
        }
    }
}
