const choices = ["rock", "paper", "scissors"];
function getComputerChoice() {
    let choiceIdx = Math.floor(Math.random() * choices.length);
    return choices[choiceIdx];
}

function getHumanChoice() {
    let inputUser = prompt(
        "Insert your choice \n1 = rock \n2 = paper \n3 = scissors"
    );
    // If input null cancel the game, if input not 1-3 re input
    if (inputUser > 0 && inputUser < 4) return choices[inputUser - 1];
    else if (inputUser == null) return null;
    else {
        alert(inputUser + " Invalid input \nplease input in range 1-3");
        return getHumanChoice();
    }
}

//Rock-Paper Scissors logic
function playRound(humanChoice, comChoice) {
    if (humanChoice == comChoice) return "DRAW";
    else if (humanChoice == "rock") {
        if (comChoice == "paper") return "LOSE";
        else return "WIN";
    } else if (humanChoice == "paper") {
        if (comChoice == "scissors") return "LOSE";
        else return "WIN";
    } else if (humanChoice == "scissors") {
        if (comChoice == "rock") return "LOSE";
        else return "WIN";
    }
}

function playGame() {
    let humanScore = 0;
    let comScore = 0;
    let round = 0;

    // lopping until player or comp score reach 5
    console.log("First reach score 5 is the winner");
    do {
        let humanSelection = getHumanChoice();
        const comSelection = getComputerChoice();

        //Game canceled when canceling user input choice
        if (humanSelection == null) {
            alert("game canceled");
            break;
        }

        const roundResult = playRound(humanSelection, comSelection);

        // Score increment each round
        if (roundResult == "WIN") humanScore++;
        else if (roundResult == "LOSE") comScore++;

        // Result log
        console.log(
            `Rounds : ${round} \t ${humanSelection} vs ${comSelection}`
        );
        console.log(
            `${roundResult}\tHuman : ${humanScore} \t Comp : ${comScore}`
        );

        if (humanScore == 5 || comScore == 5) break;
        round++;
    } while (true);

    if (humanScore > comScore) console.log("You're a WINNERS!!!");
    else console.log("LOOOOSSSSEEEEEEERRRRSSSSSS!!!");
}
