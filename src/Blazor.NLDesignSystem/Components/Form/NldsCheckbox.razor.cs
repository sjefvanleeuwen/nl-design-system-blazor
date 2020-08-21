using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
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
        public bool IsGhost { get; set; }
        [Parameter]
        public ItemAlignment ItemAlignment { get; set; }

        [Parameter]
        public RenderFragment Legend { get; set; }
        [Parameter]
        public RenderFragment Hint { get; set; }
        [Parameter]
        public RenderFragment CheckboxReferenceContent { get; set; }

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

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            SetTopLevelState(Items);
            await base.OnAfterRenderAsync(firstRender);
        }

        private string InputControlType => InputType.Checkbox.GetDescription<InputControlAttribute>();
        private bool IsNested => Items.Any(i => i.HasSubItems);
        private bool IsValid => string.IsNullOrWhiteSpace(ErrorText);
        private string ItemAlignmentStyle => ItemAlignment.GetDescription<StyleAttribute>();

        private IDictionary<string, object> GetAttributes()
        {
            var attributes = new Dictionary<string, object>();
            if (IsGhost)
            {
                attributes["style"] = "display: none;";
            }

            return attributes;
        }

        public void ChangeEvent(string identifier, ChangeEventArgs e)
        {
            var item = FindItem(identifier);
            if (item == null)
            {
                return;
            }

            var isChecked = (bool)e.Value;
            item.IsChecked = isChecked;
            if (item.HasSubItems)
            {
                foreach (var subItem in item.SubItems)
                {
                    //use this variable because IsChecked is a calculated value;
                    subItem.IsChecked = isChecked;
                }
            }

            ItemsChanged.InvokeAsync(Items);
            StateHasChanged();
        }

        public CheckboxItem FindItem(string identifier, IEnumerable<CheckboxItem> items = null)
        {
            if (items == null)
            {
                items = Items;
            }
            foreach (var item in items)
            {
                if (item.Identifier == identifier)
                {
                    return item;
                }
                if (item.HasSubItems)
                {
                    var childItem = FindItem(identifier, item.SubItems);
                    if (childItem != null)
                    {
                        return childItem;
                    }
                }
            }

            return null;
        }

        private async void SetTopLevelState(IEnumerable<CheckboxItem> items)
        {
            foreach (var item in items.Where(i => !i.IsDisabled))
            {
                await JSRuntime.InvokeVoidAsync("setCheckBoxIndeterminate", item.Identifier, item.IsIndeteminate);
                if (IsGhost)
                {
                    await JSRuntime.InvokeVoidAsync("setCheckBoxIndeterminate", $"{item.Identifier}_ghost_ref", item.IsIndeteminate);
                }
            }
        }        
    }

    public class CheckboxItem
    {
        public string Identifier { get; set; } = Guid.NewGuid().ToString();
        public string Value { get; set; }
        public string Description { get; set; }
        public bool IsDisabled { get; set; }
        public IEnumerable<CheckboxItem> SubItems { get; set; }
        private bool isChecked;
        public bool IsChecked { get => HasSubItems ? AllChildrenChecked : isChecked; set => isChecked = value; }

        public bool HasSubItems => SubItems != null && SubItems.Any();
        public bool IsIndeteminate => HasSubItems && SubItems.Any(i => i.IsChecked) && !AllChildrenChecked;
        public bool AllChildrenChecked => HasSubItems && SubItems.All(i => i.IsChecked);
    }
}
