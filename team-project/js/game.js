const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const gameContainer = document.getElementById("game-container");

let gameRunning = false;
let gameOver = false;

let score = 0;
let lives = 3;
let record = localStorage.getItem("ninjaDodgeRecord") || 0;

let items = [];
let keys = {};
let spawnTimer = null;

let spawnRate = 900;
let fallSpeed = 2;

let moveLeft = false;
let moveRight = false;

const player = {
  x: canvas.width / 2 - 35,
  y: canvas.height - 90,
  width: 70,
  height: 70,
  speed: 7
};

const backgroundImg = new Image();
backgroundImg.src = "images/game/background.png";

const playerImg = new Image();
playerImg.src = "images/game/player.png";

const coinImg = new Image();
coinImg.src = "images/game/coin.png";

const ramenImg = new Image();
ramenImg.src = "images/game/ramen.png";

const manaImg = new Image();
manaImg.src = "images/game/mana-crystal.png";

const scrollImg = new Image();
scrollImg.src = "images/game/scroll.png";

const shurikenImg = new Image();
shurikenImg.src = "images/game/shuriken.png";

const kunaiImg = new Image();
kunaiImg.src = "images/game/kunai.png";

const heartImg = new Image();
heartImg.src = "images/game/heart.png";

document.addEventListener("keydown", event => {
  keys[event.key] = true;
});

document.addEventListener("keyup", event => {
  keys[event.key] = false;
});

canvas.addEventListener("touchstart", e => {
  e.preventDefault();

  const rect = canvas.getBoundingClientRect();
  const touchX = e.touches[0].clientX - rect.left;
  const scaledX = touchX * (canvas.width / rect.width);

  if (scaledX < canvas.width / 2) {
    moveLeft = true;
    moveRight = false;
  } else {
    moveRight = true;
    moveLeft = false;
  }
}, { passive: false });

canvas.addEventListener("touchend", () => {
  moveLeft = false;
  moveRight = false;
});

function activateLeft() {
  moveLeft = true;
  moveRight = false;
}

function activateRight() {
  moveRight = true;
  moveLeft = false;
}

function stopMove() {
  moveLeft = false;
  moveRight = false;
}

leftBtn.addEventListener("touchstart", e => {
  e.preventDefault();
  activateLeft();
}, { passive: false });

leftBtn.addEventListener("touchend", stopMove);
leftBtn.addEventListener("mousedown", activateLeft);
leftBtn.addEventListener("mouseup", stopMove);
leftBtn.addEventListener("mouseleave", stopMove);

rightBtn.addEventListener("touchstart", e => {
  e.preventDefault();
  activateRight();
}, { passive: false });

rightBtn.addEventListener("touchend", stopMove);
rightBtn.addEventListener("mousedown", activateRight);
rightBtn.addEventListener("mouseup", stopMove);
rightBtn.addEventListener("mouseleave", stopMove);

startBtn.addEventListener("click", () => {
  if (gameOver) {
    resetGame();
  }

  if (!gameRunning) {
    gameRunning = true;
    startSpawning();
  }
});

pauseBtn.addEventListener("click", () => {
  gameRunning = false;
  stopSpawning();
});

fullscreenBtn.addEventListener("click", toggleGameFullscreen);

async function toggleGameFullscreen() {
  const fullscreenSupported = !!document.fullscreenEnabled && !!gameContainer.requestFullscreen;

  if (document.fullscreenElement) {
    await document.exitFullscreen();
    fullscreenBtn.textContent = "Full screen";
    return;
  }

  if (fullscreenSupported) {
    try {
      await gameContainer.requestFullscreen();
      fullscreenBtn.textContent = "Exit full";
      return;
    } catch (error) {
      enableExpandedMode();
      return;
    }
  }

  if (gameContainer.classList.contains("expanded-game")) {
    disableExpandedMode();
  } else {
    enableExpandedMode();
  }
}

function enableExpandedMode() {
  gameContainer.classList.add("expanded-game");
  document.body.classList.add("game-expanded");
  fullscreenBtn.textContent = "Exit full";
}

function disableExpandedMode() {
  gameContainer.classList.remove("expanded-game");
  document.body.classList.remove("game-expanded");
  fullscreenBtn.textContent = "Full screen";
}

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    fullscreenBtn.textContent = "Full screen";
  }
});

function spawnItem() {
  const types = ["coin", "ramen", "mana", "scroll", "shuriken", "kunai"];
  const type = types[Math.floor(Math.random() * types.length)];

  let size = 45;

  if (type === "coin") size = 36;
  if (type === "shuriken") size = 70;
  if (type === "kunai") size = 75;

  items.push({
    x: Math.random() * (canvas.width - size),
    y: -size,
    width: size,
    height: size,
    speed: fallSpeed + Math.random() * 2,
    type: type
  });
}

function startSpawning() {
  if (!spawnTimer) {
    spawnTimer = setInterval(spawnItem, spawnRate);
  }
}

function stopSpawning() {
  clearInterval(spawnTimer);
  spawnTimer = null;
}

setInterval(() => {
  if (gameRunning && !gameOver) {
    fallSpeed += 0.2;

    if (spawnRate > 400) {
      spawnRate -= 50;
      stopSpawning();
      startSpawning();
    }
  }
}, 8000);

function resetGame() {
  score = 0;
  lives = 3;
  items = [];
  gameOver = false;

  spawnRate = 900;
  fallSpeed = 2;

  player.x = canvas.width / 2 - 35;
}

function update() {
  if (!gameRunning || gameOver) {
    return;
  }

  if (keys["ArrowLeft"] || keys["a"] || moveLeft) {
    player.x -= player.speed;
  }

  if (keys["ArrowRight"] || keys["d"] || moveRight) {
    player.x += player.speed;
  }

  if (player.x < 0) {
    player.x = 0;
  }

  if (player.x + player.width > canvas.width) {
    player.x = canvas.width - player.width;
  }

  for (let i = items.length - 1; i >= 0; i--) {
    items[i].y += items[i].speed;

    if (isColliding(player, items[i])) {
      handleItemCollision(items[i]);
      items.splice(i, 1);
      continue;
    }

    if (items[i].y > canvas.height) {
      items.splice(i, 1);
    }
  }

  if (lives <= 0) {
    lives = 0;
    gameOver = true;
    gameRunning = false;
    stopSpawning();

    if (score > record) {
      record = score;
      localStorage.setItem("ninjaDodgeRecord", record);
    }
  }
}

function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function handleItemCollision(item) {
  if (item.type === "coin") {
    score += 10;
  } else if (item.type === "ramen") {
    score += 20;
  } else if (item.type === "mana") {
    score += 30;
  } else if (item.type === "scroll") {
    score += 50;
  } else if (item.type === "shuriken" || item.type === "kunai") {
    lives -= 1;
  }
}

function drawBackground() {
  if (backgroundImg.complete) {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function drawPlayer() {
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

function drawItems() {
  items.forEach(item => {
    if (item.type === "coin") {
      ctx.drawImage(coinImg, item.x, item.y, item.width, item.height);
    } else if (item.type === "ramen") {
      ctx.drawImage(ramenImg, item.x, item.y, item.width, item.height);
    } else if (item.type === "mana") {
      ctx.drawImage(manaImg, item.x, item.y, item.width, item.height);
    } else if (item.type === "scroll") {
      ctx.drawImage(scrollImg, item.x, item.y, item.width, item.height);
    } else if (item.type === "shuriken") {
      ctx.drawImage(shurikenImg, item.x, item.y, item.width, item.height);
    } else if (item.type === "kunai") {
      ctx.drawImage(kunaiImg, item.x, item.y, item.width, item.height);
    }
  });
}

function drawUI() {
  ctx.fillStyle = "white";
  ctx.font = "20px Poppins";
  ctx.textAlign = "start";

  ctx.fillText("Score: " + score, 20, 30);
  ctx.fillText("Record: " + record, 20, 60);

  for (let i = 0; i < lives; i++) {
    ctx.drawImage(heartImg, canvas.width - 40 - i * 40, 15, 28, 28);
  }

  if (!gameRunning && !gameOver) {
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "32px Poppins";
    ctx.textAlign = "center";
    ctx.fillText("Press Start", canvas.width / 2, canvas.height / 2);
  }

  if (gameOver) {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "36px Poppins";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 20);

    ctx.font = "22px Poppins";
    ctx.fillText("Final Score: " + score, canvas.width / 2, canvas.height / 2 + 20);
    ctx.fillText("Press Start to play again", canvas.width / 2, canvas.height / 2 + 60);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawPlayer();
  drawItems();
  drawUI();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
