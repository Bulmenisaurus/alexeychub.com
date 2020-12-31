function generateFormLink() {
    const form = document.getElementById('card-form');
    let formData = new FormData(form)
    console.log(...formData.entries())
}