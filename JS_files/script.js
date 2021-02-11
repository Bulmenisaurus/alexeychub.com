/* global ThemeChanger:readonly */
const themes = new ThemeChanger();
themes.init();

const random = (max, min) => Math.round((Math.random() * (max - min) + min) / 10) * 10;

// Smoothly transitions the title colors
const randomColor = () => '#' + ['', '', ''].map(() => random(100, 255).toString(16)).join('');

const changeColor = (id_type) => document.getElementById(id_type).style.color = randomColor();

setTimeout(() => {
    setInterval(() => {
        changeColor('t1');
        changeColor('t2');
        changeColor('t3');
        changeColor('t4');
    }, 5000);
}, 0);

const secret_button = document.getElementById('t3');

secret_button.onclick = function() { alert('You found an easter egg!'); };


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