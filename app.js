class ShadowDomTemplate extends HTMLElement {
  constructor() {
    super();

    /**
     * Step 1: Define a template.
     */
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
            p {
                color: white;
                background-color: #666;
                padding: 5px;
            }
        </style>
        <p>My paragraph</p>
        <p><slot name="my-text">Default text for this slot</slot></p>
`;

    /**
     * Step 2: Define a shadow DOM.
     */
    const shadow = this.attachShadow({mode: 'open'});

    /**
     * Step 3: Set the content of the template (a clone of), as the content of the shadow DOM.
     *
     * Note 1: As soon as we append anything to the shadow, it is rendered to the page. Without using the shadow,
     * we would append our elements to some element in the main DOM (e.g. document.body). The shadow _is_ the DOM in this case, however.
     *
     * Note 2: The elements that we are appending to the shadow DOM in this example (and therefore rendering), is a _clone_ of the
     * DocumentFragment object within the template. (We know this because template.content is always a DocumentFragment object).
     * For the sake of this example it's a one liner, but a larger example could clone the DocumentFragment, do all of its workings, then
     * the final step would be to append to the shadow to trigger the render.
     */
    shadow.appendChild(document.importNode(template.content, true));
  }
}

customElements.define('aie-shadow-dom-template', ShadowDomTemplate);
