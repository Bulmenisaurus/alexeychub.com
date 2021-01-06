String.prototype.hashCode = function(radix) {
    let hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (const char of this) {
        hash = ((hash << 5) - hash) + char;
        // Convert to 32-bit
        hash = hash & hash;
    }
    return parseInt(hash, radix);
};


let urlHash = window.location.href.hashCode(7).toString();
urlHash = parseInt(urlHash[urlHash.length - 1]);
const messages = [
    'Well..... this is akward. A 404. Do you perhaps want some tea?',
    'Oh no! What are these weird numbers? Is it a secret code? Are aliens communicating with me?<br>Nope, It\'s just a 404 page!',
    'Oh no! This page doesn\'t seem to exist!<br>Anyway..',
    'Ouch, it looks like this page doesn\'t exist.',
    'Sadly, a 404 error occured. I wonder if you can collect the next card in the series, a 405, too.',
    'This page doesn\'t exist. Oh well!'];

document.getElementById('404_message').innerHTML = messages[urlHash];