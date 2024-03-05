document.addEventListener('keydown', function(event) {
    var keyCode = event.code;
    console.log('Key pressed:', keyCode);
    const key = document.querySelector(`.${keyCode}`);
    key.style.background = `#1e2125`;
});

document.addEventListener('keyup', function(event) {
    var keyCode = event.code;
    console.log('Key released:', keyCode);
    const key = document.querySelector(`.${keyCode}`);
    key.style.background = `#383f47`;
});
