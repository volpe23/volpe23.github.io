const choices = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    return choices[Math.floor(Math.random() * 3)].toLowerCase();
}

function playerChoice() {
    player = prompt("What do you chose?").toLowerCase()
    if (choices.includes(player)) return player;
    else return console.error("Wrong input!");
}

console.log(getComputerChoice())
function playRound(playerSelection, computerSelection) {
    const match = choices.indexOf(playerSelection) - choices.indexOf(computerSelection)
    if (match === 0) {
        console.log("Tie!");
        return 2;
    }
    let winner = (match === -2 || match === 1) ? true : false;
    if (winner) {
        console.log(`You win! ${playerSelection} beats ${computerSelection}`);
        return true;
    }
    else {
        console.log(`You lose! ${computerSelection} beats ${playerSelection}`);
        return false;
    }
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 0; i < 5; i++) {
        console.log(`Round ${i + 1}`)
        const computer = getComputerChoice();
        const player = playerChoice();
        const winner = playRound(player, computer);
        if (winner === 2) {
            console.log(`Current score - ${playerScore} : ${computerScore}`);
            continue;
        }
        winner ? playerScore++ : computerScore++;
        console.log(`Current score - ${playerScore} : ${computerScore}`);
    }
    const score = playerScore - computerScore ;
    if (score > 0) console.log("You win the game!");
    else if (score === 0) console.log("It\'s a tie!");
    else console.log("You lose! Computer wins!");
    
}