'use strict';


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);

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

const drawPieChartFromObject = (context, obj, colorsDict = {}) => {
    let arcEnd = 0;
    context.lineWidth = 2;
    context.strokeStyle = 'white';

    for (const key in obj) {
        context.beginPath();
        if (key in colorsDict) {
            context.fillStyle = colorsDict[key]['color'];
        } else {
            context.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        }
        context.moveTo(75, 75);

        context.arc(75, 75, 60, arcEnd * Math.PI * 2, (arcEnd + obj[key]) * Math.PI * 2);
        context.stroke();
        context.fill();
        arcEnd += obj[key];
    }
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

getRepositoryLanguages('Bulmenisaurus/bulmenisaurus.github.io').then((languages) => {
    const totalBytes = objectSum(languages);

    // https://buzzcoder.gitbooks.io/codecraft-javascript/content/object/iterate-over-a-dictionary.html
    // convert each number of bytes to % of total bytes
    for (const lang in languages) {
        languages[lang] = parseFloat((languages[lang] / totalBytes).toFixed(3));
    }
    getLanguageColors().then((colors) => {
        drawPieChartFromObject(ctx, languages, colors);
    });
});