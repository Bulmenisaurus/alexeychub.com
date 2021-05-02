const strHash = (string, max) => {

    let hash = 0;

    if (string.length == 0) return hash;

    for (let i = 0; i < string.length; i++) {
        const char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return Math.abs(hash) % max + 1;
};


const urlHash = strHash(window.location.href, 5);
console.log(urlHash);
const messages = [
    'Well..... this is akward. A 404. Do you perhaps want some tea?',
    'Oh no! What are these weird numbers? Is it a secret code? Are aliens communicating with me? Nope, It\'s just a 404 page!',
    'Oh no! This page doesn\'t seem to exist!\nAnyway..',
    'Ouch, it looks like this page doesn\'t exist.',
    'Sadly, a 404 error occured. I wonder if you can collect the next card in the series, a 405, too.',
    'This page doesn\'t exist. Oh well!'];

document.getElementById('404-message').innerText = messages[urlHash];