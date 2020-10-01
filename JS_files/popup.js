// Get the modal
var modal = document.getElementById("myModal");


console.log('%cHey! Stop peeking down here! Easter eggs are too easy....\nid: peekaboo', `
  background: white;
  color: #09f;
  font-size: 14px;
  font-family:"Lucida Console", Monaco, monospace;
`);
// Get the button that opens the modal
var btn = document.getElementById("easter-egg");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
