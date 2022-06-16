document.getElementById("reader-start").addEventListener("click", startRsvp);

async function startRsvp() {
    let inputText = "One two three, four five six.";
    let readerFrame = document.getElementById("reader-frame");
    let WPM = 30;
    let basePeriod = 500; // this will eventually be calulated from WPM

    const pre = document.querySelector("#pre-text");
    const anchor = document.querySelector("#anchor-text");
    const post = document.querySelector("#post-text");

    let textArray = inputText.split(" ");

    for (const word of textArray) {
        const substrings = getSubstrings(word);
        pre.innerText = substrings[0]
        anchor.innerText = substrings[1]
        post.innerText = substrings[2]

        await wait(basePeriod);
    }
}

function getSubstrings(word) {
    const pivot = Math.floor((word.length) * .3);
    const left = word.substring(0, pivot);
    const middle = word.substring(pivot, pivot + 1);
    const right = word.substring(pivot + 1);

    return [left, middle, right]
}

// Returns a Promise that resolves after "ms" Milliseconds
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))