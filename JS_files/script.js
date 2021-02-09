/* global ThemeChanger:readonly */
const themes = new ThemeChanger();
themes.init();

// Smoothly transitions the title colors
const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padEnd(6, 'E');

const changeColor = (id_type) => document.getElementById(id_type).style.color = randomColor();

setInterval(() => {
    changeColor('t1');
    changeColor('t2');
    changeColor('t3');
    changeColor('t4');
}, 5000);

const secret_button = document.getElementById('t3');
const secret_text = document.getElementById('title-info');
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


console.log('%cHey! Stop peeking down here! Easter eggs are too easy....\nid: peekaboo', `
  color: #09f;
  font-size: 14px;
  font-family:"Lucida Console", Monaco, monospace;
`);

const openModal = document.getElementById('easter-egg');
const modal = document.getElementById('my-modal');
const closeModal = document.getElementById('close');

openModal.onclick = function() { modal.style.display = 'block'; };
closeModal.onclick = function() { modal.style.display = 'none'; };
window.onclick = function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
};