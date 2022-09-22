/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [
      "the quick brown fox jumped over the lazy dogs",
      "peter piper picked a peck of pickled peppers",
      "fair shake of the sauce bottle mate",
      "and thats how the cookie crumbles",
      "javascript is a fun coding language",
      "he was a music man",
      "better late than never",
      "tell him hes dreaming",
      "hit the frog and toad"
    ];
    this.activePhrase = null;
    this.screenOverlay = document.querySelector("#overlay");
  }

  /**
   * Begin game! hide start screen overlay, call getRandomPhrase()
   * Set activePhrase to new Phrase object, also calls addPhraseToDisplay() on activePhrase
   * Resets board and lives from previous game
   */
  startGame() {
    const screenOverlay = document.querySelector("#overlay");
    screenOverlay.style.display = "none";
    this.activePhrase = new Phrase(this.getRandomPhrase(this.phrases));
    this.activePhrase.addPhraseToDisplay();
  }

  /**
   * Retrieves a random phrase from Phrase.phrases
   * @param {array} phrases - array of phrases to select from
   * @return {string} phrase to be assigned to this.activePhrase
   */
  getRandomPhrase(phrases) {
    const randomPhraseIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomPhraseIndex];
  }

  /**
   * Handles game logic.
   * @param {Object} letterInput - (e.target) tile of clicked input buttons from app.js
   * Directs game logic based on correct/incorrect guess
   * First disables letterInput button
   * If phrase does not include letterInput letter, add .wrong css class to letterInput and call removeLife()
   * Else add .chosen css class to letterInput, call showMatchedLetter() on phrase and checkForWin() ? gameOver() : '';
   */
  handleInteraction(letterInput) {
    letterInput.disabled = true;

    if (this.activePhrase.checkLetter(letterInput)) {
      letterInput.classList.add("chosen");
      this.activePhrase.showMatchedLetter(letterInput);
      this.checkForWin();
      if (this.checkForWin()) {
        this.gameOver();
      }
    } else {
      letterInput.classList.add("wrong");
      this.removeLife();
    }
  }

  /**
   * Removes life from scoreboard.
   * replaces a liveHeart.png with a lostHeart.png, achieved by using this.missed as the index for what <li /> to change image
   * If player looses 5 lives, calls gameOver()
   */
  removeLife() {
    const scoreBoard = document.querySelector("#scoreboard");
    const liveArray = scoreBoard.firstElementChild.querySelectorAll(".tries");

    // stop game running if player keyboard inputs after game over
    if (this.missed >= 5) {
      return;
    } else {
      liveArray[this.missed].firstElementChild.src = "images/lostHeart.png";
      this.missed += 1;
      if (this.missed === 5) {
        this.gameOver();
      }
    }
  }

  /**
   * Check win conditions (player revealed all letters in active phrase)
   * Filter array of tiles by how many are still hidden, if 0 then win condition met
   */
  checkForWin() {
    const phraseTiles = document.querySelectorAll(".letter");
    const phraseTilesArray = Array.from(phraseTiles);
    const tilesHidden = phraseTilesArray.filter((tile) =>
      tile.classList.contains("hide")
    );
    return tilesHidden.length === 0 ? true : false;
  }

  /**
   * Reset input function to reset player input and live images
   */
  resetBoard() {
    const liveArray = Array.from(document.querySelectorAll(".tries"));
    const letterInputs = document.querySelectorAll(".key");

    liveArray.forEach((live) => {
      live.firstElementChild.src = "images/liveHeart.png";
    });
    letterInputs.forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove("chosen");
      btn.classList.remove("wrong");
    });

    this.missed = 0;
    const screenOverlay = document.querySelector("#overlay");
  }

  /**
   * Displays original start screen overlay, with winning or loosing message based on game outcome
   */
  gameOver() {
    const gameMessage = this.screenOverlay.querySelector("#game-over-message");
    this.screenOverlay.style.display = "";

    if (this.missed < 5) {
      gameMessage.innerHTML = "Congragulations, you won!";
      this.screenOverlay.classList.remove("start");
      this.screenOverlay.classList.remove("lose");
      this.screenOverlay.classList.add("win");
    } else {
      gameMessage.innerHTML = "Bad luck! Try again?";
      this.screenOverlay.classList.remove("start");
      this.screenOverlay.classList.remove("win");
      this.screenOverlay.classList.add("lose");
    }
  }
}
