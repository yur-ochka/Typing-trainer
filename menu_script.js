themeSwitch.addEventListener('click', () => {
  checkColors();
});

let remainingTime = 75;
const timeRange = document.querySelector('.chooseTime');
const chosenTime = document.querySelector('.chosenTime');
timeRange.addEventListener('input', (event) => {
  chosenTime.innerHTML = `${event.target.value}s`;
  remainingTime = event.target.value;
});

const goToMain = () => {
  window.location.href = 'main.html?remainingTime=' + remainingTime + '&colorChecked=' + themeSwitch.checked;
};
