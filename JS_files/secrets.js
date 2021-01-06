// If you have not found at least 5 easter eggs, please do not continue.
// TODO: hints system, fully implement all easter eggs, maybe have a solution for hints having to be all over the place

// trying to learn how to use arrow functions and constants
// also non-js people who look have no idea wtf is going on, which is a plus
START = Date.now()

const isNum = (n) => !!(parseFloat(n) + 1); // +1 so that 0 doesnt interpet as falsy :facepalm:

const getTime = () => {
    let time = Math.round((Date.now() - START) / 1000); return `[${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}]`;
};

var showBorder = true;

setTimeout(function() { document.querySelector("#item-4").innerHTML = "<p>Wow, you're patient! id: kinda_lazy</p>", EasterEggs.earn("wait") }, 6e4);
document.querySelector("#item-3").innerHTML = '<div id="loading-bar" style="height: 0%"></div>';
document.querySelector('#item-8').onmouseenter = function() { this.innerHTML = `<p class="no-select">${'\xa0'.repeat(20)}<span id="is-touch">\xa0</span><span id="is-visible">pekaboo :)</span>${'\xa0'.repeat(20)}</p`; }
document.querySelector('#item-8').onmouseleave = function() { this.innerHTML = '' }


// Learning about classes from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
class Terminal {
    constructor(querySelector = "#terminal", prompt = ">", startingText = "Welcome to the terminal!") {
        this.prompt = prompt;
        this.htmlPrompt = '<span class="path no-select">' + prompt + '\xa0</span>';
        this.text = startingText;
        this.terminalElement = document.querySelector(querySelector);
    }

    init() {
        var that = this
        this.terminalElement.innerHTML = `<div id="history"></div><div id="line">${this.htmlPrompt}<input autocomplete="off" type="text" id="input"></div>`;
        document.querySelector("#input").addEventListener('keydown', function(event) {
            if (event.key === 'Enter') { // submit value
                this.value = this.value.replace(/\</g, "&lt;").replace(/\>/g, "&gt;"); // Wow! Much purify! Lots security!
                that.addMessage(this.value, true);
                this.value = '';
            };
        });
        this.addMessage(this.text);
    };

    addMessage(message, withPrompt = false) {
        document.querySelector('#history').innerHTML += (withPrompt ? this.htmlPrompt : '') + message + '<br>';
    };

    formattedMessage(focus, message, timeStamp = true) {
        this.addMessage(`<span class="terminal-focus">${focus}</span> ${message} ${timeStamp ? `<span class="terminal-info">${getTime()}</span><br>` : ''}`);
    };
};

terminal = new Terminal("#item-2", ">$]⚘⁕»"[Math.floor(6 * Math.random())], 'Welcome to <span class="important">Hints.js!</span>');
terminal.init();


// Easter eggs
class EasterEggs {

    static EGGS = { numbers: false, click: false, wait: false };
    static SENTHINTS = []

    static earn(achievement) {
        switch (achievement) { // First time using switch and case :D
            case 'numbers': terminal.formattedMessage('[Numbers!]', '1-2, skip a few, 10!'); EasterEggs.EGGS.numbers = true; break;
            case 'wait': terminal.formattedMessage('[Patient!]', 'Wow, you\'re patient!'); EasterEggs.EGGS.wait = true; break;
            case 'click': terminal.formattedMessage('[Clicks!]', 'Click clack, you\'ve clicked a lot!'); EasterEggs.EGGS.click = true; break;
        }
        this.printHint()
    }

    static hint(eggId) {
        switch (eggId) {
            case 'numbers': return 'Try to press 0 or 1. Is there a pattern you can continue?';
            case 'click': return 'Try clicking around.';
            case 'wait': return 'Wait - any second now....';
        };
    }

    static printHint() {
        console.log(this.EGGS, this.SENTHINTS)
        for (let x in this.EGGS) {
            if (!this.EGGS[x] && !this.SENTHINTS.includes(x)) {
                terminal.formattedMessage('[Hint]', this.hint(x), false);
                this.SENTHINTS.push(x)
                break
            }
        };
        if (Object.values(EasterEggs.EGGS).every(i => !!i == true)) {
            terminal.addMessage('Wow! You\'ve earned all the easter eggs! That\'s pretty impresive...');
        }
    };
};
EasterEggs.printHint()


document.addEventListener('keyup', function(event) {
    if (['`', '~'].includes(event.key)) { // toggle border on
        showBorder ^= true;
        let border_style = "1px solid " + (showBorder ? "white" : "black");
        [...document.getElementsByClassName('grid-item')].forEach(e => e.style.border = border_style)

    } else if (isNum(event.key)) {
        counter = typeof (counter) == 'undefined' ? 0 : counter; // counter is current number. Initializes with 0

        if (counter + 1 == event.key) { // if the key the user pressed is one bigger than the counter:
            counter++
            if (counter === 9) {
                EasterEggs.earn('numbers');
            };
        }
        document.querySelector('#loading-bar').style.height = (counter + 1) * 10 + "%";

    };
});


document.querySelector("#item-7").addEventListener('click', function() {
    // https://codeburst.io/javascript-map-vs-foreach-f38111822c0f has saved my life <3
    let cursors = ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw', 'ew', 'ns', 'nesw', 'nwse'].map((i) => i + "-resize")
    this.style.cursor = cursors[Math.floor(Math.random() * cursors.length)];
    if (!this.innerHTML) {
        this.innerHTML = '<p id="clicks-7" class="no-select">0</p>';
        clicks_7 = 0;
    }
    clicks_7++;
    if (clicks_7 == 10) {
        EasterEggs.earn('click')
        this.children[0].classList.add('green')
        this.style.cursor = 'initial'
        this.removeEventListener('click', arguments.callee)
        // above from https://stackoverflow.com/a/13076344 :)
    }
    document.querySelector("#clicks-7").innerText = clicks_7.toString().padStart(3, '0');
});

document.querySelector('#item-8').onmouseenter = function() { this.innerHTML = `<p class="no-select">${'\xa0'.repeat(20)}<span id="is-touch">\xa0</span><span id="is-visible">pekaboo :)</span>${'\xa0'.repeat(20)}</p`; }
document.querySelector('#item-8').onmouseleave = function() { this.innerHTML = '' }

document.querySelector('#item-8').addEventListener('scrollend', function(e) {
    console.log(e);
});
