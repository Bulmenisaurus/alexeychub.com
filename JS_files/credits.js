'use strict';
// Tutorial I used is https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements

class CreditsScroll extends HTMLDivElement {
    constructor() {
        const me = super();
        me.style.transitionDuration = me.dataset.scrollTime;
        console.log(me.dataset);
        me.style.transitionTimingFunction = me.dataset.transitionStyle ? me.dataset.transitionStyle : 'linear';

        setTimeout(function() {
            // I just love how simple transitions make this <3
            document.querySelector('body > div:nth-child(1)').style.top = '-1600px';
        }, 200);

        setTimeout(function() {
            // Scrolls back down
            me.style.transitionDuration = '3s';
            me.style.top = '0px';
            document.body.style.overflow = 'auto';
        }, parseFloat(me.dataset.scrollTime) * 1000 + 200);
    }


}

customElements.define('credits-scroll', CreditsScroll, { extends: 'div' });
