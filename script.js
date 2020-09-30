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

  if (window.innerWidth <  window.innerHeight && grid[0].style.display != "block"){
    grid[0].style.display = "block";
  } else if (grid[0].style.display != "grid") {
    grid[0].style.display = "grid";
  }
}

var secret_button = document.getElementById("t3");
var secret_text = document.getElementById('title_info')
secret_button.onclick = function() {
  secret_text.innerHTML = 'Wow! Why did you even click on this? id: thats_a_button'
}

resize_grid();
window.onresize = (resize_grid);
