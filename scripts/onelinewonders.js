/* global hljs */
const [bName, bPrev, vName, vMessage, vPrev] = ['bday-recipient', 'bday-preview', 'valentine-name', 'valentine-message', 'valentine-preview'].map((e) => document.getElementById(e));

const cleanStr = (str) => JSON.stringify(str).slice(1, -1).replace(/'/gm, '\\\'');

bName.onkeyup = function() {
    const name = cleanStr((this.value));
    document.getElementById('b-day').innerText = `Array(4).fill(["Happy birthday ","",""]).map((a,p)=>a.map((a,e)=>1==e&&2==p?"dear ${name}":1==e&&2!=p?"to you":2==e?",,!."[p]:a)).map(a=>a.join("")).concat("\\n"+"\\uD83C\\uDF81\\uD83C\\uDF89".repeat(5)).join("\\n");`;
    hljs.highlightBlock(document.getElementById('b-day'));

    // Instead of eval-ing the content, just execut the script!
    // eslint-disable-next-line
    bPrev.innerText = Array(4).fill(['Happy birthday ', '', '']).map((a, p) => a.map((a, e) => e == 1 && p == 2 ? `dear ${name}` : e == 1 && p != 2 ? 'to you' : e == 2 ? ',,!.'[p] : a)).map(a => a.join('')).concat('\n' + '\uD83C\uDF81\uD83C\uDF89'.repeat(5)).join('\n');
};

bName.onkeyup();

vName.onkeyup = vMessage.onkeyup = function() {
    const name = cleanStr(vName.value);
    const message = cleanStr(vMessage.value);

    // eslint-disable-next-line no-useless-escape
    document.getElementById('v-day').innerText = `console.log((function ____(_, __, ___) { return \`      _____           _____\\n, ad8PPPP88b,     , d88PPPP8ba, \\n d8P\"      \"Y8b, ,d8P\"      \"Y8b\\ndP'           \"8a8\"           \\\`Yd\\n8(              \"              )8\\nI8                             8I\\n Yb, \${___(_, 23)} ,dP\\n  \"8a, \${___(__, 19)} ,a8\"\\n    \"8a,                 ,a8\"\\n      \"Yba             adP\"\\n        \\\`Y8a         a8P'\\n          \\\`88,     ,88'\\n            \"8b   d8\"\\n             \"8b d8\"\\n              \\\`888'\\n                \"\`; })('${message}', '${name}', function(t, e) { const a = (e - t.length) \/ 2; return t.padStart(Math.ceil(e - a), ' ') + ' '.repeat(Math.ceil(a)) }))`;
    hljs.highlightBlock(document.getElementById('v-day'));

    // eslint-disable-next-line
    vPrev.innerText = (function ____(_, __, ___) { return `      _____           _____\n  ,ad8PPPP88b,     ,d88PPPP8ba,\n d8P"      "Y8b, ,d8P"      "Y8b\ndP'           "8a8"           \`Yd\n8(              "              )8\nI8                             8I\n Yb, ${___(_, 23)} ,dP\n  "8a, ${___(__, 19)} ,a8"\n    "8a,                 ,a8"\n      "Yba             adP"\n        \`Y8a         a8P'\n          \`88,     ,88'\n            "8b   d8"\n             "8b d8"\n              \`888'\n                "`; })(message, name, function(t, e) { const a = (e - t.length) / 2; return t.padStart(Math.ceil(e - a), ' ') + ' '.repeat(Math.ceil(a)) })
};

vName.onkeyup();