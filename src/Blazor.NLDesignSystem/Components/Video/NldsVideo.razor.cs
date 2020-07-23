using Microsoft.AspNetCore.Components;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsVideo
    {
        [Parameter]
        public string PosterUri { get; set; }
        [Parameter]
        public SubtitleInformation Subtitles { get; set; }
        [Parameter]
        public string Width { get; set; } = "100%";
        [Parameter]
        public string Uri { get; set; }

        private bool ShowSubtitles => Subtitles != null;
    }

    public class SubtitleInformation
    {
        public string Label { get; set; }
        public string Language { get; set; }
        public string Uri { get; set; }
    }
}
