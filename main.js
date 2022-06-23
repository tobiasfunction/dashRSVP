
document.getElementById("reader-init").addEventListener("click", () => dashRSVP.init(document.getElementById("reader-display")));
document.getElementById("reader-play").addEventListener("click", () => dashRSVP.play(document.getElementById("reader-text").value));
document.getElementById("reader-play-2").addEventListener("click", () => dashRSVP.play());
document.getElementById("reader-pause").addEventListener("click", () => dashRSVP.pause());