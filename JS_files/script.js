// Smoothly transitions the title colors

const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

const changeColor = (id_type) => document.getElementById(id_type).style.color = randomColor();

setInterval(() => {
    changeColor('t1');
    changeColor('t2');
    changeColor('t3');
    changeColor('t4');
}, 5000);


function resize_grid() {
    const grid = document.getElementsByClassName('grid-container')[0];

    if (window.innerWidth < window.innerHeight) {
        grid[0].style.display = 'block';

    } else if (grid[0].style.display) {
        grid[0].style.display = 'grid';
    }
}

const secret_button = document.getElementById('t3');
const secret_text = document.getElementById('title_info');
let click_amt = -10;
let has_consoled = false;

secret_button.onclick = function() {
    secret_text.innerHTML = (click_amt >= 0) ? 'Why did you click on this even more? id: thats_definetely_a_button' : 'Wow! Why did you even click on this? id: thats_a_button';
    click_amt++;
    if (secret_text.innerHTML == 'Why did you click on this even more? id: thats_definetely_a_button' && !has_consoled) {
        console.log('Yup, the button does multiple things. Who knew? id: side_effects');
        has_consoled = true;
    }
};

resize_grid();
window.onresize = resize_grid;


console.log('%cHey! Stop peeking down here! Easter eggs are too easy....\nid: peekaboo', `
  color: #09f;
  font-size: 14px;
  font-family:"Lucida Console", Monaco, monospace;
`);