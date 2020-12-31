// &h=3&t=hallo

const urlParams = new URLSearchParams(window.location.search);
const hearts = urlParams.get('h') || '0';
const text = urlParams.get('t') || '';

const imageUrl = `https://alexeychub.com/images/store_${hearts}.jpeg`;

let image = document.getElementById('image').appendChild(document.createElement('img')) // = `<img src="${imageUrl}" alt="image_${hearts}">`;
image.src = 'images/kitty.jpeg' // imageUrl
image.alt = 'A fox and a bear sitting together.'

document.getElementById('text').innerHTML = text;

