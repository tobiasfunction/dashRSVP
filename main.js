
const displayElement = document.getElementById("reader-display");
const readerText = document.getElementById("reader-text").value;

document
    .getElementById("reader-init")
    .addEventListener("click", () => dashRSVP.init(displayElement));
document
    .getElementById("reader-play")
    .addEventListener("click", () => dashRSVP.play(readerText));
document
    .getElementById("reader-play-2")
    .addEventListener("click", () => dashRSVP.play());
document
    .getElementById("reader-pause")
    .addEventListener("click", () => dashRSVP.pause());