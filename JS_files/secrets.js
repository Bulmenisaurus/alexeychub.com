var clicks = 0


// If you have not found at least 5 easter eggs, please do not continue.

function mainClick() {
    clicks ++
    console.log(clicks)
}

setTimeout(function() {document.querySelector("#results").innerHTML = "Wow, you're patient!"}, 10)