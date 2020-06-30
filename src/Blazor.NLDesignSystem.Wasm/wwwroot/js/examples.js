
(function () {
    "use strict";

    onLoad();

    function onLoad() {
        const examples = document.querySelectorAll('.example:not(.example--no-code)');

        window.addEventListener('resize', setWidths);

        setWidths();
        // Highlight all default code blocks
        hljs.initHighlighting();

        for (var i = 0; i < examples.length; i++) {
            const example = examples.item(i);
            const content = createTabContent(example, i);
            const tabs = createTabs(example, i);

            example.innerHTML = '';
            example.appendChild(tabs);
            example.appendChild(content);
        }
    }

    /**
     * Creates tabs
     */
    function createTabs(el, id) {
        const tabList = document.createElement('ul');
        tabList.classList.add('tab', 'tab--inline', 'tab--example');
        tabList.setAttribute('role', 'tablist');

        tabList.appendChild(createExampleTab(id));
        tabList.appendChild(createCodeTab(id));

        if (el.querySelector('.js-example') != null) {
            tabList.appendChild(createLogicTab(id));
        }

        return tabList;
    }

    /**
     * Creates example tab
     */
    function createExampleTab(id) {
        const tab = document.createElement('li');
        tab.classList.add('tab__tab', 'tab__tab--active');
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-controls', `panel${id}-1`);
        tab.id = `tab${id}-1`;
        tab.appendChild(createTabAnchor(id, 1, 'Voorbeeld'));

        return tab;
    }

    /**
     * Creates code tab
     */
    function createCodeTab(id) {
        const tab = document.createElement('li');
        tab.classList.add('tab__tab');
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-controls', `panel${id}-2`);
        tab.id = `tab${id}-2`;
        tab.appendChild(createTabAnchor(id, 2, 'HTML'));

        return tab;
    }

    /**
     * Creates logic tab
     */
    function createLogicTab(id) {
        const tab = document.createElement('li');
        tab.classList.add('tab__tab');
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-controls', `panel${id}-3`);
        tab.id = `tab${id}-3`;
        tab.appendChild(createTabAnchor(id, 3, 'JavaScript'));

        return tab;
    }

    /**
     * Creates tab anchor
     */
    function createTabAnchor(id, order, text) {
        let a = document.createElement('a');
        a.href = `#panel${id}-${order}`;
        a.innerHTML = text;

        return a;
    }

    /**
     * Creates tab content
     */
    function createTabContent(el, id) {
        const contentBlock = document.createElement('div');
        contentBlock.classList.add('tab__content');
        const html = el.innerHTML;

        contentBlock.appendChild(createExamplePanel(html, id));
        contentBlock.appendChild(createCodePanel(html, id));

        if (el.querySelector('.js-example')) {
            contentBlock.appendChild(createLogicPanel(html, id));
        }

        return contentBlock;
    }

    /**
     * Creates example panel
     */
    function createExamplePanel(html, id) {
        let section = document.createElement('section');
        section.classList.add('tab__pane', 'tab__pane--active', 'tab__pane--example');
        section.id = `panel${id}-1`;
        section.setAttribute('role', 'tabpanel');
        section.setAttribute('aria-labelledby', `tab${id}-1`);
        section.innerHTML = removeElements(html);

        return section;
    }

    /**
     * Creates code panel
     */
    function createCodePanel(html, id) {
        const section = document.createElement('section'),
            code = document.createElement('code'),
            pre = document.createElement('pre');

        section.classList.add('tab__pane');
        section.id = `panel${id}-2`;
        section.setAttribute('role', 'tabpanel');
        section.setAttribute('aria-labelledby', `tab${id}-2`);

        code.innerText = removeTabs(removeElements(removeExampleClasses(html)));
        pre.classList.add('html');
        pre.appendChild(code);
        section.appendChild(pre);
        hljs.highlightBlock(pre);

        return section;
    }

    /**
     * Creates logic panel
     */
    function createLogicPanel(html, id) {
        const js = getElement(html, '.js-example');
        const section = document.createElement('section');
        section.classList.add('tab__pane');
        section.id = `panel${id}-3`;
        section.setAttribute('role', 'tabpanel');
        section.setAttribute('aria-labelledby', `tab${id}-3`);
        section.innerHTML = removeTabs(js.innerHTML);

        return section;
    }

    function removeExampleClasses(html) {
        const exampleClasses = [
            'show-grid'
        ];

        for (let i = 0; i < exampleClasses.length; i++) {
            html = html.split(exampleClasses[i]).join('');
        }

        return html;
    }

    function removeElements(html) {
        const elementsToRemove = [
            '.js-example'
        ];

        const doc = new DOMParser().parseFromString(html, 'text/html').body;

        elementsToRemove.forEach(function (querySelector) {
            const elements = doc.querySelectorAll(querySelector);
            if (elements.length > 0) {
                for (let i = 0; i < elements.length; i++) {
                    elements.item(i).parentNode.removeChild(elements.item(i));
                }
            }
        })

        return doc.innerHTML;
    }

    function getElement(html, element) {
        const doc = new DOMParser().parseFromString(html, 'text/html').body;
        const el = doc.querySelector(element);

        return el;
    }

    function removeTabs(html) {
        html = html.split('\u200b').join('&#8203;');
        let lines = html.split("\n"),
            regex = /^\s*/,
            result,
            whitespaceLength = 0;

        if (lines[0] === '') {
            lines.splice(0, 1);
        }

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].length > 0 && whitespaceLength == 0) {
                // Get the indentation of the first line
                result = regex.exec(lines[i]);
                if (result.length > 0) {
                    whitespaceLength = result[0].length;
                    // Construct a new regex with the exact length of the whitespace
                    regex = new RegExp("^\\s{" + whitespaceLength + "}");
                }
            }

            if (whitespaceLength > 0) {
                // Now remove the indentation from every line, only if it exists
                lines[i] = lines[i].replace(regex, '');
            }
        }

        return lines.join("\n");
    }

    function setWidths() {
        const examples = document.querySelectorAll('.example--fullwidth');
        for (let i = 0; i < examples.length; i++) {
            setWidth(examples.item(i));
        }
    }

    function setWidth(el) {
        const styles = getComputedStyle(el.parentNode);
        el.style.marginLeft = '-' + styles.paddingLeft;
        el.style.marginRight = '-' + styles.paddingRight;
    }

})();
