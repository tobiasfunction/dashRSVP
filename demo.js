const displayElement = document.getElementById("reader-display");
const readerText = document.getElementById("reader-text");

const initButton = document.getElementById("reader-init");
const playButton = document.getElementById("reader-play");
const pauseButton = document.getElementById("reader-pause");

const wpmInput = document.getElementById("reader-wpm");

playButton.setAttribute("disabled", "true");
pauseButton.setAttribute("disabled", "true");

initButton.addEventListener("click", function () {
  dashRSVP.init(displayElement);
  initButton.setAttribute("disabled", "true");
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

wpmInput.addEventListener("change", function (event) {
  dashRSVP.setWPM(event.target.value);
});

function readerPause() {
  pauseButton.setAttribute("disabled", "true");
  playButton.removeAttribute("disabled");
}
