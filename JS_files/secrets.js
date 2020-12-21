// If you have not found at least 5 easter eggs, please do not continue.


var clicks = 0;
var showBorder = true;
var canCreate = true; // can another easter egg be created?

function mainClick() {
    clicks++;
    canCreate = false
}

setTimeout(function(){canCreate && (document.querySelector("#item-4").innerHTML="<p>Wow, you're patient! id: kinda_lazy</p>");},(120*1000));

document.addEventListener('keyup', function (event) {
    // event.key is key pressed
    if (['`', '~'].includes(event.key)) {
        showBorder ^= true;
        elements = document.getElementsByClassName('grid-item');
        border_style = "1px solid " + (showBorder ? "white" : "black");

        for (x = 0; x < elements.length; x++){
            elements[x].style.border = border_style;
        };
    };
});