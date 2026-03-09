const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");

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

const player = {
  x: canvas.width / 2 - 35,
  y: canvas.height - 90,
  width: 70,
  height: 70,
  speed: 7
};

// IMAGES

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


// KEYBOARD

document.addEventListener("keydown", (event)=>{
keys[event.key] = true;
});

document.addEventListener("keyup", (event)=>{
keys[event.key] = false;
});


// BUTTONS

startBtn.addEventListener("click", ()=>{

if(gameOver){
resetGame();
}

if(!gameRunning){
gameRunning = true;
startSpawning();
}

});

pauseBtn.addEventListener("click", ()=>{

gameRunning = false;
stopSpawning();

});


// SPAWN ITEMS

function spawnItem(){

const types = ["coin","ramen","mana","scroll","shuriken","kunai"];

const type = types[Math.floor(Math.random()*types.length)];

let size = 45;

if(type === "coin"){
size = 36;
}

if(type === "shuriken"){
size = 70;
}

if(type === "kunai"){
size = 75;
}

items.push({

x: Math.random() * (canvas.width - size),
y: -size,
width: size,
height: size,
speed: fallSpeed + Math.random()*2,
type: type

});

}


// SPAWN CONTROL

function startSpawning(){

if(!spawnTimer){
spawnTimer = setInterval(spawnItem, spawnRate);
}

}

function stopSpawning(){

clearInterval(spawnTimer);
spawnTimer = null;

}


// DIFFICULTY SYSTEM

setInterval(()=>{

if(gameRunning && !gameOver){

fallSpeed += 0.2;

if(spawnRate > 400){

spawnRate -= 50;

stopSpawning();
startSpawning();

}

}

},8000);


// RESET

function resetGame(){

score = 0;
lives = 3;
items = [];
gameOver = false;

spawnRate = 900;
fallSpeed = 2;

player.x = canvas.width/2 - 35;

}


// UPDATE

function update(){

if(!gameRunning || gameOver){
return;
}


// PLAYER MOVE

if(keys["ArrowLeft"] || keys["a"]){
player.x -= player.speed;
}

if(keys["ArrowRight"] || keys["d"]){
player.x += player.speed;
}


// LIMITS

if(player.x < 0){
player.x = 0;
}

if(player.x + player.width > canvas.width){
player.x = canvas.width - player.width;
}


// MOVE ITEMS

for(let i = items.length-1; i>=0; i--){

items[i].y += items[i].speed;


// COLLISION

if(isColliding(player, items[i])){

handleItemCollision(items[i]);
items.splice(i,1);
continue;

}


// OUT OF SCREEN

if(items[i].y > canvas.height){

items.splice(i,1);

}

}


// GAME OVER

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


// COLLISION

function isColliding(a,b){

return(

a.x < b.x + b.width &&
a.x + a.width > b.x &&
a.y < b.y + b.height &&
a.y + a.height > b.y

);

}


// COLLISION RESULT

function handleItemCollision(item){

if(item.type === "coin"){
score += 10;
}

else if(item.type === "ramen"){
score += 20;
}

else if(item.type === "mana"){
score += 30;
}

else if(item.type === "scroll"){
score += 50;
}

else if(item.type === "shuriken" || item.type === "kunai"){
lives -= 1;
}

}


// DRAW BACKGROUND

function drawBackground(){

if(backgroundImg.complete){

ctx.drawImage(backgroundImg,0,0,canvas.width,canvas.height);

}else{

ctx.fillStyle = "#1a1a1a";
ctx.fillRect(0,0,canvas.width,canvas.height);

}

}


// DRAW PLAYER

function drawPlayer(){

ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

}


// DRAW ITEMS

function drawItems(){

items.forEach(item=>{

if(item.type === "coin"){
ctx.drawImage(coinImg, item.x, item.y, item.width, item.height);
}

else if(item.type === "ramen"){
ctx.drawImage(ramenImg, item.x, item.y, item.width, item.height);
}

else if(item.type === "mana"){
ctx.drawImage(manaImg, item.x, item.y, item.width, item.height);
}

else if(item.type === "scroll"){
ctx.drawImage(scrollImg, item.x, item.y, item.width, item.height);
}

else if(item.type === "shuriken"){
ctx.drawImage(shurikenImg, item.x, item.y, item.width, item.height);
}

else if(item.type === "kunai"){
ctx.drawImage(kunaiImg, item.x, item.y, item.width, item.height);
}

});

}


// DRAW UI

function drawUI(){

ctx.fillStyle = "white";
ctx.font = "20px Poppins";

ctx.fillText("Score: "+score,20,30);
ctx.fillText("Record: "+record,20,60);


for(let i=0;i<lives;i++){

ctx.drawImage(heartImg, canvas.width-40 - i*40, 15, 28, 28);

}


if(!gameRunning && !gameOver){

ctx.fillStyle = "rgba(0,0,0,0.45)";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle = "white";
ctx.font = "32px Poppins";
ctx.textAlign = "center";

ctx.fillText("Press Start", canvas.width/2, canvas.height/2);

ctx.textAlign = "start";

}


if(gameOver){

ctx.fillStyle = "rgba(0,0,0,0.6)";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle = "white";
ctx.font = "36px Poppins";
ctx.textAlign = "center";

ctx.fillText("Game Over", canvas.width/2, canvas.height/2-20);

ctx.font = "22px Poppins";

ctx.fillText("Final Score: "+score, canvas.width/2, canvas.height/2+20);

ctx.fillText("Press Start to play again", canvas.width/2, canvas.height/2+60);

ctx.textAlign = "start";

}

}


// DRAW

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

drawBackground();
drawPlayer();
drawItems();
drawUI();

}


// LOOP

function gameLoop(){

update();
draw();

requestAnimationFrame(gameLoop);

}

gameLoop();