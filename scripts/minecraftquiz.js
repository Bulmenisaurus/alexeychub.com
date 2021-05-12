const createTitle = (text) => {
    const heading = document.createElement('h1');
    heading.innerText = text;
    return heading;
};
const createButtonOptions = (options) => {
    const buttonContainer = document.createElement('div');
    for (const option of options) {
        const button = document.createElement('button');
        button.innerText = option;
        buttonContainer.appendChild(button);
    }
    return buttonContainer;
};
const createQuizQuestion = (title, options, answer) => {
    const container = document.createElement('div');
    container.appendChild(createTitle(title));
    const buttonGroup = createButtonOptions(options);
    container.appendChild(buttonGroup);

    document.body.appendChild(container);
};
createQuizQuestion('Minecraft!', ['...is lame :(', 'meh 😒', 'AWESOME!!', 'poo'], 'AWESOME!!');
