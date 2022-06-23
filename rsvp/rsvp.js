const dashRSVP = {
    playing: false,
    position: 0,
    wpm: 200,
    init: function (readerDisplay, inputText) {
        if (inputText) setText(inputText);

        if (!readerDisplay.matches('div')) return console.error("dashRSVP: Initialized object must be a [div]")
        this.frame = readerDisplay;
        if (this.frame.hasChildNodes()) this.frame.innerHTML = "";
        if (!!this.container) this.container.remove();
        this.position = 0;

        this.container = newDiv("RSVP-container");

        const topBorder = newDiv("RSVP-border RSVP-border-top");
        topBorder.append(newDiv("RSVP-left"), newDiv("RSVP-notch"), newDiv("RSVP-right"));

        const wordContainer = newDiv("RSVP-word");

        const bottomBorder = newDiv("RSVP-border RSVP-border-bottom");
        bottomBorder.append(newDiv("RSVP-left"), newDiv("RSVP-notch"), newDiv("RSVP-right"));


        this.substrings = {
            left: newDiv("RSVP-left"),
            mid: newDiv("RSVP-mid"),
            right: newDiv("RSVP-right")
        }
        wordContainer.append(this.substrings.left, this.substrings.mid, this.substrings.right);

        this.container.append(topBorder, wordContainer, bottomBorder);
        this.frame.append(this.container);

        function newDiv(className) {
            let tempDiv = document.createElement("div");
            tempDiv.className = className;
            return tempDiv;
        }
    },
    setText: function (inputText) {
        if (typeof (inputText !== 'string')) {
            console
        }
        this.textString = inputText;
        this.textArray = this.textString.split(/\s+/gm);
    },
    play: async function (inputText) {
        if (this.playing) return;
        if (!this.container) return console.error("dashRSVP: Reader has not been initialized.")
        if (!inputText && !this.textString) return console.log("dashRSVP: No text to display.");
        if (!!inputText && (inputText !== this.textString)) {
            this.setText(inputText)
            this.position = 0;
        }
        this.playing = true

        let basePeriod = 60000 / this.wpm; // Convert words-per-minute to milliseconds-per-word

        while (this.playing && this.position < this.textArray.length) {
            const word = this.textArray[this.position];
            const pivot = Math.ceil((word.length - 1) * .25);

            this.substrings.left.innerText = word.substring(0, pivot);
            this.substrings.mid.innerText = word.substring(pivot, pivot + 1);
            this.substrings.right.innerText = word.substring(pivot + 1);

            await this.wait(basePeriod);
            this.position++;
        }
        if (this.position >= this.textArray.length) {
            this.playing = false;
            this.position = 0;
        }
    },
    pause: function () { this.playing = false; },
    restart: function () {
        this.position = 0;
        this.playing = false;
    },
    reset: function () {
        this.playing = false;
        this.textString = null;
        this.textArray = null;
        this.position = 0;
    },
    remove: function () { this.container.remove(); },
    wait: ms => new Promise(resolve => setTimeout(resolve, ms))
}

function addNotchDivs(parent) {
    const leftDiv = document.createElement("div")
    leftDiv.classList.add("RSVP-left")
    const notchDiv = document.createElement("div")
    notchDiv.classList.add("RSVP-notch")
    const rightDiv = document.createElement("div")
    rightDiv.classList.add("RSVP-right")

    parent.append(
        leftDiv,
        notchDiv,
        rightDiv
    )
}