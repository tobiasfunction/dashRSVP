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

        this.container = document.createElement("div");
        this.container.classList.add("RSVP-container");

        const topBorder = document.createElement("div")
        topBorder.classList.add("RSVP-border", "RSVP-border-top")
        topBorder.innerHTML = `
            <div class="RSVP-left"></div>
            <div class="RSVP-notch"></div>
            <div class="RSVP-right"></div>
            `

        const bottomBorder = document.createElement("div")
        bottomBorder.classList.add("RSVP-border", "RSVP-border-bottom")
        bottomBorder.innerHTML = `
            <div class="RSVP-left"></div>
            <div class="RSVP-notch"></div>
            <div class="RSVP-right"></div>
            `
        const wordContainer = document.createElement("div");
        wordContainer.classList.add("RSVP-word")

        this.substrings = {
            left: document.createElement("div"),
            mid: document.createElement("div"),
            right: document.createElement("div")
        }
        this.substrings.left.classList.add("RSVP-left");
        this.substrings.mid.classList.add("RSVP-mid");
        this.substrings.right.classList.add("RSVP-right");

        wordContainer.append(this.substrings.left, this.substrings.mid, this.substrings.right);

        this.container.append(topBorder, wordContainer, bottomBorder);
        this.frame.append(this.container);
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
    restart: function () { this.position = 0 },
    reset: function () {
        this.playing = false;
        this.textString = null;
        this.textArray = null;
        this.position = 0;
    },
    remove: function () { this.container.remove(); },
    wait: ms => new Promise(resolve => setTimeout(resolve, ms))
}