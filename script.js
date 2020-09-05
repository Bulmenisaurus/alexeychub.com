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
  var grid = document.getElementsByClassName("grid-container")

  if (window.innerWidth <  window.innerHeight) {
    grid[0].style.display = "block"
  } else {
    grid[0].style.display = "grid"
  }
}


resize_grid()
window.onresize = (resize_grid)
