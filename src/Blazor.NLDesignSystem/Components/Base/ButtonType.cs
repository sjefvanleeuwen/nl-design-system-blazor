using Blazor.NLDesignSystem.Extensions;

namespace Blazor.NLDesignSystem
{
    public enum ButtonType
    {
        [Style("btn")]
        Standard,
        [Style("btn btn--primary")]
        Primary,
        [Style("btn btn--disabled")]
        Disabled,
        [Style("btn btn--icon")]
        Icon,
        [Style("btn btn--digid")]
        DigiD,
        [Style("btn btn--primary btn--digid cta-link")]
        DigiDPrimary,
        [Style("btn btn--link")]
        Link
    }
}
