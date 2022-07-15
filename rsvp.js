const dashRSVP = {
  playing: false,
  position: 0,
  wpm: 200,
  init: function (readerDisplay, inputText) {
    if (inputText) setText(inputText);
    if (typeof readerDisplay === "string")
      readerDisplay = document.getElementById(readerDisplay);
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
    // https://regex101.com/r/G7PwQz/

    this.textArray = this.textString.split(
      /[ \t]+|(?<=\-+)(?!\-)|(?<=[\n\r])[\n\r]*|(?=[\n\r])/gm
    );
  },
  play: async function (inputText) {
    // If the reader is already playing, don't change anything
    if (this.playing) return;

    // Check that the code has everything necessary to play
    let errorCount = 0;

    if (!this.container) {
      console.error("dashRSVP: Reader has not been initialized.");
      errorCount++;
    }
    if (!inputText && !this.textString) {
      console.error("dashRSVP: No text to display.");
      errorCount++;
    }
    if (inputText && inputText !== this.textString) {
      this.setText(inputText);
      this.position = 0;
    }
    this.playing = true;

    while (this.playing && this.position < this.textArray.length) {
      let word = this.textArray[this.position];
      if (!word) word = " ";
      const pivot = Math.ceil((word.length - 1) * 0.25);

      this.substrings.left.innerText = word.substring(0, pivot);
      this.substrings.mid.innerText = word.substring(pivot, pivot + 1);
      this.substrings.right.innerText = word.substring(pivot + 1);

      await this.wait(60000 / this.wpm); // Convert words-per-minute to milliseconds-per-word
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
  clearAll: function () {
    this.playing = false;
    this.position = 0;
    this.textString = null;
    this.textArray = null;
    this.frame = null;
    this.container = null;
    this.substrings = null;
  },
  setWPM: function (newWPM) {
    this.wpm = newWPM;
  },
  remove: function () {
    this.container.remove();
  },
  wait: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
};
