'use strict';


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const getLanguageColors = async () => {
    if (localStorage.getItem('colors')) {
        return JSON.parse(localStorage.getItem('colors'));
    }
    const colorsRequest = await fetch('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json');
    const colors = await colorsRequest.json();

    for (const lang in colors) {
        delete colors[lang]['url'];
    }

    localStorage.setItem('colors', JSON.stringify(colors));
    return colors;
};

const getRepositoryLanguages = async (repository) => {
    /* Repository should be something like Bulmenisaurus/bulmenisaurus.github.io */
    if (localStorage.getItem(repository)) {
        return JSON.parse(localStorage.getItem(repository));
    }
    const languagesURL = `https://api.github.com/repos/${repository}/languages`;
    const languagesRequest = await fetch(languagesURL);
    const jsonResponse = await languagesRequest.json();

    localStorage.setItem(repository, JSON.stringify(jsonResponse));
    return jsonResponse;
};


/* =====
   Canvas helper functions
   ===== */

const drawPieChartFromObject = (obj, colorsDict = {}) => {
    let arcEnd = 0;

    ctx.lineWidth = 0;
    ctx.strokeStyle = 'clear';

    for (const key in obj) {
        ctx.beginPath();
        if (key in colorsDict) {
            ctx.fillStyle = colorsDict[key]['color'];
        } else {
            ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        }
        ctx.moveTo(canvasHeight / 2, canvasHeight / 2);

        ctx.arc(canvasHeight / 2, canvasHeight / 2, canvasHeight * 0.4, arcEnd * Math.PI * 2, (arcEnd + obj[key]) * Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        arcEnd += obj[key];
    }
};


const labelPieChart = (labelsObj, colorsObj) => {
    let pos = 0;
    for (const key in labelsObj) {
        labelAtPosition(key, colorsObj[key]['color'], pos);
        pos++;
    }
};

const scaleUnit = (unit, to = canvasHeight) => unit / 150 * to;

const drawLabel = (text, color, labelX, labelY) => {
    console.log({ text, color, labelX, labelY });
    /* text portion */
    ctx.font = `${Math.round(scaleUnit(12))}px sans-serif`;
    ctx.fillStyle = 'black';
    ctx.fillText(text, labelX + scaleUnit(10), labelY, canvasWidth - labelX);

    /* colored square */

    ctx.beginPath();
    ctx.lineWidth = Math.round(scaleUnit(2.5)).toString();
    ctx.strokeStyle = 'black';
    ctx.fillStyle = color;
    ctx.rect(labelX, labelY - scaleUnit(7), scaleUnit(5), scaleUnit(5));
    ctx.stroke();
    ctx.fill();
};

const labelAtPosition = (text, color, position) => {
    if (position > 5) {
        return;
    }
    drawLabel(text, color, scaleUnit(170), scaleUnit(20) * position + scaleUnit(30));
};

/* =====
   General helper functions
   ===== */

// https://stackoverflow.com/a/16449334/13996389
const objectSum = (obj) => {
    return Object.keys(obj).reduce((sum, key) => sum + parseFloat(obj[key] || 0), 0);
};


/* =====
   Main script
   ===== */

document.querySelector('input').onchange = () => {
    getRepositoryLanguages(document.querySelector('input').value.trim()).then((languages) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        const totalBytes = objectSum(languages);

        // https://buzzcoder.gitbooks.io/codecraft-javascript/content/object/iterate-over-a-dictionary.html
        // convert each number of bytes to % of total bytes
        for (const lang in languages) {
            languages[lang] = parseFloat((languages[lang] / totalBytes).toFixed(3));
        }
        getLanguageColors().then((colors) => {
            drawPieChartFromObject(languages, colors);
            labelPieChart(languages, colors);
        });
    });
};