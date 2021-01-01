const listToQuery = (formData) => {
    return formData
        .map(x => `${encodeURIComponent(x[0]) || 0}=${encodeURIComponent(x[1]) || '\'\''}`)
        .join('&');
}


function generateFormLink() {
    const form = document.getElementById('card-form');
    let formData = new FormData(form);
    formData = listToQuery([...formData.entries()]);

    let url = 'https://alexeychub.com/storeresult?' + formData
    return url

}

function updateLink() {
    url = generateFormLink()
    document.getElementById('preview-hyperlink').href = url
    document.getElementById('link-preview').innerText = url
}