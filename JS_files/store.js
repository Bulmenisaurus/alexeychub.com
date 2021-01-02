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
    document.getElementById('preview-hyperlink').href = url;
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

document.querySelector('#copy-link').addEventListener('click', function () {
    document.querySelectorAll('.tooltip')[0].style.visibility = 'visi'
})