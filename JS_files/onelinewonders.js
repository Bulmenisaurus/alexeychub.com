/* global hljs */
const [bName, bPrev, vName, vMessage, vFrom] = ['bday-recipient', 'bday-preview', 'valentine-name', 'valentine-message', 'valentine-from'].map((e) => document.getElementById(e));


bName.onkeyup = function() {
    const name = this.value;
    document.getElementById('b-day').innerText = `Array(4).fill(["Happy birthday ","",""]).map((a,p)=>a.map((a,e)=>1==e&&2==p?"dear ${name}":1==e&&2!=p?"to you":2==e?",,!."[p]:a)).map(a=>a.join("")).concat("\\n"+"\\uD83C\\uDF81\\uD83C\\uDF89".repeat(5)).join("\\n");`;
    hljs.highlightBlock(document.getElementById('b-day'));
};