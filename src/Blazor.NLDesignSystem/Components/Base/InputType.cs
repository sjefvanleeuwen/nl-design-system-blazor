using Blazor.NLDesignSystem.Extensions;

namespace Blazor.NLDesignSystem
{
    public enum InputType
    {
        /// <summary>
        /// The default value. A single-line text field. Line-breaks are automatically removed from the input value.
        /// </summary>
        [Style("text")]
        Text,
        /// <summary>
        /// A control for entering a number. Displays a spinner and adds default validation when supported. Displays a numeric keypad in some devices with dynamic keypads.
        /// </summary>
        [Style("number")]
        Number,
        /// <summary>
        /// A field for editing an email address. Looks like a text input, but has validation parameters and relevant keyboard in supporting browsers and devices with dynamic keyboards. 	
        /// </summary>
        [Style("email")]
        Email,
        /// <summary>
        /// A field for entering a URL. Looks like a text input, but has validation parameters and relevant keyboard in supporting browsers and devices with dynamic keyboards.
        /// </summary>
        [Style("url")]
        Url,
        /// <summary>
        /// A control that lets the user select a file. Use the accept attribute to define the types of files that the control can select. 	
        /// </summary>
        [Style("file")]
        File,
        /// <summary>
        /// A single-line text field whose value is obscured. Will alert user if site is not secure.
        /// </summary>
        [Style("password")]
        Password,
        /// <summary>
        /// A radio button, allowing a single value to be selected out of multiple choices with the same name value.
        /// </summary>
        [Style("radio")]
        Radio,
        /// <summary>
        /// A check box allowing single values to be selected/deselected. 	
        /// </summary>
        [Style("checkbox")]
        Checkbox,
        /// <summary>
        /// A control for specifying a color; opening a color picker when active in supporting browsers.
        /// </summary>
        [Style("color")]
        Color
    }
}
