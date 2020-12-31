const formDataToQuery = (formData) => {
    [...formData.entries()]
        .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
        .join('&');
}


function generateFormLink() {
    const form = document.getElementById('card-form');
    let formData = new FormData(form);
    formData = formDataToQuery(formData);

    console.log(formData);
}