var clicks = 0


// If you have not found at least 5 easter eggs, please do not continue.

function mainClick() {
    clicks ++
    console.log(clicks)
}

setTimeout(delay_egg, 10000)

function delay_egg() {
    document.querySelector("#results").innerHTML = "Wow, you're patient!";
    console.log("done!");
}