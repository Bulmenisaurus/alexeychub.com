// &h=3&t=hallo

const urlParams = new URLSearchParams(window.location.search);
const hearts = urlParams.get('h') || '0';
const text = urlParams.get('t') || '';

const imageUrl = `https://alexeychub.com/images/store_${hearts}.jpeg`;

let image = document.getElementById('image').appendChild(document.createElement('img')); // = `<img src="${imageUrl}" alt="image_${hearts}">`;
image.src = 'images/placeholder_kitty_300:185.jpeg'; // imageUrl
image.alt = 'A fox and a bear sitting together.';
image.height = 185 * 2; image.width = 300 * 2;

document.getElementById('text').innerHTML = text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace('\n', '<br>');

