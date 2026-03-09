const greeting = document.getElementById("greeting");

const input = document.getElementById("usernameInput");
const button = document.getElementById("saveName");

const inputBox = document.getElementById("nameInputBox");
const editBtn = document.getElementById("editNameBtn");

// якщо ім'я вже збережене
const savedName = localStorage.getItem("username");

if(savedName){
showGreeting(savedName);
inputBox.style.display = "none";
editBtn.style.display = "inline-block";
}

button.addEventListener("click", ()=>{

const name = input.value.trim();

if(name !== ""){

localStorage.setItem("username", name);

showGreeting(name);

inputBox.style.display = "none";
editBtn.style.display = "inline-block";

input.value = "";

}

});

editBtn.addEventListener("click", ()=>{

inputBox.style.display = "block";
editBtn.style.display = "none";

});

function showGreeting(name){

const hour = new Date().getHours();

let text = "";

if(hour < 12){
text = "Добрий ранок";
}
else if(hour < 18){
text = "Добрий день";
}
else{
text = "Добрий вечір";
}

greeting.textContent = text + ", " + name + "!";

}