//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    var try_left = elmnt.offsetLeft - pos1
    elmnt.style.left = (try_left > 20 ? try_left : 20) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Smoothly transitions the title colors

const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);

const changeColor = (id_type) => document.getElementById(id_type).style.color = randomColor();

setInterval(() => {
  changeColor("t1");
  changeColor("t2");
  changeColor("t3");
  changeColor("t4");
}, 5000)



setTimeout(changeColor, 10000)

// Draws the grid above/below instead of left/right when the site is thin enough


function resize_grid() {
  var grid = document.getElementsByClassName("grid-container");

  if (window.innerWidth <  window.innerHeight){
    grid[0].style.display = "block";
  } else if (grid[0].style.display) {
    grid[0].style.display = "grid";
  }
}

var secret_button = document.getElementById("t3"); 
var secret_text = document.getElementById('title_info')
click_amt = -10

secret_button.onclick = function() {
  secret_text.innerHTML = (click_amt >= 0) ? 'Why did you click on this even more? id: thats_definetely_a_button' : 'Wow! Why did you even click on this? id: thats_a_button'
  click_amt++
}

resize_grid();
window.onresize = (resize_grid);

