/* global gtag */
// &h=3&t=hallo&hide=true

const urlParams = new URLSearchParams(window.location.search);
const imageId = urlParams.get('h') || '1';
let text = decodeURIComponent(urlParams.get('t'));

// decodeUriComponent converts null to "null" for some reason
if (text === 'null') {
    text = 'Happy valentines day!';
}
const hideLink = decodeURIComponent(urlParams.get('hide')) || 'false';
gtag('event', 'view-card', {
    'event_label': imageId,
});

document.getElementById('text').innerText = text.replace(/\n/g, '<br>');
if (hideLink === 'true') {
    document.querySelector('a').remove();
}
if (imageId != '9') {
    const imageUrl = `https://bulmenisaurus.github.io/images/store_${imageId}.jpg`;

    const image = document.getElementById('image').appendChild(document.createElement('img'));
    // = `<img src="${imageUrl}" alt="image_${hearts}">`;
    image.src = imageUrl;
    // image.alt = 'A fox and a bear sitting together.';
    image.height = 185 * 2; image.width = 300 * 2;


} else if (imageId === '9') {
    const js = document.createElement('script');
    js.src = 'JS_files/store.snake.js';
    document.head.appendChild(js);

    const canvas = document.getElementById('image').appendChild(document.createElement('canvas'));
    canvas.height = canvas.width = '400';

}
