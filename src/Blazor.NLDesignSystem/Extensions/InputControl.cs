using System;

namespace Blazor.NLDesignSystem.Extensions
{
    public class InputControlAttribute : Attribute, IDescription
    {
        public string Description { get; set; }

        public InputControlAttribute(string description)
        {
            Description = description;
        }
    }
}
