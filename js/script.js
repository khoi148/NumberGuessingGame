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
const timeArea = document.getElementById('timeArea');
const SUCCESS_MESSAGE = "Congrats! You've guess correctly and won the game! Press Reset to try again";
const FAILURE_MESSAGE = "Boo you've run out of chances, try again...";

guessButton.addEventListener('click', guess);
resetButton.addEventListener('click', reset);
let chances = 2;
let wonGame = false;
let guessesArray = [];
chanceArea.innerHTML = `Chances: ${chances}`;


let time = 0 // time start from 0
let myTimer; // timer will be assign to this variable
let myOutTimer;// Timer to cancel the myTimer assigned to this variable
let timeOver = false;

// timecounting();// fire the timecounting function!!
// timeout();//fire the function to close the timecounting function!!!
// function timecounting() {
//     myTimer = setInterval(() => {
//         time += 1;
//         timeArea.innerHTML = time;
//     }, 1000)// every 1 second, it will add 1 into time variable (computer use millisecond so 1000 is 1 second)
// }
// function timeout() {
//     myOutTimer = setTimeout(() => {
//         clearInterval(myTimer);
//         timeOver = true;
//         ranOutOfTime();
//     }, 5100);
// }   
// function ranOutOfTime() {
//     if(wonGame === false) {
//         alert("Out of time!");
//         --chances;
//         displayChances();
//         if(chances <= 0) {
//             gameOver();
//         } else {
//             displayMessage('...');
//             userGuess.value = '';
//         }
//     }
// }






function guess() {
    //Read the value from input
    let guessValue = parseInt(userGuess.value);
    if(isNaN(guessValue)) {
        displayMessage("Please input a valid number (0-100)");
        return ;
    }
    if(guessesArray.includes(guessValue)) {
        displayMessage("You have already guessed that number. Try another one");
        return ;
    } else {
        guessesArray.push(guessValue);
        console.log(guessesArray);
    }

    console.log("num is: ", randomNum);
    reduceChance();
    if(guessValue === randomNum) {
        wonGame = true;
        gameOver();
    } else if (guessValue < randomNum) {
        displayMessage("too low");
    } else {
        displayMessage("too high");
    }
    //update previous guess section and clear guess input box
    displayPreviousGuesses(guessValue); 
    userGuess.value = ''; 
    
    if(chances <= 0) {//they loss, running out of chances
        gameOver();   
    }
}

function reduceChance() {
    --chances;
    displayChances();
}
function gameOver() {
    guessButton.disabled = true;
    if(chances <= 0 && wonGame === false)
        displayMessage(FAILURE_MESSAGE);
    else if(wonGame === true)
        displayMessage(SUCCESS_MESSAGE);
}
function reset() {
    chances = 3;
    guessButton.disabled = false;
    wonGame = false;
    displayChances();
    displayMessage('...');
    resetPreviousGuesses();
    userGuess.value = '';
    randomNum = getRandomNum();
    guessesArray.splice(0, guessesArray.length);
    console.log("new rand num is:", randomNum);
    console.log(guessesArray);
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
