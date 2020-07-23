using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsFile
    {
        [Parameter]
        public string DeleteText { get; set; }
        [Parameter]
        public string FileName { get; set; }
        [Parameter]
        public string FileInfo { get; set; }
        [Parameter]
        public bool IsPartOfList { get; set; }

        private bool ShowDelete => !string.IsNullOrWhiteSpace(DeleteText);
    }
}
