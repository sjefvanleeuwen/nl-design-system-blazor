using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsPagination
    {
        [Parameter]
        public int ActivePage { get; set; } = 1;
        [Parameter]
        public Action NextAction { get; set; }
        [Parameter]
        public string NextText { get; set; }
        [Parameter]
        public int NumberOfPages { get; set; }
        [Parameter]
        public int NumberOfPageNumbersToDisplay { get; set; } = 5;
        [Parameter]
        public Action<int> PageAction { get; set; }
        [Parameter]
        public Action PreviousAction { get; set; }
        [Parameter]
        public string PreviousText { get; set; }
        [Parameter]
        public string ScreenreaderActivePageDescription { get; set; } = "U bevindt zich op pagina";
        [Parameter]
        public string ScreenreaderPageDescription { get; set; } = "pagina";

        private bool NextEnabled => NextAction != null ||
                                    (PageAction != null && ActivePage < NumberOfPages);
        private IEnumerable<Page> Pages => BuildDisplayPages();
        private bool PreviousEnabled => PreviousAction != null ||
                                        (PageAction != null && ActivePage > 1);

        private void InvokeNext()
        {
            if (NextAction != null)
            {
                NextAction.Invoke();
            }
            else
            {
                InvokePage(ActivePage + 1);
            }
        }

        private void InvokePrevious()
        {
            if (PreviousAction != null)
            {
                PreviousAction.Invoke();
            }
            else
            {
                InvokePage(ActivePage - 1);
            }
        }

        private void InvokePage(int pageNumber)
        {
            PageAction?.Invoke(pageNumber);
        }

        private IEnumerable<Page> BuildDisplayPages()
        {
            if (PageAction == null || NumberOfPages < 1)
            {
                return new List<Page>();
            }

            var pageNumbers = DefinePageNumbers();
            return DefinePagesFromPageNumbers(pageNumbers);
        }

        private IEnumerable<int> DefinePageNumbers()
        {
            var minimumPage = 1;
            var maximumPage = NumberOfPages;

            var result = new List<int>();
            if (NumberOfPages > NumberOfPageNumbersToDisplay + 2)
            {
                var maxNumbersToLeft = (int)Math.Floor((Decimal)((NumberOfPageNumbersToDisplay - 1) / 2));
                minimumPage = Math.Max(ActivePage - maxNumbersToLeft, 1);
                maximumPage = minimumPage + NumberOfPageNumbersToDisplay - 1;
                if (maximumPage > NumberOfPages)
                {
                    minimumPage = NumberOfPages - NumberOfPageNumbersToDisplay + 1;
                    maximumPage = NumberOfPages;
                }
            }

            if (minimumPage > 1)
            {
                result.Add(1);
            }
            for (var i = minimumPage; i <= maximumPage; i++)
            {
                result.Add(i);
            }
            if (maximumPage < NumberOfPages)
            {
                result.Add(NumberOfPages);
            }

            return result;
        }

        private IEnumerable<Page> DefinePagesFromPageNumbers(IEnumerable<int> pageNumbers)
        {
            var result = new List<Page>();
            foreach (var pageNumber in pageNumbers)
            {
                var page = new Page
                {
                    Number = pageNumber,
                    IsActive = pageNumber == ActivePage
                };
                if (pageNumber == 1 && pageNumbers.Count() > 1 && !pageNumbers.Contains(2))
                {
                    page.IsFirst = true;
                }
                if (pageNumber == pageNumbers.Max() && pageNumbers.Count() > 1 && !pageNumbers.Contains(pageNumber - 1))
                {
                    page.IsLast = true;
                }

                result.Add(page);
            }
            return result;
        }
    }

    public class Page
    {
        public int Number { get; set; }
        public bool IsActive { get; set; }
        public bool IsFirst { get; set; }
        public bool IsLast { get; set; }
    }
}
