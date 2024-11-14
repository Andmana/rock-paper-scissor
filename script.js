const choices = ["rock", "paper", "scissors"];
const choices2 = ["✊🏿", "🖐🏻", "✌🏼"];
let computers = 0;
let players = 0;

const playerScore = document.getElementById("PlayerScore");
const compScore = document.getElementById("CompScore");
const play = document.querySelector("#Play");
const buttons = document.querySelectorAll(".selection");
const playerSelection = document.getElementById("PlayerSelection");
const compSelection = document.getElementById("CompSelection");
const roundsResult = document.getElementById("RoundsResult");
const roundsLog = document.getElementById("RoundsLog");
const gameOver = document.getElementById("GameOver");
const gameResult = document.getElementById("GameResult");

let scores = () => {
    playerScore.textContent = players;
    compScore.textContent = computers;
};

play.addEventListener("click", () => {
    const text = play.textContent;
    if (text == "Start Game") {
        computers = 0;
        players = 0;
        scores();
        play.textContent = "Stop Game";
        disabledAction(false);
        gameOver.textContent = "";
        gameResult.textContent = "";
    } else {
        play.textContent = "Start Game";
        disabledAction(true);
    }
});

function getComputerChoice() {
    let choiceIdx = Math.floor(Math.random() * choices.length);
    return choiceIdx;
}

function rpsLogic(playerChoice, comChoice) {
    if (playerChoice == comChoice) return "DRAW";
    else if (playerChoice == "rock") {
        if (comChoice == "paper") return "LOSE";
        else return "WIN";
    } else if (playerChoice == "paper") {
        if (comChoice == "scissors") return "LOSE";
        else return "WIN";
    } else if (playerChoice == "scissors") {
        if (comChoice == "rock") return "LOSE";
        else return "WIN";
    }
}

function gameRounds(playerSelect, compSelect) {
    playerSelect.textContent = choices2[playerSelect];
    compSelection.text = choices2[compSelect];

    const roundRslt = rpsLogic(choices[playerSelect], choices[compSelect]);
    let testMsg;

    if (roundRslt === "WIN") {
        testMsg = "beats";
        players++;
    } else if (roundRslt === "LOSE") {
        testMsg = "is beaten by";
        computers++;
    } else if (roundRslt === "TIE") {
        testMsg = "ties with";
    }
    roundsResult.textContent =
        roundRslt === "DRAW" ? "DRAW" : "YOU " + roundRslt;
    roundsLog.textContent = `${choices[playerSelect]} ${testMsg} ${choices[compSelect]}`;

    playerSelection.textContent = choices2[playerSelect];
    playerScore.textContent = players;
    compScore.textContent = computers;
    compSelection.textContent = choices2[compSelect];
}

// Add event each selection
buttons.forEach((selection) => {
    selection.addEventListener("click", () => {
        const playerSelect = selection.id;
        const compSelect = getComputerChoice();

        gameRounds(playerSelect, compSelect);

        if (players == 5 || computers == 5) {
            disabledAction(true);
            play.textContent = "Start Game";
            gameOver.textContent = "GAME OVER";
            gameResult.textContent =
                players > computers ? "YOU WIN" : "YOU LOSE";
        }
    });
});

function disabledAction(isDisable) {
    buttons.forEach((button) => {
        button.disabled = isDisable;
    });
}
