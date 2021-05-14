"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getMinecraftBlocks = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (yield fetch('https://bulmenisaurus.github.io/assets/data/blocks.json')).json();
});
const minecraftBlocks = getMinecraftBlocks();
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
    document.body.innerHTML = '';
    document.body.appendChild(container);
};
const getRandomBlock = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield minecraftBlocks;
    const blockData = yield response;
    const keys = Object.keys(blockData);
    const randomBlockName = keys[Math.floor(keys.length * Math.random())];
    const randomBlock = blockData[randomBlockName];
    return [randomBlockName, randomBlock];
});
const randomQuizQuestion = () => __awaiter(void 0, void 0, void 0, function* () {
    const [blockFile, quizBlock] = yield getRandomBlock();
    const options = [quizBlock.name, ...quizBlock.most_similar_names.slice(0, 2), quizBlock.least_similar_name];
    return createQuizQuestion(quizBlock.name, options, quizBlock.name);
});
randomQuizQuestion();
