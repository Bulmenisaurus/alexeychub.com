// &h=3&t=hallo

const urlParams = new URLSearchParams(window.location.search);
const hearts = urlParams.get('h') || '0';
const text = urlParams.get('t') || '';

const imageUrl = `https://alexeychub.com/images/store_${hearts}.jpeg`

document.getElementById('image').innerHTML = `<img src=""${imageUrl} alt="image_${hearts}">`
document.getElementById('text').innerHTML = text

