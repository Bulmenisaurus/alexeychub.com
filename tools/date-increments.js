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

class DateIncrement extends HTMLElement {
    constructor() {
        super();


    }

    // life-saving: https://stackoverflow.com/questions/42251094/cannot-access-attributes-of-a-custom-element-from-its-constructor
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.from = new Date(this.dataset.from);

        // Specify format you want it in, like weeks, days, etc
        this.milliseconds = new Date() - this.from;
        this.result = convertMillisecondsToUnits(this.milliseconds, this.dataset.in);
        this.resultSpan = document.createElement('span');

        this.resultSpan.innerText = this.result;
        shadow.appendChild(this.resultSpan);
    }

    updateLength() {
        this.shadowRoot.innerHTML = '';
        this.milliseconds = new Date() - this.from;

    }
}


customElements.define('date-increment', DateIncrement);