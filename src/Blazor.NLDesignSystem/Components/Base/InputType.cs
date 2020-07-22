using Blazor.NLDesignSystem.Extensions;

namespace Blazor.NLDesignSystem
{
    public enum InputType
    {
        /// <summary>
        /// The default value. A single-line text field. Line-breaks are automatically removed from the input value.
        /// </summary>
        [InputControl("input__control--text")]
        [Style("text")]
        Text,
        /// <summary>
        /// A control for entering a number. Displays a spinner and adds default validation when supported. Displays a numeric keypad in some devices with dynamic keypads.
        /// </summary>
        [InputControl("input__control--text")]
        [Style("number")]
        Number,
        /// <summary>
        /// A field for editing an email address. Looks like a text input, but has validation parameters and relevant keyboard in supporting browsers and devices with dynamic keyboards. 	
        /// </summary>
        [InputControl("input__control--text")]
        [Style("email")]
        Email,
        /// <summary>
        /// A field for entering a URL. Looks like a text input, but has validation parameters and relevant keyboard in supporting browsers and devices with dynamic keyboards.
        /// </summary>
        [InputControl("input__control--text")]
        [Style("url")]
        Url,
        /// <summary>
        /// A control that lets the user select a file. Use the accept attribute to define the types of files that the control can select. 	
        /// </summary>
        [InputControl("input__control--file")]
        [Style("file")]
        File,
        /// <summary>
        /// A single-line text field whose value is obscured. Will alert user if site is not secure.
        /// </summary>
        [InputControl("input__control--text")]
        [Style("password")]
        Password,
        /// <summary>
        /// A single-line text field whose value is used for search purposes.
        /// </summary>
        [InputControl("input__control--search")]
        [Style("search")]
        Search,
        /// <summary>
        /// A select box, used to select 1 of multiple options.
        /// </summary>
        [InputControl("input__control--select")]
        Select,
        /// <summary>
        /// A radio button, allowing a single value to be selected out of multiple choices with the same name value.
        /// </summary>
        [InputControl("input__control--radio")]
        Radio,
        /// <summary>
        /// A check box allowing single values to be selected/deselected. 	
        /// </summary>
        [InputControl("input__control--checkbox")]
        [Style("checkbox")]
        Checkbox,
        /// <summary>
        /// A input field with a selection from a predefined list of values. 	
        /// </summary>
        [InputControl("input__control--text input__control--select")]
        [Style("text")]
        Combobox,
        /// <summary>
        /// A control for specifying a color; opening a color picker when active in supporting browsers.
        /// </summary>
        [InputControl("input__control--text")]
        [Style("color")]
        Color
    }
}
