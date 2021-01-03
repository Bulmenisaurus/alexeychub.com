// &h=3&t=hallo

const urlParams = new URLSearchParams(window.location.search);
const hearts = urlParams.get('h') || '0';
const text = decodeURIComponent(urlParams.get('t') || '');

const imageUrl = `https://alexeychub.com/images/store_${hearts}.jpg`;

let image = document.getElementById('image').appendChild(document.createElement('img')); // = `<img src="${imageUrl}" alt="image_${hearts}">`;
image.src = imageUrl; // imageUrl
//image.alt = 'A fox and a bear sitting together.';
image.height = 185 * 2; image.width = 300 * 2;

document.getElementById('text').innerHTML = text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, '<br>');

