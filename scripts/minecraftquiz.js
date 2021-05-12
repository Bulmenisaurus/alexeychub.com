const getMinercaftBlocks = async () => {
    return await (await fetch('https://bulmenisaurus.github.io/assets/data/blocks.json')).json();
};
const minecraftBlocks = getMinercaftBlocks();
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
    console.trace({ title, options, answer });
    const container = document.createElement('div');
    container.appendChild(createTitle(title));
    const buttonGroup = createButtonOptions(options);
    container.appendChild(buttonGroup);
    document.body.appendChild(container);
};
const getRandomBlock = async () => {
    const response = await minecraftBlocks;
    const blockData = await response;
    const keys = Object.keys(blockData);
    const randomBlockName = keys[Math.floor(keys.length * Math.random())];
    const randomBlock = blockData[randomBlockName];
    return [randomBlockName, randomBlock];
};
const randomQuizQuestion = async () => {
    const [blockFile, quizBlock] = await getRandomBlock();
    const options = [quizBlock.name, ...quizBlock.most_similar_names.slice(0, 2), quizBlock.least_similar_name];
    return createQuizQuestion(quizBlock.name, options, quizBlock.name);
};
document.onclick = randomQuizQuestion;
