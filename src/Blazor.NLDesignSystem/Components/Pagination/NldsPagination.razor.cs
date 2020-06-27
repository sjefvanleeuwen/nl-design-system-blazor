using Microsoft.AspNetCore.Components;
using System;

namespace Blazor.NLDesignSystem.Components.Pagination
{
    public partial class NldsPagination
    {
        //[Parameter]
        //public Action Next { get; set; }
        [Parameter]
        public string NextText { get; set; }
        [Parameter]
        public Action Previous { get; set; }
        [Parameter]
        public string PreviousText { get; set; }
        [Parameter]
        public string ScreenreaderDescription { get; set; }

        //protected bool NextDisabled => Next == null;
        protected bool PreviousDisabled => Previous == null;

        private void InvokeNext()
        {
            //Next?.Invoke();
        }

        public void InvokeNextt()
        {
            Console.WriteLine("invokecalled");
        }

        private void InvokePrevious()
        {
            Previous?.Invoke();
        }
    }
}
