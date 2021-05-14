
const getMinecraftBlocks = async (): Promise<MinecraftBlockData> => {
    return await (await fetch('https://bulmenisaurus.github.io/assets/data/blocks.json')).json();
}

const minecraftBlocks = getMinecraftBlocks();
interface MinecraftBlockData {
    [key: string]: MinecraftBlock;
}

interface MinecraftBlock {
    name: string;
    most_similar_names: string[];
    least_similar_name: string;
}

const minecraftBlockImage = (blockname: string) => {
    const image = document.createElement('img');
    const imageSrc = `https://bulmenisaurus.github.io/assets/images/mc-blocks/${blockname}`;
    image.src = imageSrc;

    return image;
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

const createQuizQuestion = (imageUrl: string, options: string[], answer: string) => {
    const container = document.createElement('div');

    container.appendChild(minecraftBlockImage(imageUrl))

    const buttonGroup = createButtonOptions(options);

    container.appendChild(buttonGroup);

    document.body.innerHTML = '';
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
    return createQuizQuestion(blockFile, options, quizBlock.name);
}


randomQuizQuestion();