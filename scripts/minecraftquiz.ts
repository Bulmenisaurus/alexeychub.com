/* Helper funcions: */

const shuffleArray = <T>(array: T[]) => {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

/* Displaying and generating kahoot questions: */

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

const minecraftBlockImage = (blockname: string, imageAlt: string) => {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container', 'js-generated')

    const image = document.createElement('img');
    const imageSrc = `https://bulmenisaurus.github.io/assets/images/mc-blocks/${blockname}`;
    image.src = imageSrc;
    image.classList.add('block-image');

    imageContainer.appendChild(image);
    image.alt = `picture of a minecraft ${imageAlt}`;

    return imageContainer;
};


const createButtonOptions = (options: string[], correctAnswer: string) => {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('answers-container', 'js-generated');

    options.forEach((option) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('answer-option');
        buttonContainer.appendChild(button);
    })

    buttonContainer.addEventListener('click', (e) => {
        const target = <HTMLElement>e.target;

        // check if clicked on a button
        if (target.nodeName.toLowerCase() !== 'button') { return; };

        if (target.innerHTML == correctAnswer) {
            randomQuizQuestion();
        } else {
            console.log('wrong');
        }
    });

    return buttonContainer;
};

const createQuizQuestion = (imageUrl: string, options: string[], answer: string) => {

    const blockImage = minecraftBlockImage(imageUrl, answer);
    const buttonGroup = createButtonOptions(options, answer);

    document.querySelectorAll('.js-generated').forEach((e) => e.remove());

    document.body.appendChild(blockImage);
    document.body.appendChild(buttonGroup);

};

const getRandomBlock = async (): Promise<[string, MinecraftBlock]> => {
    const blockData = <MinecraftBlockData>await minecraftBlocks;
    const keys = Object.keys(blockData);

    const randomBlockName = keys[Math.floor(keys.length * Math.random())]
    const randomBlock = blockData[randomBlockName];

    return [randomBlockName, randomBlock];
};

const randomQuizQuestion = async () => {
    const [blockFile, quizBlock] = await getRandomBlock();
    const options = [quizBlock.name, ...quizBlock.most_similar_names.slice(0, 2), quizBlock.least_similar_name];

    return createQuizQuestion(blockFile, shuffleArray(options), quizBlock.name);
}


randomQuizQuestion();