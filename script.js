// Smoothly transitions the title colors

const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16)
const changeColor = (id_type) => document.getElementById(id_type).style.color = randomColor()


setInterval(() => {
  changeColor("t1")
  changeColor("t2")
  changeColor("t3")
  changeColor("t4")
}, 5000)



setTimeout(changeColor, 10000)

// Draws the grid above/below instead of left/right when the site is thin enough


function resize_grid() {
  var ratio = window.innerWidth / window.innerHeight
  var grid = document.getElementsByClassName("grid-container")

  document.getElementById("ratio").innerHTML = ratio;

  if (ratio < 1) {
    grid[0].style.display = "block"
  } else {
    grid[0].style.display = "grid"
  }
}


resize_grid()
window.onresize = (resize_grid)
