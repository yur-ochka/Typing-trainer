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

let colorOnClick = `#1e2125`;
let colorOnKeyup = `#383f47`;

document.addEventListener('keydown', function(event) {
    if (document.querySelector("#typingArea") == document.activeElement)
    {
        themeSwitch.disabled = true;
        if (firstCharPrinted == false) {
            firstCharPrinted = true;
            interval = setInterval(updateInfo, 1000);      
        }
        var keyCode = event.code;
        console.log('Key pressed:', keyCode);
        const key = document.querySelector(`.${keyCode}`);
        key.style.background = colorOnClick;
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
    key.style.background = colorOnKeyup;
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

const themeSwitch = document.querySelector(".switch__input");
var r = document.querySelector(':root');
const switchCircle = document.querySelector(".circle");
themeSwitch.addEventListener("click", () =>{
    if (themeSwitch.checked == true)
    {
        colorOnClick = '#FFA04D';
        colorOnKeyup = '#FFC999';
        r.style.setProperty('--BGcolor', '#FFE2C7');
        r.style.setProperty('--itemsColor', '#FFC999');
        r.style.setProperty('--textColor', '#6F3C0B');
        r.style.setProperty('--placeholderColor', 'rgba(111, 60, 11, 0.6)');
        switchCircle.style.transform = 'translate(130%, 0)';
        switchCircle.style.content = 'url(sun.png)';

    }
    else {
        colorOnClick = `#1e2125`;
        colorOnKeyup = `#383f47`;
        r.style.setProperty('--BGcolor', '#242B33');
        r.style.setProperty('--itemsColor', '#383f47');
        r.style.setProperty('--textColor', 'azure');
        r.style.setProperty('--placeholderColor', 'rgba(240, 255, 255, 0.5)');
        switchCircle.style.transform = 'translate(0, 0)';
        switchCircle.style.content = 'url(moon.png)';
    }
});