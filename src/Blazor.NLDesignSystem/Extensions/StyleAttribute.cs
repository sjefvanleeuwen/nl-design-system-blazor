using System;

namespace Blazor.NLDesignSystem.Extensions
{
    public class StyleAttribute : Attribute, IDescription
    {
        public string Description { get; set; }

        public StyleAttribute(string description)
        {
            Description = description;
        }
    }
}
