const listToQuery = (formData) => {
    return formData
        .map(x => `${encodeURIComponent(x[0]) || 1}=${encodeURIComponent(x[1]) || ''}`)
        .join('&');
};

function generateFormLink() {
    const form = document.getElementById('card-form');
    let formData = new FormData(form);
    formData = listToQuery([...formData.entries()]);

    const url = 'https://alexeychub.com/storeresult?' + formData;
    return url;

}

// eslint-disable-next-line no-unused-vars
function updateLink() {
    let url = generateFormLink();
    const hideLinkUrl = new URL(url);
    // Maybe I should just do url + '&hide=true'....
    hideLinkUrl.searchParams.set('hide', 'true');
    url = hideLinkUrl.toString();

    if (document.getElementById('modal-preview').style.display != 'block') document.getElementById('preview-iframe').src = url;
    document.getElementById('link-preview').innerText = url;
    document.querySelector('#copy-link-input').value = url;
}

// eslint-disable-next-line no-unused-vars
function copyLink() {
    const copyInput = document.querySelector('#copy-link-input');

    /* Select the text field */
    copyInput.select();
    copyInput.setSelectionRange(0, 200);

    document.execCommand('copy');
}

/* Modal section */
const modal = document.querySelector('#modal-preview');
const modalClose = document.querySelector('#close-preview');
const modalTrigger = document.querySelector('#open-preview');

modalTrigger.onclick = function() { modal.style.display = 'block'; };
modalClose.onclick = function() {
    modal.style.display = 'none';
    console.log('click clock the modal\'s done');
};
document.onclick = function(e) {
    if (e.target == modal) { modal.style.display = 'none'; }
};
/* end Modal */

const updateLen = function() {
    const length = document.querySelector('#text').value.length;
    document.querySelector('#chars-left').innerHTML = `(${length}/150)`;
};

updateLen();
updateLink();
modal.style.display = 'none';

document.querySelector('#text').addEventListener('keyup', updateLen);
document.querySelector('#text').addEventListener('keydown', updateLen);
/*
document.getElementById('choose-image').addEventListener('click', function chooseImage() {
    const imageUrl = prompt('Enter your image url here:', 'https://');
    if (checkImage(imageUrl)) {
        document.querySelector('#image-container > div:nth-child(2) > div > div').remove(); // removes the
        document.querySelector('#choose-image img').src = imageUrl;
    } else {
        alert('');
    }


});

function checkImage(url) {
    const image = new Image();
    if (url) return true;
    image.onload = function() {
        if (this.width > 0) {
            return true;
        }
    };
    image.onerror = function() {
        return false;
    };
    image.src = url;
}
*/
const radios = document.querySelectorAll('input[name="h"]');
for (const radioButton of radios) {
    radioButton.addEventListener('click', function() {
        const imageValue = document.querySelector('input[name="h"]:checked').value;
        document.querySelector('#text').value = {
            1: 'You are a fox',
            2: 'You are as delicate as a butterfly',
            3: 'You have a tail and I do too <3 <3 <3',
            4: 'You are my chicken and I am your rooster',
            5: 'I fly to you',
            6: 'We are dandelions (if that\'s ok with you)',
            7: 'Meow',
            8: 'I am not complete without you!',

        }[imageValue] + ' ❤️';
    });
}