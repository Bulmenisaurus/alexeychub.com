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
    let url = generateFormLink();
    if (document.getElementById('modal-preview').style.display != 'block') document.getElementById('preview-iframe').src = url;
    document.getElementById('link-preview').innerText = url;
    document.querySelector("#copy-link-input").value = url;
};

function copyLink() {
    let copyInput = document.querySelector("#copy-link-input")

    /* Select the text field */
    copyInput.select();
    copyInput.setSelectionRange(0, 200); /* For mobile devices */

    document.execCommand('copy');
};

/* Modal section */
const modal = document.querySelector('#modal-preview');
const modalClose = document.querySelector('#close-preview');
const modalTrigger = document.querySelector('#open-preview');

modalTrigger.onclick = function () { modal.style.display = 'block' };
modalClose.onclick = function () { modal.style.display = 'none'; console.log('click clock the modal\'s done') };
document.onclick = function (e) { if (e.target == modal) { modal.style.display = 'none' } };
/* end Modal */

const updateLen = function () {
    let length = document.querySelector("#text").value.length;
    document.querySelector('#chars-left').innerHTML = `(${length}/150)`;
};

updateLen();

document.querySelector("#text").addEventListener('keyup', updateLen);
document.querySelector("#text").addEventListener('keydown', updateLen);

document.getElementById('choose-image').addEventListener('click', function chooseImage() {
    let imageUrl = prompt('Enter your image url here:', 'https://');
    if (checkImage(imageUrl)) {
        document.querySelector("#image-container > div:nth-child(2) > div > div").remove() // removes the 
        document.querySelector("#choose-image img").src = imageUrl
    } else {
        alert('')
    }


});

function checkImage(url) {
    return true;

    var image = new Image();
    image.onload = function () {
        if (this.width > 0) {
            return true;
        }
    }
    image.onerror = function () {
        return false;
    }
    image.src = url;
}