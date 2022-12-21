const choices = ['rock', 'paper', 'scissors'];

let playerScore = 0;
let computerScore = 0;


function getComputerChoice() {
    return choices[Math.floor(Math.random() * 3)].toLowerCase();
}

function playerChoice(value) {
    if (choices.includes(value)) return value;
    else return console.error("Wrong input!");
}



function playRound(playerSelection, computerSelection) {
    const match = choices.indexOf(playerSelection) - choices.indexOf(computerSelection)
    if (match === 0) {
        console.log("Tie!");
        // return 2;
    }
    let winner = (match === -2 || match === 1) ? true : false;
    if (winner) {
        console.log(`You win! ${playerSelection} beats ${computerSelection}`);
        console.log(`Current score - ${playerScore} : ${computerScore}`);
        playerScore++;
        // return true;
    }
    else {
        console.log(`You lose! ${computerSelection} beats ${playerSelection}`);
        console.log(`Current score - ${playerScore} : ${computerScore}`);
        computerScore++;
        // return false;
    }
    updateScore();
    if (isWinner()) {
        start.classList.remove("show-hide");
    }
}

function newGame() {
    playerScore = 0;
    computerScore = 0;
    updateScore()
    start.classList.add("show-hide");
}
const playerScoreEl = document.querySelector("#player-score");
const computerScoreEl = document.querySelector("#computer-score");


function updateScore() {
    playerScoreEl.textContent = `${playerScore}`;
    computerScoreEl.textContent = `${computerScore}`;
    
    
}
function isWinner() {
    console.log("We have winner")
    return playerScore >= 5 || computerScore >= 5 ? true : false
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
eventsOnButtons()
newGame()