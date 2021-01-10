// &h=3&t=hallo&hide=true

const urlParams = new URLSearchParams(window.location.search);
const imageId = urlParams.get('h') || '1';
const text = decodeURIComponent(urlParams.get('t')) || '';
const hideLink = decodeURIComponent(urlParams.get('hide')) || 'false';

const imageUrl = `https://alexeychub.com/images/store_${imageId}.jpg`;

const image = document.getElementById('image').appendChild(document.createElement('img'));
// = `<img src="${imageUrl}" alt="image_${hearts}">`;
image.src = imageUrl;
// image.alt = 'A fox and a bear sitting together.';
image.height = 185 * 2; image.width = 300 * 2;

gtag('event', 'view-card', {
    'event_label': imageId,
});

document.getElementById('text').innerText = text.replace(/\n/g, '<br>');
if (hideLink === 'true') {
    document.querySelector('a').remove();
}

