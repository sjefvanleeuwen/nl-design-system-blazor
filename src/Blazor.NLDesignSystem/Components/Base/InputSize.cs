using Blazor.NLDesignSystem.Extensions;

namespace Blazor.NLDesignSystem
{
    public enum InputSize
    {
        [Style("--m")]
        Medium,
        [Style("--xs")]
        ExtraSmall,
        [Style("--s")]
        Small,
        [Style("--l")]
        Large,
        [Style("--xl")]
        ExtraLarge
    }
}
