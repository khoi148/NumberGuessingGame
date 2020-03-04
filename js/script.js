//set random number
let randomNum = getRandomNum();
function getRandomNum() {
    return Math.floor(Math.random()* 100 + 1);
}

console.log("Rand num is:", randomNum);

//input box and guess button
const userGuess = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const resetButton = document.getElementById('resetButton');
const resultArea = document.getElementById('resultArea');
const chanceArea = document.getElementById('chanceArea');
const previousGuessArea = document.getElementById('previousGuessesArea');
guessButton.addEventListener('click', guess);
resetButton.addEventListener('click', reset);
let chances = 3;
let finishedGame = false;
chanceArea.innerHTML = `Chances: ${chances}`;


function guess() {
    //Read the value from input
    let guessValue = parseInt(userGuess.value);
    if(isNaN(guessValue)) {
        displayMessage("Please input a valid number (0-100)");
        return ;
    }
    console.log("num is: ", randomNum);
    if(guessValue === randomNum) {
        displayMessage("yeah~~~ correct!!! smart!!");
        reduceChance();
        finishedGame = true;
    } else if (guessValue < randomNum) {
        displayMessage("too low");
        reduceChance();
    } else {
        displayMessage("too high");
        reduceChance();
    }
    //update previous guess section and clear guess input box
    displayPreviousGuesses(guessValue); 
    userGuess.value = '';
    
    if(chances <= 0 && finishedGame === true) {//they loss, running out of chances
        gameOver();
    } else if(chances <= 0) {//they loss, running out of chances
        gameOver();
        displayMessage("No more chances, you loss! Press reset to try again.");
    }
}

function reduceChance() {
    --chances;
    displayChances();
}
function gameOver() {
    guessButton.disabled = true;
    finishedGame = true;
}
function reset() {
    chances = 3;
    guessButton.disabled = false;
    finishedGame = false;
    displayChances();
    displayMessage('...');
    resetPreviousGuesses();
    userGuess.value = '';
    randomNum = getRandomNum();
    console.log("new rand num is:", randomNum);
}
function displayChances() {
    chanceArea.innerHTML = `Chances: ${chances}`;
}
function displayMessage(message) {
    resultArea.innerHTML = `${message}`;
}
function displayPreviousGuesses(guess) {
        previousGuessArea.innerHTML += ` ${guess}`;
}
function resetPreviousGuesses() {
    previousGuessArea.innerHTML = 'Previous Guesses:';
}
