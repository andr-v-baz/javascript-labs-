const greeting = document.getElementById("greeting");

const input = document.getElementById("usernameInput");
const button = document.getElementById("saveName");

const inputBox = document.getElementById("nameInputBox");
const editBtn = document.getElementById("editNameBtn");

const savedName = localStorage.getItem("username");

if(savedName){
  showGreeting(savedName);
  inputBox.style.display = "none";
  editBtn.style.display = "inline-block";
}

button.addEventListener("click", saveUserName);

input.addEventListener("keydown", (event)=>{
  if(event.key === "Enter"){
    saveUserName();
  }
});

editBtn.addEventListener("click", ()=>{
  inputBox.style.display = "block";
  editBtn.style.display = "none";
  input.focus();
});

function saveUserName(){
  const name = input.value.trim();

  if(name !== ""){
    localStorage.setItem("username", name);
    showGreeting(name);

    inputBox.style.display = "none";
    editBtn.style.display = "inline-block";

    input.value = "";
  }
}

function showGreeting(name){
  const hour = new Date().getHours();

  let text = "";

  if(hour < 12){
    text = "Good morning";
  }
  else if(hour < 18){
    text = "Good afternoon";
  }
  else{
    text = "Good evening";
  }

  greeting.textContent = `${text}, ${name}!`;
}