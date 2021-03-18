/* global ThemeChanger:readonly */
const themes = new ThemeChanger();
themes.onthemechange = (theme) => {
    const githubImage = document.querySelector('footer a img');
    if (theme === 'light') {
        githubImage.src = 'images/GitHub-Mark/PNG/GitHub-Mark-120px-plus.png';
    } else {
        githubImage.src = 'images/GitHub-Mark/PNG/GitHub-Mark-Light-120px-plus.png';
    }
};
themes.init();


const url = new URL(window.location);
const urlParams = new URLSearchParams(url.search);
const theme = urlParams.get('theme');

if (theme) {
    const themeUrl = `stylesheets/style.${theme}.css`;
    document.getElementsByClassName('js-dynamic-css')[0].href = themeUrl;
}

if (!theme) {
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
}

const secret_button = document.getElementById('t3');

secret_button.onclick = () => {
    if (document.querySelector('._text-secret')) return;
    const _text = document.createElement('p');
    _text.classList.add('_text-secret'); _text.innerText = 'You found this easter egg!';
    document.getElementsByTagName('h1')[0].insertAdjacentElement('afterend', _text);
    _text.style.textAlign = 'center';
    _text.style.color = 'var(--font-color)';
    _text.style.transitionDuration = '.5s';
    _text.style.height = '20px';
    _text.style.fontFamily = '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Open Sans\', \'Helvetica Neue\', sans-serif';
    setTimeout(() => {
        _text.style.opacity = '0';
        _text.style.height = '0';
        setTimeout(() => {
            _text.remove();
        }, 500);
    }, 400);
};


console.log('%cHey! Stop peeking down here! Easter eggs are too easy....\nid: peekaboo', `
  color: #09f;
  font-size: 14px;
  font-family:"Lucida Console", Monaco, monospace;
`);

const openModal = document.getElementById('easter-egg');
const modal = document.getElementById('my-modal');
const closeModal = document.getElementById('close');

openModal.onclick = function() {
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
};

closeModal.onclick = function() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
};
window.onclick = function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }
};

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }
});

fetch('https://api.github.com/repos/Bulmenisaurus/bulmenisaurus.github.io/languages')
    .then(response => response.json())
    .then(data => {
        let cssAmount = data['CSS'];
        // bytes to kb
        cssAmount /= 1000;
        // account for duplicate (minified) code
        cssAmount /= 1.5;

        document.querySelector('#js-css-size').innerText = cssAmount.toFixed(2).toString();
    });