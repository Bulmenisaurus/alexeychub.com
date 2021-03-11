'use strict';

document.querySelector('input').addEventListener('input', cssanimation);
document.querySelector('input').value = 0;

const actions = [
    // ['target, 'style', 'value']
    ['body', 'padding', '0'],
    ['body', 'margin', '0'],
    ['h2', 'display', 'inline-block'],
    ['header, footer', 'height', '80px'],
    ['main', 'padding', '20px'],
    ['main', 'margin-bottom', '80px'],
    ['footer', 'width', '100%'],
    ['footer', 'background-color', '#212121'],
    ['footer', 'position', 'fixed'],
    ['footer', 'bottom', '0px'],
    ['footer', 'color', 'white'],
    ['code', 'padding', '3px 5px'],
    ['h1', 'text-align', 'center'],
    ['body', 'font-family', 'arial, sans-serif'],
    ['#last-rule', 'text-align', 'center'],
    ['pre code', 'display', 'block'],
    ['code', 'background-color', '#eee'],
    ['h1', 'font-size', 'max(30px, 5vw)'],
    ['h1', 'margin-bottom', '0'],
    ['.left-right-container', 'display', 'flex'],
    ['.left-right-container', 'align-items', 'baseline'],
    ['.left, .right', 'flex', '1'],
    ['.left', 'text-align', 'right'],
    ['.right', 'text-align', 'left'],
    ['.right', 'margin-left', '10px'],
    ['code', 'border-radius', '3px'],
    ['p', 'line-height', '150%'],
    ['#label', 'font-weight', 'bold'],
    ['#label', 'text-transform', 'uppercase'],
    ['#label', 'font-size', '13px'],
    ['body', 'color', 'rgba(0, 0, 0, 0.8)'],
    ['kbd', 'display', 'inline-block'],
    ['kbd', 'margin', '0 .1em'],
    ['kbd', 'padding', '.1em .6em'],
    ['kbd', 'font-size', '11px'],
    ['kbd', 'line-seight', '16.5px'],
    ['kbd', 'color', 'rgb(36, 39, 41)'],
    ['kbd', 'background-color', 'rgb(228, 230, 232)'],
    ['kbd', 'text-shadow', '0 1px 0 white'],
    ['kbd', 'border', '1px solid rgb(159, 166, 173)'],
    ['kbd', 'border-radius', '3px'],
    ['kbd', 'box-shadow', '0 1px 1px rgba(12, 13, 14, 0.15), inset 0 1px 0 0 #fff'],
    ['kbd', 'overflow-wrap', 'break-word'],
    ['summary', 'outline', 'none'],
    ['summary', 'user-select', 'none'],
    ['summary', 'outline', 'none'],
    ['footer', 'display', 'flex'],
    ['footer', 'justify-content', 'center'],
    ['footer', 'align-items', 'center'],
    ['pre > code', 'padding', '1em 1.5em'],
];
document.querySelector('input').max = actions.length;

function clearStyles() {
    document.querySelectorAll('[style]')
        .forEach(el => el.removeAttribute('style'));
}


function cssanimation() {
    /*
    document.querySelectorAll('p').style.fontFamily = "arial, sans-serif"

    above requires a for-loop anyway :( becomes this ->

    ['p', 'fontFamily', 'arial, sans-serif']
    */

    const cssActiveRules = parseInt(document.querySelector('input').value - 1);
    // the value of the slider. This is the maximum amount of rules allowed to execute

    clearStyles();
    for (const [styleNum, style] of actions.entries()) {
        // since we only care if the cssrule is active, the for-loop can be ignored once the rule threshold is reached
        if (styleNum > cssActiveRules) {
            continue;
        }

        document.getElementsByTagName('code')[0].innerHTML = `<strong>${style[0]}</strong> {${style[1]}: ${style[2]}}`;
        const elementsAffected = document.querySelectorAll(style[0]);
        elementsAffected.forEach(el => el.style[style[1]] = style[2]);
    }
}
