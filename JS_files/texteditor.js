const textEditor = document.querySelector('canvas');
const ctx = textEditor.getContext('2d');
ctx.translate(0.5, 0.5);
ctx.imageSmoothingEnabled = false;
let canvasText = 'Hello!';
const clearCanvas = () => ctx.clearRect(0, 0, textEditor.width, textEditor.height);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
        canvasText = canvasText.slice(0, -1);
    }
    else if (e.key.length === 1) {
        canvasText += e.key;
    }
    clearCanvas();
    ctx.font = '20px monspace';
    ctx.fillText(canvasText, 10, 100, textEditor.width - 20);
});
