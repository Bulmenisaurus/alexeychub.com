// &h=3&t=hallo

const urlParams = new URLSearchParams(window.location.search);
const imageId = urlParams.get('h') || '0';
const text = decodeURIComponent(urlParams.get('t') || '');

const imageUrl = `https://alexeychub.com/images/store_${imageId}.jpg`;

let image = document.getElementById('image').appendChild(document.createElement('img')); // = `<img src="${imageUrl}" alt="image_${hearts}">`;
image.src = imageUrl; // imageUrl
//image.alt = 'A fox and a bear sitting together.';
image.height = 185 * 2; image.width = 300 * 2;

gtag('event', 'view-card', {
    'event_label': imageId,
});


document.getElementById('text').innerHTML = text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, '<br>');

