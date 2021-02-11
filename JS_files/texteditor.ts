const textEditor: HTMLCanvasElement = document.querySelector('canvas');
const ctx: CanvasRenderingContext2D = textEditor.getContext('2d');

ctx.translate(0.5, 0.5);
ctx.imageSmoothingEnabled = false;

let canvasText = 'Hello! Hi! Mom! Dad!';

console.log('test');

const clearCanvas = () => ctx.clearRect(0, 0, textEditor.width, textEditor.height);

const handleKey = (e: KeyboardEvent, text: string) => {
    let newText = text;

    if (e.key === 'Backspace') {
        newText = canvasText.slice(0, -1);
    } else if (e.key === 'Enter') {
        newText += '\n'
    } else if (e.key.length === 1) {
        newText += e.key;
    }

    return newText;
}

const createLineBreaks = (text: string) => text.split('\n');


const wrap = (text: string[]) => {
    return text.map(t => (t.match(/(.{5})/g) || [t]).join('\n'));
};

const drawText = (text: string[], canvasCtx: CanvasRenderingContext2D) => {
    for (const [i, line] of text.entries()) {
        canvasCtx.fillText(line, 10, i * 20 + 20);
    }
}


document.addEventListener('keydown', (e) => {
    canvasText = handleKey(e, canvasText);

    const splitText = createLineBreaks(canvasText);

    const wrappedText = wrap(splitText);

    clearCanvas();
    ctx.font = '20px monspace';
    drawText(wrappedText, ctx);
});