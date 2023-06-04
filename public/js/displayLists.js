const lineListButtons = document.getElementById("lineListButtons");
const listButtons = document.getElementById("listButtons");
const buttonDone = document.getElementById("buttonDone");
const buttonNotDone = document.getElementById("buttonNotDone");

lineListButtons.style.left = (buttonDone.offsetLeft + buttonDone.offsetWidth/2) + "px";
lineListButtons.style.width = (buttonDone.offsetWidth - 10) + "px";
listDone.style.display = "none";
// lineListButtons.style.transition = ".6s ease-in-out";

function doneDisplayed() {
    listNotDone.style.display = "none";
    listDone.style.display = "block";
    lineListButtons.style.left = (buttonNotDone.offsetLeft + buttonNotDone.offsetWidth/2) + "px";
    lineListButtons.style.width = (buttonNotDone.offsetWidth - 10) + "px";
}

function notDoneDisplayed() {
    listDone.style.display = "none";
    listNotDone.style.display = "block";
    lineListButtons.style.left = (buttonDone.offsetLeft + buttonDone.offsetWidth/2) + "px";
    lineListButtons.style.width = (buttonDone.offsetWidth - 10) + "px";
}