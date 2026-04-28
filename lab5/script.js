const difficulty = document.getElementById("difficulty");
const colorPicker = document.getElementById("colorPicker");
const startBtn = document.getElementById("startBtn");
const gameArea = document.getElementById("gameArea");
const target = document.getElementById("target");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const message = document.getElementById("message");

let score = 0;
let time = 0;
let timer = null;
let gameActive = false;

const settings = {
    easy: {
        size: 70,
        time: 20
    },
    normal: {
        size: 50,
        time: 15
    },
    hard: {
        size: 35,
        time: 10
    }
};

function startGame() {
    const selectedDifficulty = difficulty.value;

    if (selectedDifficulty === "") {
        return;
    }

    score = 0;
    time = settings[selectedDifficulty].time;
    gameActive = true;

    scoreText.textContent = score;
    timeText.textContent = time;
    message.textContent = "Клікайте по квадрату!";

    target.style.width = settings[selectedDifficulty].size + "px";
    target.style.height = settings[selectedDifficulty].size + "px";
    target.style.backgroundColor = colorPicker.value;
    target.style.display = "block";

    moveTarget();

    clearInterval(timer);

    timer = setInterval(function () {
        time--;
        timeText.textContent = time;

        if (time <= 0) {
            endGame();
        }
    }, 1000);
}

function moveTarget() {
    const maxX = gameArea.clientWidth - target.offsetWidth;
    const maxY = gameArea.clientHeight - target.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    target.style.left = randomX + "px";
    target.style.top = randomY + "px";
}

function clickTarget() {
    if (!gameActive) {
        return;
    }

    score++;
    scoreText.textContent = score;

    moveTarget();
}

function endGame() {
    gameActive = false;
    clearInterval(timer);

    target.style.display = "none";
    message.textContent = "Гру завершено. Ваш результат: " + score;
}

startBtn.addEventListener("click", startGame);
target.addEventListener("click", clickTarget);