using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Primitives;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsSection
    {
        [Parameter]
        public string Title { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private bool ShowTitle => !string.IsNullOrWhiteSpace(Title);
    }
}
