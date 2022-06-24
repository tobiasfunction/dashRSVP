const dashRSVP = {
  playing: false,
  position: 0,
  wpm: 200,
  init: function (readerDisplay, inputText) {
    if (inputText) setText(inputText);
    if (!readerDisplay.matches("div"))
      return console.error("dashRSVP: Initialized object must be a [div]");

    this.frame = readerDisplay;
    if (this.frame.hasChildNodes()) this.frame.innerHTML = "";
    if (!!this.container) this.container.remove();
    this.playing = false;
    this.position = 0;

    this.container = newDiv("RSVP-container");

    const topBorder = newDiv("RSVP-border RSVP-border-top");
    topBorder.append(
      newDiv("RSVP-left"),
      newDiv("RSVP-notch"),
      newDiv("RSVP-right")
    );

    const wordContainer = newDiv("RSVP-word");

    const bottomBorder = newDiv("RSVP-border RSVP-border-bottom");
    bottomBorder.append(
      newDiv("RSVP-left"),
      newDiv("RSVP-notch"),
      newDiv("RSVP-right")
    );

    this.substrings = {
      left: newDiv("RSVP-left"),
      mid: newDiv("RSVP-mid"),
      right: newDiv("RSVP-right"),
    };
    wordContainer.append(
      this.substrings.left,
      this.substrings.mid,
      this.substrings.right
    );

    this.container.append(topBorder, wordContainer, bottomBorder);
    this.frame.append(this.container);

    function newDiv(className) {
      let tempDiv = document.createElement("div");
      tempDiv.className = className;
      return tempDiv;
    }
  },
  setText: function (inputText) {
    if (typeof (inputText !== "string")) {
    }
    this.textString = inputText;

    // Current delimeters:
    // - destroys one or more spaces/tabs
    // - after one or more hyphens
    // - before and after a newline, destroying other newlines in sequence
    // https://regex101.com/r/G7PwQz/1

    this.textArray = this.textString.split(
      /[ \t]+|(?<=\-+)(?!\-)|(?<=\n)\n*|(?=\n)/gm
    );
  },
  play: async function (inputText) {
    if (this.playing) return;
    if (!this.container)
      return console.error("dashRSVP: Reader has not been initialized.");
    if (!inputText && !this.textString)
      return console.log("dashRSVP: No text to display.");
    if (!!inputText && inputText !== this.textString) {
      this.setText(inputText);
      this.position = 0;
    }
    this.playing = true;

    let basePeriod = 60000 / this.wpm; // Convert words-per-minute to milliseconds-per-word
    console.log(this.textArray);

    while (this.playing && this.position < this.textArray.length) {
      let word = this.textArray[this.position];
      if (!word) word = " ";
      const pivot = Math.ceil((word.length - 1) * 0.25);

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
  pause: function () {
    this.playing = false;
  },
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
  remove: function () {
    this.container.remove();
  },
  wait: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
};
