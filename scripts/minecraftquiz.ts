
const getMinercaftBlocks = async (): Promise<MinecraftBlockData> => {
    return await (await fetch('https://bulmenisaurus.github.io/assets/data/blocks.json')).json();
}

const minecraftBlocks = getMinercaftBlocks();
interface MinecraftBlockData {
    [key: string]: MinecraftBlock;
}

interface MinecraftBlock {
    name: string;
    most_similar_names: string[];
    least_similar_name: string;
}

const createTitle = (text: string) => {
    const heading = document.createElement('h1');
    heading.innerText = text;

    return heading;
};


const createButtonOptions = (options: string[]) => {
    const buttonContainer = document.createElement('div');

    for (const option of options) {
        const button = document.createElement('button');
        button.innerText = option;

        buttonContainer.appendChild(button);
    }

    return buttonContainer;
};

const createQuizQuestion = (title: string, options: string[], answer: string) => {
    console.trace({ title, options, answer });
    const container = document.createElement('div');

    container.appendChild(createTitle(title))

    const buttonGroup = createButtonOptions(options);

    container.appendChild(buttonGroup);

    document.body.appendChild(container);
};

const getRandomBlock = async (): Promise<[string, MinecraftBlock]> => {
    const response = await minecraftBlocks;
    const blockData = <MinecraftBlockData>await response;
    const keys = Object.keys(blockData);

    const randomBlockName = keys[Math.floor(keys.length * Math.random())]
    const randomBlock = blockData[randomBlockName];

    return [randomBlockName, randomBlock];
};

const randomQuizQuestion = async () => {
    const [blockFile, quizBlock] = await getRandomBlock();

    const options = [quizBlock.name, ...quizBlock.most_similar_names.slice(0, 2), quizBlock.least_similar_name];
    return createQuizQuestion(quizBlock.name, options, quizBlock.name);
}

document.onclick = randomQuizQuestion;