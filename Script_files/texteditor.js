const textEditor = document.querySelector('canvas');
const ctx = textEditor.getContext('2d');
ctx.translate(0.5, 0.5);
ctx.imageSmoothingEnabled = false;
let canvasText = 'Hello!';
console.log('test');
const clearCanvas = () => ctx.clearRect(0, 0, textEditor.width, textEditor.height);
const handleKey = function(e, text) {
    let newText = text;
    if (e.key === 'Backspace') {
        newText = canvasText.slice(0, -1);
    }
    else if (e.key === 'Enter') {
        newText += '\n';
    }
    else if (e.key.length === 1) {
        newText += e.key;
    }
    return newText;
};
document.addEventListener('keydown', (e) => {
    canvasText = handleKey(e, canvasText);
    clearCanvas();
    ctx.font = '20px monspace';
    ctx.fillText(canvasText, 10, 100, textEditor.width - 20);
});
