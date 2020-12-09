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
]
document.querySelector('input').max = actions.length;

function cssanimation() {
    /*
    document.querySelectorAll('p').style.fontFamily = "arial, sans-serif"

    above requires a for-loop anyway :( becomes this ->
    
    ['p', 'fontFamily', 'arial, sans-serif']
    */

    css_num = parseInt(document.querySelector('input').value);
    // the value of the slider. This is the maximum amount of rules allowed to execute

    for (i=0; i < actions.length; i++) {
        // i is now the index of the command
        action = actions[i];
        
        elements = document.querySelectorAll(action[0])
        for (x=0; x < elements.length; x++){
            // x is now the index of all the elements affected by the current rule
            element = elements[x];
            code = `style.${action[1]} = "${i<css_num ? action[2] : ''}"`
            if (x == 0 && i<css_num) {
                document.getElementsByTagName('code')[0].innerHTML = `<strong>document.querySelectorAll('${action[0]}')</strong> ` + code
            }
            eval("element."+code);
        }
    }
}
