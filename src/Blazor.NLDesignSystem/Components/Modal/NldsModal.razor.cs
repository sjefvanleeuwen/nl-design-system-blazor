using Blazor.NLDesignSystem.Extensions;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Threading.Tasks;

namespace Blazor.NLDesignSystem.Components
{
    public partial class NldsModal
    {
        [Inject]
        private IJSRuntime JSRuntime { get; set; }

        [Parameter]
        public string CloseText { get; set; } = "Sluit";
        [Parameter]
        public ModalSize? Height { get; set; }
        [Parameter]
        public string Identifier { get; set; } = Guid.NewGuid().ToString(); //If no identifyer is supplied there needs to be a unique referal
        [Parameter]
        public bool HasCloseButton { get; set; } = true;
        [Parameter]
        public string ScreenReaderText { get; set; }
        [Parameter]
        public bool Show { get; set; }
        [Parameter]
        public string Title { get; set; }
        [Parameter]
        public bool HasBackDrop { get; set; } = true;
        [Parameter]
        public ModalSize? Width { get; set; }

        [Parameter]
        public RenderFragment Footer { get; set; }
        [Parameter]
        public RenderFragment Content { get; set; }

        public ElementReference ModalReference { get; set; }

        protected async override Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await JSRuntime.InvokeVoidAsync("modal", ModalReference, Identifier);
            }
            await base.OnAfterRenderAsync(firstRender);
        }

        private string HeightAppendix => HeightIsSet ? Height.GetDescription<StyleAttribute>() : string.Empty;
        private bool HeightIsSet => Height != null;
        private bool ShowFooter => Footer != null;
        private bool ShowHeader => ShowTitle || HasCloseButton;
        private bool ShowScreenReaderText => !string.IsNullOrWhiteSpace(ScreenReaderText);
        private bool ShowTitle => !string.IsNullOrWhiteSpace(Title);
        private string WidhtAppendix => WidthIsSet ? Width.GetDescription<StyleAttribute>() : string.Empty;
        private bool WidthIsSet => Width != null;
        public async void Open()
        {
            await JSRuntime.InvokeVoidAsync("openModal", Identifier);
        }
    }
}
