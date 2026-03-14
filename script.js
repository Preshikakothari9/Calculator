let display = document.getElementById("display");
let buttons = document.querySelectorAll(".buttons button");
let historyList = document.getElementById("historyList");
let themeToggle = document.getElementById("themeToggle");
let clearHistory = document.getElementById("clearHistory");
let copyBtn = document.getElementById("copyResult");

let input = "";

let clickSound = new Audio("https://www.soundjay.com/buttons/button-16.mp3");

/* LOAD HISTORY */

window.onload = function(){

let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

history.forEach(item =>{

let li = document.createElement("li");
li.innerText = item;
historyList.appendChild(li);

});

}

/* BUTTON CLICK */

buttons.forEach(button => {

button.addEventListener("click", () => {

clickSound.play();

let value = button.innerText;

handleInput(value);

});

});

/* INPUT FUNCTION */

function handleInput(value){

if(value === "="){

try{

let result = eval(input);

addHistory(input + " = " + result);

display.value = result;

input = result.toString();

}

catch{

display.value = "Error";
input = "";

}

}

else if(value === "AC"){

input = "";
display.value = "";

}

else if(value === "DEL"){

input = input.slice(0,-1);
display.value = input;

}

else{

input += value;
display.value = input;

}

}

/* HISTORY */

function addHistory(text){

let li = document.createElement("li");

li.innerText = text;

historyList.prepend(li);

let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
history.unshift(text);

localStorage.setItem("calcHistory", JSON.stringify(history));

}

/* CLEAR HISTORY */

clearHistory.addEventListener("click", ()=>{

historyList.innerHTML="";
localStorage.removeItem("calcHistory");

});


/* KEYBOARD SUPPORT */

document.addEventListener("keydown",(e)=>{

let key = e.key;

if("0123456789+-*/.%".includes(key)){

input+=key;
display.value=input;

}

else if(key==="Enter"){

let result = eval(input);

addHistory(input + " = " + result);

display.value=result;

input=result.toString();

}

else if(key==="Backspace"){

input=input.slice(0,-1);

display.value=input;

}

});

/* THEME TOGGLE */

themeToggle.addEventListener("click", ()=>{

document.body.classList.toggle("light");

});