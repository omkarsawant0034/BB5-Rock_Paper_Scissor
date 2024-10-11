document.addEventListener("DOMContentLoaded", () => {
    let userScore = 0;
    let compScore = 0;

    let choices = document.querySelectorAll(".choice"); // Use querySelectorAll to get all choices
    let msg = document.querySelector("#msg");

    const userScorePara = document.querySelector("#user-score");
    const compScorePara = document.querySelector("#comp-score");

    // Load sound effects
    const winSound = new Audio('Sounds/win.mp3');
    const loseSound = new Audio('Sounds/lose.mp3');
    const drawSound = new Audio('Sounds/draw.mp3');

    // Draw Game
    const drawGame = () => {
        msg.innerText = "GAME WAS DRAW ? PLAY AGAIN";
        msg.style.backgroundColor = "#537791";
        drawSound.play();  // Play draw sound
    }

    // Show Winner
    const showWinner = (userWin, userChoice, compChoice) => {
        if (userWin) {
            userScore++;
            userScorePara.innerText = userScore;
            msg.innerText = `You Won! Your ${userChoice} beats ${compChoice}`;
            msg.style.backgroundColor = "green";
            winSound.play();  // Play win sound
        } else {
            compScore++;
            compScorePara.innerText = compScore;
            msg.innerText = `You Lose! Computer's ${compChoice} beats ${userChoice}`;
            msg.style.backgroundColor = "red";
            loseSound.play();  // Play lose sound
        }
    }

    // Play Game
    const playGame = (userChoice) => {
        const compChoice = genCompChoice();

        if (userChoice === compChoice) {
            drawGame();
        } else {
            let userWin = true;
            if (userChoice === 'rock') {
                userWin = compChoice === 'paper' ? false : true;
            } else if (userChoice === 'paper') {
                userWin = compChoice === 'scissor' ? false : true;
            } else {
                userWin = compChoice === 'rock' ? false : true;
            }
            showWinner(userWin, userChoice, compChoice);
        }
    }

    // Computer choice generator
    const genCompChoice = () => {
        const options = ['rock', 'paper', 'scissor'];
        const Idx = Math.floor(Math.random() * 3);
        return options[Idx];
    }

    // User choice event listeners
    choices.forEach((choice) => {
        choice.addEventListener("click", () => {
            const userChoice = choice.getAttribute("id");
            playGame(userChoice);
        });
    });
});
