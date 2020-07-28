using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsList
    {
        [CascadingParameter(Name = "ParentListType")]
        public ListType? ParentListType { get; set; }
        [CascadingParameter(Name = "IsFooter")]
        public bool IsFooter { get; set; }

        [Parameter]
        public bool HasColumns { get; set; }
        [Parameter]
        public ListType Type { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private ListType TypeToUse => (Type == ListType.Undefined && ParentListType.HasValue) ? ParentListType.Value : Type;
        private string DisplayStyle => TypeToUse.GetDescription<StyleAttribute>() ?? string.Empty;
        private bool IsNumbered =>
            TypeToUse == ListType.Decimal ||
            TypeToUse == ListType.DecimalCircled;
    }
}
