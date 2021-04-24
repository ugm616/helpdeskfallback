"use strict";

function whenClicked() {
    alert("You clicked the button");
}

function bufferClick() {
    theBuffer.textContent = "HELLO BUFFER";
}

/* function showArgs(arg1, arg2) {
    console.log("arguments: ", arguments);
    console.log(Array.from(arguments));
    let newArr = Array.from(arguments);
    return newArr;
}
let newArr = showArgs("hello", "world");

console.log(`New Array is ${newArr}`); */

const theButton = document.querySelector(".btn-info");

theButton.addEventListener("click", whenClicked);

theBuffer.addEventListener("click", bufferClick);
