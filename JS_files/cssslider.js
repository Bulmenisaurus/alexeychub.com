document.querySelector('input').addEventListener('input', cssanimation);
document.querySelector('input').value = 0;
console.log('bam');

// ! YOINKED: https://gist.github.com/nblackburn/875e6ff75bc8ce171c758bf75f304707
const camelCaseToKebabCase = (camelCase) => { return camelCase.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(); };

const actions = [
    // ['target, 'style', 'value']
    ['.text-container', 'margin', '30px auto'],
    ['main', 'padding', '20px'],
    ['code', 'padding', '3px 5px'],
    ['h1', 'textAlign', 'center'],
    ['body', 'fontFamily', 'arial, sans-serif'],
    ['#last-rule', 'textAlign', 'center'],
    ['code', 'fontFamily', 'courier, monospace;'],
    ['pre code', 'display', 'block'],
    ['code', 'backgroundColor', '#eee'],
    ['h1', 'fontSize', '5vw'],
    ['h1', 'marginBottom', '0'],
    ['code', 'borderRadius', '3px'],
    ['p', 'lineHeight', '150%'],
    ['#label', 'fontWeight', 'bold'],
    ['#label', 'textTransform', 'uppercase'],
    ['#label', 'fontSize', '13px'],
    ['body', 'color', 'rgba(0, 0, 0, 0.8)'],
    ['kbd', 'display', 'inline-block'],
    ['kbd', 'margin', '0 .1em'],
    ['kbd', 'padding', '.1em .6em'],
    ['kbd', 'fontSize', '11px'],
    ['kbd', 'lineHeight', '16.5px'],
    ['kbd', 'color', 'rgb(36, 39, 41)'],
    ['kbd', 'backgroundColor', 'rgb(228, 230, 232)'],
    ['kbd', 'textShadow', '0 1px 0 white'],
    ['kbd', 'border', '1px solid rgb(159, 166, 173)'],
    ['kbd', 'borderRadius', '3px'],
    ['kbd', 'boxShadow', '0 1px 1px rgba(12, 13, 14, 0.15), inset 0 1px 0 0 #fff'],
    ['kbd', 'overflow-wrap', 'break-word'],
];
document.querySelector('input').max = actions.length;

function clearStyles() {
    for (const styleRule of actions) {
        for (const element of document.querySelectorAll(styleRule[0])) {
            element.style[styleRule[1]] = '';
        }
    }
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

        const elementsAffected = document.querySelectorAll(style[0]);
        for (const [x, element] of elementsAffected.entries()) {

            if (!x) {
                document.getElementsByTagName('code')[0].innerHTML = `<strong>${camelCaseToKebabCase(style[0])}</strong> {${style[1]}: ${style[2]}}`;
            }

            element.style[style[1]] = style[2];
        }
    }
}
