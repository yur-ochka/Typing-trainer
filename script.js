let charNumber = 0;

let firstCharPrinted = false;
let countMistakes = 0;
let expiredTime = 0;
let remainingTime = 120;
let countPrintedChars = 0;
let typingSpeed = 0;

let mistakes = document.querySelector(".mistakes");
let time = document.querySelector(".time");
let speed = document.querySelector(".speed");
let charsCount = document.querySelector(".charsCount");

let interval = null;

const mainKeys = ["Tab", "Backspace", "CapsLock", "Enter", "ShiftLeft", "ShiftRight"];

document.addEventListener('keydown', function(event) {
    if (document.querySelector("#typingArea") == document.activeElement)
    {
        if (firstCharPrinted == false) {
            firstCharPrinted = true;
            interval = setInterval(updateInfo, 1000);      
        }
        var keyCode = event.code;
        console.log('Key pressed:', keyCode);
        const key = document.querySelector(`.${keyCode}`);
        key.style.background = `#1e2125`;
        const textHintArea = document.querySelector(`#hintArea`);
        if (event.key === 'Backspace') {
            event.preventDefault();
        }
        if(textHintArea.value[charNumber] == event.key)
        {
            charNumber++;
            countPrintedChars++;
            charsCount.innerHTML = `Printed chars: ${countPrintedChars}`;
        }
        else {
            if (mainKeys.includes(keyCode) != true){
                key.style.background = "red";
                countMistakes++;
                mistakes.innerHTML = `Mistakes: ${countMistakes}`;
            }        
            event.preventDefault();
        }
    }
    
});

document.addEventListener('keyup', function(event) {
    var keyCode = event.code;
    console.log('Key released:', keyCode);
    const key = document.querySelector(`.${keyCode}`);
    key.style.background = `#383f47`;
});

let updateInfo = () =>
{
    remainingTime--;
    expiredTime++;
    time.innerHTML = `Remaining time: ${remainingTime}s`;
    if (remainingTime == 0) 
    {
        clearInterval(interval);
        document.querySelector(`#typingArea`).disabled = true;
        countSpeed();
    }
}

let countSpeed = () =>
{
    typingSpeed = roundToTwoDecimalPlaces(countPrintedChars / expiredTime);
    speed.innerHTML = `Chars per minute: ${typingSpeed}`;
}

function roundToTwoDecimalPlaces(number) {
    return Math.round(number * 100) / 100;
}