const choices = ['rock', 'paper', 'scissors'];

let playerScore = 0;
let computerScore = 0;
const showChoices = document.querySelector("#showChoices");
const showResult = document.querySelector("#showResult");

function getComputerChoice() {
    return choices[Math.floor(Math.random() * 3)].toLowerCase();
}

function playerChoice(value) {
    if (choices.includes(value)) return value;
    else return console.error("Wrong input!");
}

function playRound(playerSelection, computerSelection) {
    const match = choices.indexOf(playerSelection) - choices.indexOf(computerSelection)
    showChoices.textContent = `${playerSelection} vs ${computerSelection}`
    let winner = (match === -2 || match === 1) ? true : false;
    if (match === 0) {
        showResult.textContent = "Tie!";
    }
    else if (winner) {
        const firstLetter = playerSelection.charAt(0).toUpperCase()
        const remainingLetters = playerSelection.slice(1)
        showResult.textContent = `You win! ${firstLetter + remainingLetters} beats ${computerSelection}`;
        playerScore++;
    }
    else {
        const firstLetter = computerSelection.charAt(0).toUpperCase()
        const remainingLetters = computerSelection.slice(1)
        showResult.textContent = `You lose! ${firstLetter + remainingLetters} beats ${playerSelection}`;
        computerScore++;
    }

    updateScore();
    if (isWinner()) {
        showResult.textContent = `${isWinner()} wins!`;
        showResult.style.fontSize = "4em";
        start.textContent = "Play again?";
        start.classList.remove("show-hide");
        console.log("We have a winner");
    }
}

function newGame() {
    playerScore = 0;
    computerScore = 0;
    updateScore()
    start.classList.add("show-hide");

    

    showChoices.classList.add("fall-animation");
    showResult.classList.add("expand-animation");

    showChoices.textContent = "Game started!";
    showResult.textContent = "pick your choice";
    
    showResult.style.fontSize = "2em";
    if (start.textContent === "start") eventsOnButtons()

    
}
const playerScoreEl = document.querySelector("#player-score");
const computerScoreEl = document.querySelector("#computer-score");

function updateScore() {
    playerScoreEl.textContent = `${playerScore}`;
    computerScoreEl.textContent = `${computerScore}`;
}

function isWinner() {
    showChoices.classList.remove("fall-animation");
    showResult.classList.remove("expand-animation");
    if (playerScore >= 5) return 'Player'
    else if (computerScore >= 5) return 'Computer'
    return false
}

function eventsOnButtons() {
    buttons = document.querySelectorAll(".btn");
    buttons.forEach(el => {
        el.addEventListener('click', () => {
            isWinner() ?  console.log("Start new game") : playRound(el.value, getComputerChoice())
        })
    });
}

start = document.querySelector("#start");
start.addEventListener('click', newGame)