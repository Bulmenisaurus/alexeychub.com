String.prototype.hashCode = function () {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}


var message_hash = window.location.href.hashCode().toString();
console.log(message_hash);
var message_hash = parseInt(message_hash[message_hash.length - 1]);
console.log(message_hash)
messages = [
    'Ouch! Alexey\'s evil AI must\'ve deleted another site! Dangit.... <br>While I\'m busy with Mr. Poodles, have this gem: 💎',
    'Oh no! What are these weird numbers? Is it a secret code? <br>Are aliens communicating with me? o_O',
    'Well, this doesn\'t seem good. It looks like this web-page was murdered.<br>However, I, Detective. Alexey, is on the job.',
    'Beep - Boop - intiate protocol 12-01901-102932.. Spitting out random binary... <br> 1010101000111101000110001110100010101101001001',
    'Ouch, it looks like this page doesn\'t exist.<br> Well, I\'m not gonna do anythin\' about it ¯\\_(ツ)_/¯',
    'Why are you reading a 404 page? This isn\'t supposed to be fun or anything.<br> Now shooo!',
    '<a href=\'https://youtu.be/oHg5SJYRHA0\'>Definetely not a rickroll or anything....<a>',
    '...',
    'Wow. You broke my site! Amazing. <br>Now what am I gonna do!',
    'This page doesn\'t exist. Oh well!'];

document.getElementById('404_message').innerHTML = messages[message_hash]; 