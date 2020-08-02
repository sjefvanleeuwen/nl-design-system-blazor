using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsInSiteNavigation
    {
        [Parameter]
        public IEnumerable<InSiteNavigationItem> Items { get; set; }

        public void ExecuteCallbackEvent(Guid key)
        {
            Items?.FirstOrDefault(i => i.Key == key)?.OnClick?.Invoke(key);
        }
    }

    public class InSiteNavigationItem
    {
        public Action<Guid> OnClick { get; set; }
        public string Content { get; set; }
        public bool IsSelected { get; set; }
        public string Uri { get; set; }

        public readonly Guid Key = Guid.NewGuid();

    }
}