document.getElementById("reader-start").addEventListener("click", startRsvp);

async function startRsvp() {
    let inputText = "One two three, four five six.";
    let readerFrame = document.getElementById("reader-frame");
    let WPM = 30;
    let basePeriod = 500; // this will eventually be calulated from WPM

    let textArray = inputText.split(" ");

    for (const word of textArray) {
        readerFrame.innerText = word;
        await wait(basePeriod);
    }
}

// Returns a Promise that resolves after "ms" Milliseconds
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))