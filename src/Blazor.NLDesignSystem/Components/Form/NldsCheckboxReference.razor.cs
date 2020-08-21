using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsCheckboxReference
    {
        [Inject]
        private IJSRuntime JSRuntime { get; set; }

        [CascadingParameter(Name = "NldsCheckbox")]
        public NldsCheckbox NldsCheckbox { get; set; }
        
        [Parameter]
        public string Reference { get; set; }

        protected override void OnInitialized()
        {
            base.OnInitialized();
        }

        private bool HasSubItems => ReferencedItem.HasSubItems;
        private string Identifier => $"{Reference}_ghost_ref";
        private string InputControlType => InputType.Checkbox.GetDescription<InputControlAttribute>();
        private bool IsChecked => ReferencedItem.IsChecked;
        private bool IsDisabled => ReferencedItem.IsDisabled;
        private bool IsIndeteminate => ReferencedItem.IsIndeteminate;
        private CheckboxItem ReferencedItem => NldsCheckbox.FindItem(Reference);

        private void ChangeEvent(ChangeEventArgs e)
        {
            NldsCheckbox.ChangeEvent(Reference, e);
        }
    }
}
