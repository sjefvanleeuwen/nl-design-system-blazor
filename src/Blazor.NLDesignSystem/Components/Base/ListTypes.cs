using Blazor.NLDesignSystem.Extensions;

namespace Blazor.NLDesignSystem
{
    public enum ListType
    {
        Undefined,
        [Style("list list--links list--chevrons")]
        Chrevrons,
        [Style("list list--dash")]
        Dash,
        [Style("list list--decimal")]
        Decimal,
        [Style("list list--decimal-circled")]
        DecimalCircled,
        [Style("list list--links")]
        Links,
        [Style("list list--filter")]
        Filter,
        [Style("list list--filter list--filter-inline")]
        FilterInline,
        [Style("list list--subjects ")]
        Subjects,
        [Style("list list--search ")]
        Search
    }
}
