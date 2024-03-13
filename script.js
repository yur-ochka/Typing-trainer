let charNumber = 0;
const mainKeys = ["Tab", "Backspace", "CapsLock", "Enter", "ShiftLeft", "ShiftRight"];
document.addEventListener('keydown', function(event) {
    if (document.querySelector("#typingArea") == document.activeElement)
    {
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
        }
        else {
            if (mainKeys.includes(keyCode) != true){
                key.style.background = "red";
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
