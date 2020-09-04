const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16)
const changeColor = (id_type) => document.getElementById(id_type).style.color = randomColor()


setInterval(() => {
  changeColor("t1")
  changeColor("t2")
  changeColor("t3")
  changeColor("t4")
}, 5000)


// start color animation as soon as document is ready
setTimeout(changeColor, 10000)

