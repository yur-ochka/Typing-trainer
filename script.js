window.addEventListener("load", onPageLoad);
document.addEventListener("DOMContentLoaded", onPageLoad);
const container = document.querySelector('.container');

const goToMenu = () =>{
    console.log("ssdsd");
    window.location.href = 'menu.html?colorChecked=' + themeSwitch.checked;
};

let r = document.querySelector(':root');
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

container.appendChild(generateKeyboard());
const textHintArea = document.querySelector(`#hintArea`);
document.addEventListener('keydown', function(event) {
    if (document.querySelector("#typingArea") == document.activeElement)
    {
        if (firstCharPrinted == false) {
            firstCharPrinted = true;
            interval = setInterval(updateInfo, 1000);      
        }
        const keyCode = event.code;
        console.log('Key pressed:', keyCode);
        const key = document.querySelector(`.${keyCode}`);
        key.style.background = r.style.getPropertyValue('--colorOnClick');
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
    const keyCode = event.code;
    console.log('Key released:', keyCode);
    const key = document.querySelector(`.${keyCode}`);
    key.style.background = r.style.getPropertyValue('--colorOnKeyup');
});

const updateInfo = () =>
{
    remainingTime--;
    expiredTime++;
    time.innerHTML = `Remaining time: ${remainingTime}s`;
    if (remainingTime == 0 || textHintArea.value.length == charNumber) 
    {
        clearInterval(interval);
        document.querySelector(`#typingArea`).disabled = true;
        countSpeed();
    }
}

const countSpeed = () =>
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
    const keyboard = document.querySelector('.keyboard');
    container.removeChild(keyboard);
    container.appendChild(generateKeyboard());
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

function generateKeyboard() {
    let keyboardDiv = document.createElement('div');
    keyboardDiv.classList.add('keyboard');

    let keyRows = [
        ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'BracketLeft', 'BracketRight', 'Backspace'],
        ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Semicolon', 'Quote', 'Backslash', 'Enter'],
        ['ShiftLeft', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Comma', 'Period', 'Slash', 'ShiftRight'],
        ['Space']
    ];
    let keyRowsText = [
        ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', 'Backspace'],
        ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', "'", '\\', 'Enter'],
        ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
        ['']
    ];
    keyRows.forEach(function(rowKeys) {
        let rowDiv = document.createElement('div');
        rowDiv.classList.add('keyboard-row');
        rowKeys.forEach(function(keyLabel) {
            let keyDiv = document.createElement('div');
            if(mainKeys.includes(keyLabel) || keyLabel != keyRowsText[keyRows.indexOf(rowKeys)][rowKeys.indexOf(keyLabel)] || keyLabel == 'Space')
            {            
                console.log(keyLabel);
                keyDiv.classList.add(keyLabel.replace(/\s+/g, ''));
            }
            else 
            {
                keyDiv.classList.add('Key' + keyLabel.replace(/\s+/g, ''));
            }
            keyDiv.textContent = keyRowsText[keyRows.indexOf(rowKeys)][rowKeys.indexOf(keyLabel)];
            rowDiv.appendChild(keyDiv);
        });
        keyboardDiv.appendChild(rowDiv);
    });
    return keyboardDiv;
}