window.addEventListener("load", onPageLoad);
document.addEventListener("DOMContentLoaded", onPageLoad);

let goToMenu = () =>{
    console.log("ssdsd");
    window.location.href = 'menu.html?colorChecked=' + themeSwitch.checked;
};

var r = document.querySelector(':root');
let charNumber = 0;

let firstCharPrinted = false;
let countMistakes = 0;
let expiredTime = 0;
let remainingTime = getParameterByName('remainingTime');
let countPrintedChars = 0;
let typingSpeed = 0;

let mistakes = document.querySelector(".mistakes");
let time = document.querySelector(".time");
let speed = document.querySelector(".speed");
let charsCount = document.querySelector(".charsCount");

time.innerHTML = `Remaining time: ${remainingTime}s`;

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
        key.style.background = r.style.getPropertyValue('--colorOnClick');
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
    key.style.background = r.style.getPropertyValue('--colorOnKeyup');
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
    typingSpeed = roundToTwoDecimalPlaces(countPrintedChars / (expiredTime / 60));
    speed.innerHTML = `Chars per minute: ${typingSpeed}`;
}

function roundToTwoDecimalPlaces(number) {
    return Math.round(number * 100) / 100;
}

const themeSwitch = document.querySelector(".switch__input");
const switchCircle = document.querySelector(".circle");
themeSwitch.addEventListener("click", () =>{
    if (themeSwitch.checked == true)
    {
        r.style.setProperty('--colorOnClick', '#FFA04D');
        r.style.setProperty('--colorOnKeyup', '#FFC999');
        r.style.setProperty('--BGcolor', '#FFE2C7');
        r.style.setProperty('--itemsColor', '#FFC999');
        r.style.setProperty('--textColor', '#6F3C0B');
        r.style.setProperty('--placeholderColor', 'rgba(111, 60, 11, 0.6)');
        switchCircle.style.transform = 'translate(130%, 0)';
        switchCircle.style.content = 'url(sun.png)';
    }
    else {
        r.style.setProperty('--colorOnClick', '#1e2125');
        r.style.setProperty('--colorOnKeyup', '#383f47');
        r.style.setProperty('--BGcolor', '#242B33');
        r.style.setProperty('--itemsColor', '#383f47');
        r.style.setProperty('--textColor', 'azure');
        r.style.setProperty('--placeholderColor', 'rgba(240, 255, 255, 0.5)');
        switchCircle.style.transform = 'translate(0, 0)';
        switchCircle.style.content = 'url(moon.png)';
    }
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    let results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function onPageLoad() {
    if(getParameterByName('colorChecked') == 'true')
    themeSwitch.checked = true;
    else themeSwitch.checked = false;
    if (themeSwitch.checked == true)
    {
        r.style.setProperty('--colorOnClick', '#FFA04D');
        r.style.setProperty('--colorOnKeyup', '#FFC999');
        r.style.setProperty('--BGcolor', '#FFE2C7');
        r.style.setProperty('--itemsColor', '#FFC999');
        r.style.setProperty('--textColor', '#6F3C0B');
        r.style.setProperty('--placeholderColor', 'rgba(111, 60, 11, 0.6)');
        switchCircle.style.transform = 'translate(130%, 0)';
        switchCircle.style.content = 'url(sun.png)';
    }
    else {
        r.style.setProperty('--colorOnClick', '#1e2125');
        r.style.setProperty('--colorOnKeyup', '#383f47');
        r.style.setProperty('--BGcolor', '#242B33');
        r.style.setProperty('--itemsColor', '#383f47');
        r.style.setProperty('--textColor', 'azure');
        r.style.setProperty('--placeholderColor', 'rgba(240, 255, 255, 0.5)');
        switchCircle.style.transform = 'translate(0, 0)';
        switchCircle.style.content = 'url(moon.png)';
    }
}
