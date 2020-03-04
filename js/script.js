const userGuess = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const resetButton = document.getElementById('resetButton');
const startButton = document.getElementById('startButton');
const resultArea = document.getElementById('resultArea');
const chanceArea = document.getElementById('chanceArea');
const previousGuessArea = document.getElementById('previousGuessesArea');
const timeArea = document.getElementById('timeArea');
const SUCCESS_MESSAGE = "Congrats! You've guess correctly and won the game! Press Reset to try again";
const FAILURE_MESSAGE = "Boo you've run out of chances, try again...";
const GAME_TIME = 10;
guessButton.addEventListener('click', guess);//events like 'change', and 'input' are in real time constantly checking
resetButton.addEventListener('click', reset);
startButton.addEventListener('click', start);

//set random number
let randomNum = getRandomNum();
console.log("Rand num is:", randomNum);
let chances = 6;
let wonGame = false;
let guessesArray = [];
let matchHistory = [];
chanceArea.innerHTML = `Chances: ${chances}`;

let time; // time start from 0
let myTimer; // timer will be assign to this variable
let myOutTimer;// Timer to cancel the myTimer assigned to this variable
let timeOver = false;

function start() {
    time = GAME_TIME;
    startButton.disabled = true;
    resetButton.disabled = false;
    guessButton.disabled = false;
    timecounting();// fire the timecounting function!!
    timeout();//fire the function to close the timecounting function!!!
    displayTime();
}
function getRandomNum() {
    return Math.floor(Math.random()* 100 + 1);
}
function timecounting() {
    myTimer = setInterval(() => {
        time -= 1;
        displayTime();
    }, 1000)// every 1 second, it will add 1 into time variable (computer use millisecond so 1000 is 1 second)
}
function timeout() {
    myOutTimer = setTimeout(() => {
        clearInterval(myTimer);
        timeOver = true;
        ranOutOfTime();
    }, 1000*GAME_TIME + 100);
}   
function ranOutOfTime() {
    if(wonGame === false) {
        alert("Out of time!");
        --chances;
        displayChances();
    }
    if(chances <= 0) {
        gameOver();
    } else {
        displayMessage('...');
        userGuess.value = '';
        //reset timers as player are still playing
        resetTimer();
    }
}
function resetTimer() {
    //reset time and clear out old timers
    time = GAME_TIME;
    displayTime();
    clearInterval(myTimer);
    clearTimeout(myOutTimer);
    //start new timers if game is still going, else no new timers
    if(wonGame === false) {
        timecounting();
        timeout();
    }
}
function displayTime() {
    if(wonGame === true) {
        timeArea.innerHTML = `...`;
    } else if (chances <= 0) {
        timeArea.innerHTML = `...`;
    }else {
        timeArea.innerHTML = `Timer: ${time}`;
    }
}

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
    resetTimer();
    console.log("num is: ", randomNum);
    reduceChance();
    if(guessValue === randomNum) {
        wonGame = true;
        resetTimer();
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
    clearInterval(myTimer);
    clearTimeout(myOutTimer);
    displayTime();
    guessButton.disabled = true;
    if(chances <= 0 && wonGame === false) {
        displayMessage( `Your number was ${randomNum}. ` + FAILURE_MESSAGE);
        resultArea.style.color = "#FF5733";
        
    } else if(wonGame === true) {
        displayMessage(SUCCESS_MESSAGE);
        resultArea.style.color = "#03E10D";
    }
}
function reset() {
    /*
    let match = {
        round: 1,
        history: guessesArray,
    }
    matchHistory.push(match);
    let str = JSON.stringify(match);
    let historyArea = document.getElementById('historyArea');
    historyArea.innerHTML = JSON.stringify(matchHistory); */

    wonGame = false;
    resetTimer();
    chances = 5;
    guessButton.disabled = false;
    displayChances();
    displayMessage('...');
    resetPreviousGuesses();
    userGuess.value = '';
    randomNum = getRandomNum();
    guessesArray.splice(0, guessesArray.length);
    resultArea.style.color = "#000000";
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
