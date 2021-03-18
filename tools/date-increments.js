/* date-increment.js

allows you to use <date-increment> elements so that you can do count-ups
so <date-increment data-from="3/20/2020" data-in="days"> would display
the days since 3/20/2020 (uses js builtin Date)

Also, you can do live updates, so
<date-increment data-from="1/1/2020" data-in="seconds" data-update-every="1000" data-fixed="0">
would update the seconds every 1000 milliseconds, to 0 decimal places.

*/

'use strict';

const convertMillisecondsToUnits = (milliseconds, unit) => {
    /* converts milliseconds to one of absolute unit.
    convertMillisecondsToUnits(604800000, 'week') would return `1` (number)
    */
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;

    return { seconds, minutes, hours, days, weeks }[unit];
};

// https://gist.github.com/vanaf1979/b0d10bbf6a5bb4b4a92958aa25a7b36f#file-vanilla-redued-motion-js
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const prefersReducedMotion = !mediaQuery || mediaQuery.matches;

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

        if (!prefersReducedMotion && this.dataset.updateEvery) {
            setInterval(this.updateLength.bind(this), parseInt(this.dataset.updateEvery));
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