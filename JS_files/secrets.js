// If you have not found at least 5 easter eggs, please do not continue.

// trying to learn how to use arrow functions and constants
// also non-js people who look have no idea wtf is going on, which is a plus
const isNum = (n) => !!(parseFloat(n)+1); // +1 so that 0 doesnt interpet as falsy :facepalm:

var showBorder = true;


setTimeout(
    function(){
       document.querySelector("#item-4").innerHTML='<p>Wow, you\'re patient! id: kinda_lazy</p>'; easterEgg = 1;
    }, 60 * 1000
);



document.addEventListener('keyup', function (event) {
    // event.key is key pressed

    if (['`', '~'].includes(event.key)) { // toggle border on
        showBorder ^= true;
        let border_style = "1px solid " + (showBorder ? "white" : "black");

        [...document.getElementsByClassName('grid-item')].forEach(e => e.style.border = border_style)

    } else if (isNum(event.key)) {
        counter = typeof(counter) == 'undefined' ? 0 : counter; // counter is current number. Initializes with 0
        
        if (counter + 1 == event.key){ // if the key the user pressed is one bigger than the counter:
            counter = parseInt(event.key); // set counter to key pressed
        };
        if (document.querySelector("#item-3").innerHTML == ''){
            document.querySelector("#item-3").innerHTML = '<div id="loading-bar"></div>'; // create loading bar if haven't done so already
        }
        document.querySelector('#loading-bar').style.height = (counter + 1) * 10 + "%";
        
    };
});


document.querySelector("#item-7").addEventListener('click', function () {
    this.style.cursor =  ['alias', 'all-scroll', 'cell', 'context-menu', 'copy'][Math.floor(Math.random() * 5)];

    if (!this.innerHTML){
        this.innerHTML = '<p id="clicks-7">0</p>';
        clicks_7 = 0;
        // I keep a variable because otherwise the program would read from dom and be hackable with inspect
    }

    clicks_7++;
    document.querySelector("#clicks-7").innerText = clicks_7.toString().padStart(3, '0');
});

class Terminal {
    constructor(querySelector = "#terminal", prompt = ">", startingText = "Welcome to the terminal!"){
        this.prompt = prompt;
        this.htmlPrompt = '<span id="path">' + prompt + '\xa0</span>'
        this.text = startingText;
        this.selector = querySelector;
        this.terminalElement = document.querySelector(querySelector);
    }

    init() {
        this.terminalElement.innerHTML = '<div id="history"></div><div id="line"><span id="path"></span><input autocomplete="off" type="text" id="input"></div>';
        var prompts = [this.prompt, this.htmlPrompt]
        document.querySelector("#path").innerHTML = this.prompt + '\xa0'
        document.querySelector("#input").addEventListener('keydown', function (event) { 
            if (event.key === 'Enter'){ // submit value
                // Wow! Much purify! Lots security!
                this.value = this.value.replace(/\</g,"&lt;").replace(/\>/g,"&gt;")
                document.querySelector("#history").innerHTML += (prompts[1] + this.value+ '<br>')
                this.value = ''
            }
        })
        this.addMessage(this.text)
    }

    addMessage(message, withPrompt = false) {
        document.querySelector('#history').innerHTML += (withPrompt ? this.htmlPrompt : '') + message + '<br>'
    }
}

terminal = new Terminal(
    querySelector = "#item-2",
    )
terminal.init()
terminal.addMessage('Lorem Ipsum')
