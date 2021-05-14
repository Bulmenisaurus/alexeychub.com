"use strict";
/* Helper funcions: */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const shuffleArray = (array) => {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};
/* Displaying and generating kahoot questions: */
const getMinecraftBlocks = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (yield fetch('https://bulmenisaurus.github.io/assets/data/blocks.json')).json();
});
const minecraftBlocks = getMinecraftBlocks();
const minecraftBlockImage = (blockname) => {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container', 'js-generated');
    const image = document.createElement('img');
    const imageSrc = `https://bulmenisaurus.github.io/assets/images/mc-blocks/${blockname}`;
    image.src = imageSrc;
    image.classList.add('block-image');
    imageContainer.appendChild(image);
    return imageContainer;
};
const createButtonOptions = (options, correctAnswer) => {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('answers-container', 'js-generated');
    options.forEach((option) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('answer-option');
        buttonContainer.appendChild(button);
    });
    buttonContainer.addEventListener('click', (e) => {
        const target = e.target;
        // check if clicked on a button
        if (target.nodeName.toLowerCase() !== 'button') {
            return;
        }
        ;
        if (target.innerHTML == correctAnswer) {
            randomQuizQuestion();
        }
        else {
            console.log('wrong');
        }
    });
    return buttonContainer;
};
const createQuizQuestion = (imageUrl, options, answer) => {
    const blockImage = minecraftBlockImage(imageUrl);
    const buttonGroup = createButtonOptions(options, answer);
    document.querySelectorAll('.js-generated').forEach((e) => e.remove());
    document.body.appendChild(blockImage);
    document.body.appendChild(buttonGroup);
};
const getRandomBlock = () => __awaiter(void 0, void 0, void 0, function* () {
    const blockData = yield minecraftBlocks;
    const keys = Object.keys(blockData);
    const randomBlockName = keys[Math.floor(keys.length * Math.random())];
    const randomBlock = blockData[randomBlockName];
    return [randomBlockName, randomBlock];
});
const randomQuizQuestion = () => __awaiter(void 0, void 0, void 0, function* () {
    const [blockFile, quizBlock] = yield getRandomBlock();
    const options = [quizBlock.name, ...quizBlock.most_similar_names.slice(0, 2), quizBlock.least_similar_name];
    return createQuizQuestion(blockFile, shuffleArray(options), quizBlock.name);
});
randomQuizQuestion();
