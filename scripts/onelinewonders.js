/* global hljs */
const [bName, bPrev, vName, vMessage, vFrom] = ['bday-recipient', 'bday-preview', 'valentine-name', 'valentine-message', 'valentine-from'].map((e) => document.getElementById(e));


bName.onkeyup = function() {
    const name = this.value;
    document.getElementById('b-day').innerText = `Array(4).fill(["Happy birthday ","",""]).map((a,p)=>a.map((a,e)=>1==e&&2==p?"dear ${name}":1==e&&2!=p?"to you":2==e?",,!."[p]:a)).map(a=>a.join("")).concat("\\n"+"\\uD83C\\uDF81\\uD83C\\uDF89".repeat(5)).join("\\n");`;
    hljs.highlightBlock(document.getElementById('b-day'));
};

const center = (str, amount) => {
    const pad = (amount - str.length) / 2;
    return str.padStart(Math.ceil(amount - pad), ' ') + ' '.repeat(Math.ceil(pad));
};


console.log((function ____(_, __, ___) { return `\n      _____           _____\n  ,ad8PPPP88b,     ,d88PPPP8ba,\n d8P"      "Y8b, ,d8P"      "Y8b\ndP'           "8a8"           \`Yd\n8(              "              )8\nI8                             8I\n Yb, ${___(_, 23)} ,dP\n  "8a, ${___(__, 19)} ,a8"\n    "8a,                 ,a8"\n      "Yba             adP"\n        \`Y8a         a8P'\n          \`88,     ,88'\n            "8b   d8"\n             "8b d8"\n              \`888'\n                "\n\n\n`; })('Happy valentines day', 'mom', function(t, e) { const a = (e - t.length) / 2; return t.padStart(Math.ceil(e - a), ' ') + ' '.repeat(Math.ceil(a)) }))