/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

/**
 * Phrase object created when startGame() function runs
 * @param {string} phrase - ransom phrase generated from games pre written list of phrases
 */
class Phrase {
  constructor(phrase) {
    this.phrase = phrase;
  }

  /**
   * Adds letter placeholders to html to display in DOM when game starts
   * creates <li /> for each character in this.phrase
   */
  addPhraseToDisplay() {
    let html = "";
    const phraseArray = Array.from(this.phrase.toUpperCase().trim());
    phraseArray.forEach((char) => {
      // create <li /> depending if letter or space
      if (char !== " ") {
        html += `<li class="hide letter ${char}">${char}</li>`;
      } else {
        html += `<li class="space">${char}</li>`;
      }
    });
    // append html to DOM
    document.querySelector("#phrase").childNodes[1].innerHTML = html;
  }

  /**
   * Check to see if letter selected by player is included in phrase
   * @param {Object} letterInput - (e.target) of click event on qwerty letter keyboard input
   */
  checkLetter(letterInput) {
    const playerInput = letterInput.innerHTML.toUpperCase();
    return this.phrase.toUpperCase().includes(playerInput);
  }

  /**
   * Reveals the letter(s) on board that matches the player's selection
   * @param {Object} letterInput - (e.target) tile of clicked input buttons from app.js
   */
  showMatchedLetter(letterInput) {
    const phraseTiles = document.querySelectorAll(".letter");
    const playerInput = letterInput.innerHTML.toUpperCase();

    phraseTiles.forEach((tile) => {
      const tileValue = tile.innerHTML.toUpperCase();
      if (tileValue === playerInput) {
        tile.classList.remove("hide");
        tile.classList.add("show");
      }
    });
  }
}
