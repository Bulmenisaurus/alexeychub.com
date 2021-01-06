document.querySelector('input').addEventListener('input', cssanimation);

const actions = [
    ['p', 'margin', '20px'],
    ['code', 'padding', '0px 3px'],
    ['h1', 'textAlign', 'center'],
    ['p', 'fontFamily', 'arial, sans-serif'],
    ['#last-rule', 'textAlign', 'center'],
    ['h1', 'fontFamily', 'arial, sans-serif'],
    ['code', 'fontFamily', 'courier, monospace;'],
    ['code', 'backgroundColor', '#eee'],
    ['h1', 'fontSize', '5vw'],
    ['h1', 'marginBottom', '0'],
    ['code', 'borderRadius', '3px'],
];
document.querySelector('input').max = actions.length;

function cssanimation() {
    /*
    document.querySelectorAll('p').style.fontFamily = "arial, sans-serif"

    above requires a for-loop anyway :( becomes this ->

    ['p', 'fontFamily', 'arial, sans-serif']
    */

    const cssActiveRules = parseInt(document.querySelector('input').value);
    // the value of the slider. This is the maximum amount of rules allowed to execute


    for (const [styleNum, style] of actions.entries()) {

        // since we only care if the cssrule is active, the for-loop can be ignored once the rule threshold is reached
        if (styleNum < cssActiveRules) {
            break;
        }

        const elementsAffected = document.querySelectorAll(style[0]);
        for (const [x, element] of elementsAffected.entries()) {

            if (!x) {
                document.getElementsByTagName('code')[0].innerHTML = `<strong>document.querySelectorAll('${style[0]}')</strong> style.${style[1]} = ${style[2]}`;
            }

            element.style[style[1]] = style[2];
        }
    }
}
