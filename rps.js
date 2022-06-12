
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const restartButton = document.querySelector("#restart");
const gameResults = document.querySelector("#results");
const roundResult = document.querySelector("#roundResult");
const roundNumber = document.querySelector("#roundNumber");
const nrRounds = document.querySelector("#nrRounds");
const moves = document.getElementById("moves");

const game = {
    playerPoints: 0, 
    computerPoints: 0,
    round: 1,
    ended: false,
    nr_of_rounds: 5
}

rock.addEventListener("click", play);
paper.addEventListener("click", play);
scissors.addEventListener("click", play);
restartButton.addEventListener("click", restart);


function computerPlay() {
    let items = ["Rock", "Paper", "Scissors"];
    return items[Math.floor(Math.random()*items.length)];
}


function playRound(playerSelection, computerSelection) {
    const player = playerSelection.toUpperCase();
    const computer = computerSelection.toUpperCase();

    if (player == computer) {
        return "DRAW";
    }
    else if (player == "ROCK") {
        if (computer == "PAPER") return "LOSE";
        else return "WIN";
    }
    else if (player == "PAPER"){
        if (computer == "ROCK") return "WIN";
        else return "LOSE";
    }
    else {
        if (computer == "ROCK") return "LOSE";
        else return "WIN";
    }
}


function play(e) {
    if (game.ended) return;

    let roundPlayed = "";
    const playerSelection = e.target.textContent;
    const computerSelection = computerPlay();

    roundPlayed = playRound(playerSelection, computerSelection);
    if (roundPlayed == "WIN") game.playerPoints += 10;
    if (roundPlayed == "LOSE") game.computerPoints +=10;
    moves.textContent = `Computer: ${computerSelection} vs You: ${playerSelection}`;
    roundResult.textContent = `You ${roundPlayed} this round.\n`+`You got ${game.playerPoints} after this round.`;
    roundNumber.textContent = game.round;
    game.round += 1;
    if (game.round > game.nr_of_rounds) {
        game.ended =true;
        showResults(game);
    }

}


function showResults(game) {
    if (game.computerPoints > game.playerPoints)
        gameResults.textContent = "Computer wins!";
    else if (game.computerPoints == game.playerPoints)
        gameResults.textContent = "It's a draw!";
    else 
        gameResults.textContent = "You win!";
}


function restart() {
    game.playerPoints = 0;
    game.computerPoints = 0;
    game.round = 1;
    game.ended = false;
    game.nr_of_rounds = Number(nrRounds.value);
    gameResults.textContent = "";
    roundResult.textContent = "";
    roundNumber.textContent = " ";
    moves.textContent = "New game!"
}
