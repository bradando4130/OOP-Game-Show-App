/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

// new instance of Game class
let game = new Game();

/**
 * Begin game on click of 'Start Game' button
 * Reset board from previous game
 * Create new Game object and call startGame()
 */
const startButton = document.querySelector("#btn__reset");

startButton.addEventListener("click", () => {
  game = new Game();
  game.resetBoard();
  game.startGame();
});

/**
 * Listen for click on qwerty key section
 * @param {Object} e - click event object
 * if click event object is letter button, pass that value to game.handleInteraction()
 */
const inputTiles = document.querySelector("#qwerty");
inputTiles.addEventListener("click", (e) => {
  if (e.target.classList.contains("key")) {
    game.handleInteraction(e.target);
  }
});

/**
 * Listen for keyboard input, translate that to corresponding letter on key
 * @param {Object} e - keydown event object
 * copnvert keydown event into qwerty button input for simplicity with rest of codebase
 * pass to handleInteraction() as letterInput
 */
document.addEventListener("keydown", (e) => {
  const regex = /^[a-z]$/;

  // block input from registering if game is won or if no active phrase
  if (game.activePhrase === null || game.checkForWin()) {
    return;
  } else if (regex.test(e.key)) {
    const qwertyArray = Array.from(document.querySelectorAll(".key"));
    const letterInput = qwertyArray.filter((btn) => btn.innerHTML === e.key);
    game.handleInteraction(letterInput[0]);
  }
});
