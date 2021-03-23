const editableElementsSelector = 'p,h1,span';
const editableElements = document.querySelectorAll(editableElementsSelector);

for (const editable of editableElements) {
    editable.contentEditable = 'true';
    editable.setAttribute('spellcheck', 'false');
    console.log(editable);
}


const updateTabTitle = () => {
    const pageTitle = document.querySelector('#page-header');
    const articleTitle = document.querySelector('.article-header');

    const tabTitle = `${pageTitle.innerText} | ${articleTitle.innerText}`;
    document.querySelector('title').innerText = tabTitle.replace(/\n/gm, '');
};


const updateFooter = () => {
    document.querySelector('.newspaper-name').innerText = document.querySelector('#page-header').innerText;
};

updateFooter();


const pageTitle = document.querySelector('#page-header');
const articleTitle = document.querySelector('.article-header');

pageTitle.oninput = articleTitle.oninput = function() {
    updateTabTitle();
    updateFooter();
};