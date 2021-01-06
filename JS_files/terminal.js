let STATE = ['encode/decode'];

function rot13(str) {
    const input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
    const index = x => input.indexOf(x);
    const translate = x => index(x) > -1 ? output[index(x)] : x;
    return str.split('').map(translate).join('');
}


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
        document.querySelector('#input').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                this.messageValue = this.value;
                this.value = this.value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                that.addMessage(this.value, true);
                this.value = '';
            }
        });
        this.addMessage(this.text);
        return this;
    }

    addMessage(message, withPrompt = false) {
        document.querySelector('#history').innerHTML += (withPrompt ? this.htmlPrompt : '') + message + '<br>';
        return this;
    }

    formattedMessage(focus, message) {
        this.addMessage(`<span class="terminal-focus">${focus}</span> ${message}`);
        return this;
    }

    setPlaceHolder(placeHolder) {
        document.querySelector('#input').placeholder = placeHolder;
        return this;
    }
}

const terminal = new Terminal('#terminal', '>$]⚘⁕»'[Math.floor(6 * Math.random())], 'Welcome to the terminal, where all h4ck0rz regardless of ethnicity, age, and gender, can use this magical machine');
terminal.init()
    .addMessage('To start off, would you like to encode or decode?')
    .setPlaceHolder('(e/d)');


document.getElementById('input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        // sometimes this eventListener is faster than the other one, sometimes slower.
        STATE = handleState(terminal, STATE, this.value || this.messageValue);
        console.log(STATE);
    }
});


function handleState(handleTerminal, state, inputValue) {
    // This function is called after an input has been taken with the state
    switch (state[0]) {
        case 'encode/decode':

            if (inputValue.startsWith('e') || inputValue.startsWith('d')) {

                handleTerminal.addMessage(`What would you like to ${inputValue.startsWith('e') ? 'encode' : 'decode'}?`)
                    .setPlaceHolder('(message)');
                return ['action', inputValue];

            } else {

                handleTerminal.formattedMessage(inputValue, 'is not a valid input. Please either submit `e` or `d`.');
                return state;

            }

        case 'action':
            handleTerminal.formattedMessage(rot13(inputValue), 'is the result')
                .addMessage('')
                .addMessage('Would you like to encode or decode?')
                .setPlaceHolder('(e/d)');

            return ['encode/decode'];

    }
}