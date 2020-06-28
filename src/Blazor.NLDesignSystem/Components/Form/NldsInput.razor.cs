using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components.Form
{
    public partial class NldsInput
    {
        [Parameter]
        public string Id { get; set; }
        [Parameter]
        public bool IsInvalid { get; set; }
        [Parameter]
        public LabelAlignment LabelAlignment { get; set; }
        [Parameter]
        public RenderFragment ChildContent { get; set; }
        [Parameter]
        public RenderFragment Hint { get; set; }
        [Parameter]
        public RenderFragment Error { get; set; }
        [Parameter]
        public InputSize Size { get; set; }
        [Parameter]
        public string AriaDescribedBy { get; set; }
        [Parameter]
        public bool IsRequired { get; set; }
        public InputType Type { get; set; }
        private string labelAlignment => LabelAlignment.GetDescription<StyleAttribute>();
        private string size => Size.GetDescription<StyleAttribute>();
        private string type =>Type.GetDescription<StyleAttribute>();
    }
}
