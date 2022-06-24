const displayElement = document.getElementById("reader-display");
const readerText = document.getElementById("reader-text");

const initButton = document.getElementById("reader-init");
const playButton = document.getElementById("reader-play");
const pauseButton = document.getElementById("reader-pause");

initButton.addEventListener("click", function () {
  dashRSVP.init(displayElement);
  readerPause();
});

playButton.addEventListener("click", async function () {
  pauseButton.removeAttribute("disabled");
  playButton.setAttribute("disabled", "true");

  await dashRSVP.play(readerText.value).then(() => readerPause());
});

pauseButton.addEventListener("click", function () {
  dashRSVP.pause();
  readerPause();
});

function readerPause() {
  pauseButton.setAttribute("disabled", "true");
  playButton.removeAttribute("disabled");
}
