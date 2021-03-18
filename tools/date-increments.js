/* date-increment.js

allows you to use <date-increment> elements

*/

'use strict';

const convertMillisecondsToUnits = (milliseconds, unit) => {
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;

    return { seconds, minutes, hours, days, weeks }[unit];
};

// https://gist.github.com/vanaf1979/b0d10bbf6a5bb4b4a92958aa25a7b36f#file-vanilla-redued-motion-js
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const doIncrementAnimation = !mediaQuery || mediaQuery.matches;

class DateIncrement extends HTMLElement {
    constructor() {
        super();
        this.style['font-variant-numeric'] = 'numeric';
    }

    // life-saving: https://stackoverflow.com/questions/42251094/cannot-access-attributes-of-a-custom-element-from-its-constructor
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.from = new Date(this.dataset.from);

        // Specify format you want it in, like weeks, days, etc
        this.milliseconds = new Date() - this.from;
        this.result = convertMillisecondsToUnits(this.milliseconds, this.dataset.in);
        this.resultSpan = document.createElement('span');
        this.resultSpan.style.fontVariant = 'tabular-nums';

        if (this.dataset.todecimals) {
            this.result = this.result.toFixed(parseInt(this.dataset.todecimals));
        }

        if (!doIncrementAnimation) {
            setInterval(this.updateLength.bind(this), 10);
        }

        this.resultSpan.innerText = this.result;
        shadow.appendChild(this.resultSpan);
    }

    updateLength() {
        this.milliseconds = new Date() - this.from;
        this.result = convertMillisecondsToUnits(this.milliseconds, this.dataset.in);

        if (this.dataset.todecimals) {
            this.result = this.result.toFixed(parseInt(this.dataset.todecimals));
        }

        this.shadowRoot.querySelector('span').innerText = this.result;

    }
}


customElements.define('date-increment', DateIncrement);