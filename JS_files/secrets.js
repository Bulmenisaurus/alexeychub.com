// TODO: hints system, fully implement all easter eggs, maybe have a solution for hints having to be all over the place

const START = Date.now();

const numbersZeroToNine = ' '.repeat(10).split('').map((a, i) => i.toString());
const isNum = (n) => numbersZeroToNine.includes(n);

const getTime = () => {
    const time = Math.round((Date.now() - START) / 1000);
    return `[${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}]`;
};

const randomChoice = (...arr) => arr[Math.floor(Math.random() * arr.length)];

let showBorder = true;

setTimeout(function() { document.querySelector('#item-4').innerHTML = '<p>Wow, you\'re patient! id: kinda_lazy</p>', EasterEggs.earn('wait'); }, 6e4);
document.querySelector('#item-3').innerHTML = '<div id="loading-bar" style="height: 0%"></div>';
document.querySelector('#item-8').onmouseenter = function() { this.innerHTML = `<p class="no-select">${'\xa0'.repeat(20)}<span id="is-touch">\xa0</span><span id="is-visible">pekaboo :)</span>${'\xa0'.repeat(20)}</p`; };
document.querySelector('#item-8').onmouseleave = function() { this.innerHTML = ''; };


// Learning about classes from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
class Terminal {
    constructor(querySelector = '#terminal', prompt = '>', startingText = 'Welcome to the terminal!') {
        this.prompt = prompt;
        this.htmlPrompt = '<span class="path no-select">' + prompt + '\xa0</span>';
        this.text = startingText;
        this.terminalElement = document.querySelector(querySelector);
    }

    init() {
        const that = this;
        this.terminalElement.innerHTML = `<div id="history"></div><div id="line">${this.htmlPrompt}<input autocomplete="off" type="text" id="input"></div>`;
        document.querySelector('#input').addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.value = this.value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                that.addMessage(this.value, true);
                this.value = '';
            }
        });
        this.addMessage(this.text);
    }

    addMessage(message, withPrompt = false) {
        document.querySelector('#history').innerHTML += (withPrompt ? this.htmlPrompt : '') + message + '<br>';
    }

    formattedMessage(focus, message, timeStamp = true) {
        this.addMessage(`<span class="terminal-focus">${focus}</span> ${message} ${timeStamp ? `<span class="terminal-info">${getTime()}</span><br>` : ''}`);
    }
}

const terminal = new Terminal('#item-2', '>$]⚘⁕»'[Math.floor(6 * Math.random())], 'Welcome to <span class="important">Hints.js!</span>');
terminal.init();


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
        showBorder ^= true;
        const borderStyle = '1px solid ' + (showBorder ? 'white' : 'black');
        [...document.getElementsByClassName('grid-item')].forEach(e => e.style.border = borderStyle);

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
document.querySelector('#item-7').addEventListener('click', function() {

    const cursors = ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw', 'ew', 'ns', 'nesw', 'nwse'];
    this.style.cursor = cursors[Math.floor(Math.random() * cursors.length)] + '-resize';
    if (!this.innerHTML) {
        this.innerHTML = '<p id="clicks-7" class="no-select">0</p>';
    }
    clicks_7++;
    if (clicks_7 == 10) {
        EasterEggs.earn('click');
        this.children[0].classList.add('green');
        this.style.cursor = 'initial';
        this.removeEventListener('click', arguments.callee);
        // above from https://stackoverflow.com/a/13076344 :)
    }
    document.querySelector('#clicks-7').innerText = clicks_7.toString().padStart(3, '0');
});

document.querySelector('#item-8').addEventListener('scroll', function(e) {
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