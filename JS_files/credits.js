'use strict';
// Tutorial I used is https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements

customElements.define('credits-scroll', CreditsScroll, { extends: 'div' });

class CreditsScroll extends HTMLDivElement {
    constructor() {
        super();
    }
}