const listToQuery = (formData) => {
    return formData
        .map(x => `${encodeURIComponent(x[0]) || 1}=${encodeURIComponent(x[1]) || ''}`)
        .join('&');
};

function generateFormLink() {
    const form = document.getElementById('card-form');
    let formData = new FormData(form);
    formData = listToQuery([...formData.entries()]);

    let url = 'https://alexeychub.com/storeresult?' + formData;
    return url;

};

function updateLink() {
    url = generateFormLink()
    if (document.getElementById('modal-preview').style.display != 'block') document.getElementById('preview-iframe').src = url;
    document.getElementById('link-preview').innerText = url;
    document.querySelector("#copy-link-input").value = url;
};

function copyLink() {
    copyInput = document.querySelector("#copy-link-input")

    /* Select the text field */
    copyInput.select();
    copyInput.setSelectionRange(0, 200); /* For mobile devices */

    document.execCommand('copy');
};

const modal = document.querySelector('#modal-preview')
const modalClose = document.querySelector('#close-preview')
const modalTrigger = document.querySelector('#open-preview')

modalTrigger.onclick = function () { modal.style.display = 'block' }
modalClose.onclick = function () { modal.style.display = 'none'; console.log('click clock the modal\'s done') }
document.onclick = function (e) { if (e.target == modal) { modal.style.display = 'none' } }