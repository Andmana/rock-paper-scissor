const choices = ["rock", "paper", "scissors"];
const choices2 = ["✊🏿", "🖐🏻", "✌🏼"];
let computers = 0;
let players = 0;
let isGameRunning = false;

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
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var closeModal = document.getElementById("CloseModal");

play.addEventListener("click", () => {
    const text = play.textContent.trim();
    if (text == "Start Game") {
        if (!isGameRunning) {
            computers = 0;
            players = 0;
            scores();
            play.textContent = "Stop Game";
            disabledAction(false);
            gameOver.textContent = "";
            gameResult.textContent = "";

            isGameRunning = true;
        }
    } else {
        if (isGameRunning) {
            play.textContent = "Start Game";
            disabledAction(true);
            isGameRunning = false; // Set the flag to false when stopping the game
        }
    }
});

// Add event each selection
buttons.forEach((selection) => {
    selection.addEventListener("click", () => {
        disabledAction(true);
        const playerSelect = selection.id;
        playerSelection.textContent = "?";

        const compSelect = getComputerChoice();
        // delay here
        let countDown = 0;
        const interval = setInterval(() => {
            let choiceIdx = Math.floor(Math.random() * choices.length);
            compSelection.textContent = choices2[choiceIdx];
            countDown++;
            if (countDown >= 13) {
                // Stop after 5 iterations (i.e., 500ms)
                clearInterval(interval);
            }
        }, 200); // Update every 200ms

        setTimeout(() => {
            gameRounds(playerSelect, compSelect);

            disabledAction(false);
            if (players == 5 || computers == 5) {
                disabledAction(false);

                isGameRunning = false;
                play.textContent = "Start Game";
                gameOver.textContent =
                    players > computers ? "Congrats" : "HAHAHA";
                gameResult.textContent =
                    players > computers ? "YOU WIN" : "LOSER!";
                modal.style.display = "block";
            }
        }, 3000); // 3 second delay
    });
});

let scores = () => {
    playerScore.textContent = players;
    compScore.textContent = computers;
};

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
    } else if (roundRslt === "DRAW") {
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

function disabledAction(isDisable) {
    buttons.forEach((button) => {
        button.disabled = isDisable;
    });
}

span.onclick = function () {
    modal.style.display = "none";
};
closeModal.onclick = function () {
    modal.style.display = "none";
};
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
