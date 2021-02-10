function applyWordWraps() {
    const elms = document.querySelectorAll('[data-wrap]');
    for (const element of elms) {
        const wrapped = element.innerHTML.replace(/\./gm, '<wbr>.').replace(/\//gm, '<wbr>/')
        element.innerHTML = wrapped;
    }

}

applyWordWraps();