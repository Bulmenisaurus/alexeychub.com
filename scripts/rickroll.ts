document.body.dataset.rickrolled = 'false';
const video = document.getElementsByTagName('video')[0];
let videoLoaded = false;


video.addEventListener('loadeddata', () => {
    videoLoaded = true;
    document.getElementsByTagName('span')[0].innerText = 'Loading complete! Click anywhere to continue';
})

document.addEventListener('click', () => {
    if (document.body.dataset.rickrolled === 'true') { return; }

    document.body.dataset.rickrolled = 'true';

    // <video src="assets/video/video.mp4" loop autoplay muted></video>
    video.src = 'assets/video/video.mp4';
    video.loop = true;
    video.autoplay = true;
});

window.onbeforeunload = () => "";