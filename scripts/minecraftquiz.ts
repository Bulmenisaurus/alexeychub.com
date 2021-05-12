

const createTitle = (text: string) => {
    const heading = document.createElement('h1');
    heading.innerText = text;

    return heading;
};


const createButtonOptions = (options: string[]) => {
    const buttonContainer = document.createElement('div');

    for (const option in options) {
        const button = document.createElement('button');
        button.innerText = option;

        buttonContainer.appendChild(button);
    }

    return buttonContainer;
};

const createQuizQuestion = (title: string, options: string[], answer: string) => {
    const container = document.createElement('div');

    container.appendChild(createTitle(title))

    const buttonGroup = createButtonOptions(options);

    container.appendChild(buttonGroup);
};

createQuizQuestion('Minecraft!', ['...is lame :(', 'meh 😒', 'AWESOME!!', 'poo'], 'AWESOME!!');