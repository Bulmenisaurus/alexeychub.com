// TODO: hints system, fully implement all easter eggs, maybe have a solution for hints having to be all over the place

const START = Date.now();

const numbersZeroToNine = ' '.repeat(10).split('').map((a, i) => i.toString());
const isNum = (n) => numbersZeroToNine.includes(n);

const getTime = () => {
    const time = Math.round((Date.now() - START) / 1000);
    return `[${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}]`;
};

const randomChoice = (...arr) => arr[Math.floor(Math.random() * arr.length)];

setTimeout(function() { document.querySelector('#item-4').innerHTML = '<p>Wow, you\'re patient! id: kinda_lazy</p>', EasterEggs.earn('wait'); }, 6e4);
document.querySelector('#item-3').innerHTML = '<div id="loading-bar" style="height: 0%"></div>';
document.querySelector('#item-8').onmouseenter = function() { this.innerHTML = `<p class="no-select">${'\xa0'.repeat(20)}<span id="is-touch">\xa0</span><span id="is-visible">pekaboo :)</span>${'\xa0'.repeat(20)}</p`; };
document.querySelector('#item-8').onmouseleave = function() { this.innerHTML = ''; };


// Learning about classes from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
class Terminal {
    constructor(querySelector = '#terminal', startingText = 'Welcome to the terminal!') {
        this.text = startingText;
        this.terminalElement = document.querySelector(querySelector);
        this.terminalElement.innerHTML = `<div id="history">${this.text}<br></div>`;
    }

    addMessage(message) {
        document.querySelector('#history').innerHTML += message + '<br>';
        document.getElementById('history').scrollIntoView({ behavior: 'smooth', block: 'end' });
        // https://stackoverflow.com/a/55902894/
    }

    formattedMessage(focus, message, timeStamp = true) {
        this.addMessage(`<span class="terminal-focus">${focus}</span> ${message} ${timeStamp ? `<span class="terminal-info">${getTime()}</span><br>` : ''}`);
    }
}

const terminal = new Terminal('#item-2', 'Welcome to <span class="important">Hints.js!</span>');


const easterEggs = { numbers: false, click: false, wait: false, scroll: false };
const easterSentHints = [];

class EasterEggs {

    static earn(achievement) {
        // First time using switch and case :D
        switch (achievement) {
            case 'numbers':
                terminal.formattedMessage('[Numbers!]', '1-2, skip a few, 10!'); easterEggs.numbers = true;
                break;
            case 'wait':
                terminal.formattedMessage('[Patient!]', 'Wow, you\'re patient!'); easterEggs.wait = true;
                break;
            case 'click':
                terminal.formattedMessage('[Clicks!]', 'Click clack, you\'ve clicked a lot!'); easterEggs.click = true;
                break;
            case 'scroll':
                terminal.formattedMessage('[Scroll!]', 'How did you ever think to scroll here?'); easterEggs.scroll = true;
        }
        this.printHint();
    }

    static hint(eggId) {
        switch (eggId) {
            case 'numbers': return 'Try to press 0 or 1. Is there a pattern you can continue?';
            case 'click': return 'Try clicking around.';
            case 'wait': return 'Wait - any second now....';
            case 'scroll': return 'Try scrolling around';
        }
    }

    static printHint() {
        for (const x in easterEggs) {
            if (!easterEggs[x] && easterSentHints.includes(x)) {
                terminal.formattedMessage('[Hint]', this.hint(x), false);
                easterSentHints.push(x);
                break;
            }
        }
        if (Object.values(easterEggs).every(i => !!i)) {
            terminal.addMessage('Wow! You\'ve earned all the easter eggs! That\'s pretty impresive...');
        }
    }
}
EasterEggs.printHint();

let counter = 0;

document.addEventListener('keyup', function(event) {
    if (['`', '~'].includes(event.key)) {
        document.querySelector('#grid-1').classList.toggle('no-border');

    } else if (isNum(event.key)) {
        if (counter + 1 == event.key) {
            counter++;
            if (counter === 9) {
                EasterEggs.earn('numbers');
            }
        }
        document.querySelector('#loading-bar').style.height = (counter + 1) * 10 + '%';

    }
});

let clicks_7 = 0;
document.querySelector('#item-7').addEventListener('click', function clicker() {

    const cursors = ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw', 'ew', 'ns', 'nesw', 'nwse'];
    this.style.cursor = randomChoice(...cursors) + '-resize';
    if (!this.innerHTML) {
        this.innerHTML = '<p id="clicks-7" class="no-select">0</p>';
    }
    clicks_7++;
    if (clicks_7 == 10) {
        EasterEggs.earn('click');
        document.querySelector('#clicks-7').style.color = 'green';
        this.removeEventListener('click', clicker);
        // above from https://stackoverflow.com/a/13076344 :)
    }
    document.querySelector('#clicks-7').innerText = clicks_7.toString().padStart(3, '0');
});

document.querySelector('#item-8').addEventListener('scroll', function() {
    if (!document.querySelector('#is-visible')) {
        return;
        // Prevents errors from happening when mouse leaves
    }
    const isScrollableTextVisible = this.getBoundingClientRect().right > document.querySelector('#is-visible').getBoundingClientRect().left;
    if (isScrollableTextVisible && !easterEggs.scroll) {
        EasterEggs.earn('scroll');
    }
});


class Snowflake {
    constructor(snowflakeCharacter = randomChoice('✻', '*', '❋')) {
        this.parentContainer = document.querySelector('#item-5');
        this.snowflakeCharacter = snowflakeCharacter;
        this.snowflake = document.createElement('span');

        this.parentWidth = this.parentContainer.getBoundingClientRect().width;
        this.parentHeight = this.parentContainer.getBoundingClientRect().height;

        this.applyStyling();
        this.parentContainer.appendChild(this.snowflake);
        this.move(this);
    }

    applyStyling() {
        this.distanceFromCamera = Math.random();
        this.snowflakeAnimationLength = Math.round(5 * (1 - this.distanceFromCamera) + 5);


        const snowflakeXOffset = Math.round(Math.random() * this.parentContainer.getBoundingClientRect().width);
        this.snowflake.style.left = snowflakeXOffset + 'px';


        this.snowflake.innerText = this.snowflakeCharacter;

        this.snowflake.style.fontSize = Math.round(10 * this.distanceFromCamera + 10) + 'px';
        this.snowflake.style.bottom = Math.round(Math.random() * 50 + Math.round(this.parentHeight)) + 'px';
        this.snowflake.style.rotate = Math.round(Math.random() * 360) + 'deg';
        this.snowflake.className = 'snowflake no-select';

        setTimeout(() => { this.snowflake.style.transitionDuration = this.snowflakeAnimationLength + 's'; });
    }

    move(that) {
        // otherwise the transition doesn't occur
        setTimeout(function() { that.snowflake.style.bottom = '-25px'; });
        setTimeout(this.reset.bind(this), this.snowflakeAnimationLength * 1000 + 500);
    }

    reset() {
        // Just in case page has been resized :)
        this.parentWidth = this.parentContainer.getBoundingClientRect().width;
        this.parentHeight = this.parentContainer.getBoundingClientRect().height;

        this.snowflakeCharacter = randomChoice('✻', '*', '❋');
        this.snowflake.style = '';

        this.applyStyling();
        this.move(this);
    }
}

for (let x = 0; x < 30; x++) {
    new Snowflake();
}