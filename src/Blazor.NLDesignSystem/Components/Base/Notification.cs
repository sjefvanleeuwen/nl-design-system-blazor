using Blazor.NLDesignSystem.Extensions;

namespace Blazor.NLDesignSystem
{
    public enum Notification
    {
        [Style("--info")]
        Info,
        [Style("--warning")]
        Warning,
        [Style("--success")]
        Success,
        [Style("--error")]
        Error,
    }
}
