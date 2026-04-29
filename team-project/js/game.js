const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const gameSection = document.getElementById("game");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let leftPressed = false;
let rightPressed = false;

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

const normalWidth = 800;
const normalHeight = 400;

canvas.width = normalWidth;
canvas.height = normalHeight;

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

document.addEventListener("keydown", (event) => {
  keys[event.key] = true;

  if(event.key === "Escape" && gameSection.classList.contains("custom-fullscreen")){
    exitCustomFullscreen();
  }
});

document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

function pressLeft(){
  leftPressed = true;
}

function releaseLeft(){
  leftPressed = false;
}

function pressRight(){
  rightPressed = true;
}

function releaseRight(){
  rightPressed = false;
}

if(leftBtn){
  leftBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    pressLeft();
  }, {passive:false});

  leftBtn.addEventListener("touchend", releaseLeft);
  leftBtn.addEventListener("touchcancel", releaseLeft);

  leftBtn.addEventListener("mousedown", pressLeft);
  leftBtn.addEventListener("mouseup", releaseLeft);
  leftBtn.addEventListener("mouseleave", releaseLeft);
}

if(rightBtn){
  rightBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    pressRight();
  }, {passive:false});

  rightBtn.addEventListener("touchend", releaseRight);
  rightBtn.addEventListener("touchcancel", releaseRight);

  rightBtn.addEventListener("mousedown", pressRight);
  rightBtn.addEventListener("mouseup", releaseRight);
  rightBtn.addEventListener("mouseleave", releaseRight);
}

startBtn.addEventListener("click", () => {
  if(gameOver){
    resetGame();
  }

  if(!gameRunning){
    gameRunning = true;
    startSpawning();
  }
});

pauseBtn.addEventListener("click", () => {
  gameRunning = false;
  stopSpawning();
});

if(fullscreenBtn && gameSection){
  fullscreenBtn.addEventListener("click", () => {
    if(gameSection.classList.contains("custom-fullscreen")){
      exitCustomFullscreen();
    }else{
      enterCustomFullscreen();
    }
  });
}

function isMobileScreen(){
  return window.innerWidth <= 767;
}

function enterCustomFullscreen(){
  gameSection.classList.add("custom-fullscreen");
  document.body.classList.add("game-lock");
  fullscreenBtn.textContent = "Exit full";

  resizeCanvasForMode();
}

function exitCustomFullscreen(){
  gameSection.classList.remove("custom-fullscreen");
  document.body.classList.remove("game-lock");
  fullscreenBtn.textContent = "Full screen";

  canvas.width = normalWidth;
  canvas.height = normalHeight;

  canvas.style.width = "";
  canvas.style.height = "";

  player.x = canvas.width / 2 - player.width / 2;
  player.y = canvas.height - 90;
}

function resizeCanvasForMode(){
  if(!gameSection.classList.contains("custom-fullscreen")){
    return;
  }

  if(isMobileScreen()){
    canvas.width = normalWidth;
    canvas.height = normalHeight;

    canvas.style.width = "";
    canvas.style.height = "";

    player.x = canvas.width / 2 - player.width / 2;
    player.y = canvas.height - 90;
  }else{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    player.x = canvas.width / 2 - player.width / 2;
    player.y = canvas.height - 90;
  }
}

window.addEventListener("resize", resizeCanvasForMode);

window.addEventListener("orientationchange", () => {
  setTimeout(resizeCanvasForMode, 300);
});

function spawnItem(){
  const types = ["coin", "ramen", "mana", "scroll", "shuriken", "kunai"];
  const type = types[Math.floor(Math.random() * types.length)];

  let size = 45;

  if(type === "coin") size = 36;
  if(type === "shuriken") size = 70;
  if(type === "kunai") size = 75;

  items.push({
    x: Math.random() * (canvas.width - size),
    y: -size,
    width: size,
    height: size,
    speed: fallSpeed + Math.random() * 2,
    type: type
  });
}

function startSpawning(){
  if(!spawnTimer){
    spawnTimer = setInterval(spawnItem, spawnRate);
  }
}

function stopSpawning(){
  clearInterval(spawnTimer);
  spawnTimer = null;
}

setInterval(() => {
  if(gameRunning && !gameOver){
    fallSpeed += 0.2;

    if(spawnRate > 400){
      spawnRate -= 50;
      stopSpawning();
      startSpawning();
    }
  }
}, 8000);

function resetGame(){
  score = 0;
  lives = 3;
  items = [];
  gameOver = false;

  spawnRate = 900;
  fallSpeed = 2;

  player.x = canvas.width / 2 - 35;
  player.y = canvas.height - 90;
}

function update(){
  if(!gameRunning || gameOver){
    return;
  }

  if(keys["ArrowLeft"] || keys["a"] || leftPressed){
    player.x -= player.speed;
  }

  if(keys["ArrowRight"] || keys["d"] || rightPressed){
    player.x += player.speed;
  }

  if(player.x < 0){
    player.x = 0;
  }

  if(player.x + player.width > canvas.width){
    player.x = canvas.width - player.width;
  }

  for(let i = items.length - 1; i >= 0; i--){
    items[i].y += items[i].speed;

    if(isColliding(player, items[i])){
      handleItemCollision(items[i]);
      items.splice(i, 1);
      continue;
    }

    if(items[i].y > canvas.height){
      items.splice(i, 1);
    }
  }

  if(lives <= 0){
    lives = 0;
    gameOver = true;
    gameRunning = false;

    stopSpawning();

    if(score > record){
      record = score;
      localStorage.setItem("ninjaDodgeRecord", record);
    }
  }
}

function isColliding(a, b){
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function handleItemCollision(item){
  if(item.type === "coin") score += 10;
  else if(item.type === "ramen") score += 20;
  else if(item.type === "mana") score += 30;
  else if(item.type === "scroll") score += 50;
  else if(item.type === "shuriken" || item.type === "kunai") lives -= 1;
}

function drawBackground(){
  if(backgroundImg.complete){
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  }else{
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function drawPlayer(){
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

function drawItems(){
  items.forEach(item => {
    if(item.type === "coin") ctx.drawImage(coinImg, item.x, item.y, item.width, item.height);
    else if(item.type === "ramen") ctx.drawImage(ramenImg, item.x, item.y, item.width, item.height);
    else if(item.type === "mana") ctx.drawImage(manaImg, item.x, item.y, item.width, item.height);
    else if(item.type === "scroll") ctx.drawImage(scrollImg, item.x, item.y, item.width, item.height);
    else if(item.type === "shuriken") ctx.drawImage(shurikenImg, item.x, item.y, item.width, item.height);
    else if(item.type === "kunai") ctx.drawImage(kunaiImg, item.x, item.y, item.width, item.height);
  });
}

function drawUI(){
  const fullscreen = gameSection.classList.contains("custom-fullscreen");
  const topOffset = fullscreen && !isMobileScreen() ? 70 : 0;

  ctx.fillStyle = "white";
  ctx.font = "20px Poppins";
  ctx.textAlign = "start";

  ctx.fillText("Score: " + score, 20, 30 + topOffset);
  ctx.fillText("Record: " + record, 20, 60 + topOffset);

  for(let i = 0; i < lives; i++){
    ctx.drawImage(heartImg, canvas.width - 40 - i * 40, 15 + topOffset, 28, 28);
  }

  if(!gameRunning && !gameOver){
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "32px Poppins";
    ctx.textAlign = "center";

    ctx.fillText("Press Start", canvas.width / 2, canvas.height / 2);

    ctx.textAlign = "start";
  }

  if(gameOver){
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "36px Poppins";
    ctx.textAlign = "center";

    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 20);

    ctx.font = "22px Poppins";

    ctx.fillText("Final Score: " + score, canvas.width / 2, canvas.height / 2 + 20);
    ctx.fillText("Record: " + record, canvas.width / 2, canvas.height / 2 + 50);
    ctx.fillText("Press Start to play again", canvas.width / 2, canvas.height / 2 + 85);

    ctx.textAlign = "start";
  }
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground();
  drawPlayer();
  drawItems();
  drawUI();
}

function gameLoop(){
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
