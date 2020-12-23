// If you have not found at least 5 easter eggs, please do not continue.

// trying to learn how to use arrow functions and constants
// also non-js people who look have no idea wtf is going on, which is a plus
const isNum = (n) => !!(parseFloat(n)+1) // +1 so that 0 doesnt interpet as falsy :facepalm:

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
        document.querySelector("#item-3").innerHTML = '<div id="loading-bar"></div>';
        document.querySelector('#loading-bar').style.height = (counter + 1) * 10 + "%";
        
    };
});



document.querySelector("#item-7").addEventListener('click', function () {
    let elmnt = document.querySelector("#item-7")
    elmnt.style.cursor =  'auto' // random.choice ['alias', 'all-scroll', 'cell', 'context-menu', 'copy']

    if (elmnt.innerHTML === ''){
        elmnt.innerHTML = '<p id="clicks-7">0</p>'
        clicks_7 = 0 
        // I keep a variable because otherwise the program would read from dom and be hackable with inspect
    }

    clicks_7++
    document.querySelector("#clicks-7").innerText = clicks_7.toString().padStart(3, '0')
});