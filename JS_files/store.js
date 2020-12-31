// &h=3&t=hallo

const urlParams = new URLSearchParams(window.location.search);
const hearts = urlParams.get('h');
const text = urlParams.get('t');

console.log(urlParams, hearts, text)