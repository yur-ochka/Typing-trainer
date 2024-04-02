window.addEventListener("load", onPageLoad);
document.addEventListener("DOMContentLoaded", onPageLoad);

const themeSwitch = document.querySelector(".switch__input");
var r = document.querySelector(':root');
const switchCircle = document.querySelector(".circle");
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

let remainingTime = 75;
let timeRange = document.querySelector(".chooseTime");
let chosenTime = document.querySelector(".chosenTime");
timeRange.addEventListener('input', function(event){
    chosenTime.innerHTML = `${event.target.value}s`;
    remainingTime = event.target.value;
});

let goToMain = () =>{
    window.location.href = 'main.html?remainingTime=' + remainingTime + '&colorChecked=' + themeSwitch.checked;
};

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
}