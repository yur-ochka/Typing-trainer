const themeSwitch = document.querySelector('.switch__input');
const onPageLoad = () => {
  themeSwitch.checked = getParameterByName('colorChecked') === 'true';
  checkColors();
};

const goToMenu = () => {
  window.location.href = 'menu.html?colorChecked=' + themeSwitch.checked;
};

const switchCircle = document.querySelector('.circle');
window.switchCircle = switchCircle;

window.addEventListener('load', onPageLoad);
document.addEventListener('DOMContentLoaded', onPageLoad);
const root = document.querySelector(':root');

const lightTheme = {
  colorOnClick: '#FFA04D',
  colorOnKeyup: '#FFC999',
  BGcolor: '#FFE2C7',
  itemsColor: '#FFC999',
  textColor: '#6F3C0B',
  placeholderColor: 'rgba(111, 60, 11, 0.6)',
  translate: 'translate(130%, 0)',
  picture: 'url(sun.png)'
};
const darkTheme = {
  colorOnClick: '#1e2125',
  colorOnKeyup: '#383f47',
  BGcolor: '#242B33',
  itemsColor: '#383f47',
  textColor: 'azure',
  placeholderColor: 'rgba(240, 255, 255, 0.5)',
  translate: 'translate(0, 0)',
  picture: 'url(moon.png)'
};
const applyTheme = (root, theme) => {
  for (const property of Object.keys(theme)) {
    const propertyName = '--' + property;
    root.style.setProperty(propertyName, theme[property]);
  }
  switchCircle.style.transform = theme.translate;
  switchCircle.style.content = theme.picture;
};
const checkColors = () => {
  const theme = themeSwitch.checked ? lightTheme : darkTheme;
  applyTheme(root, theme);
};

const getParameterByName = (name) => {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
};

window.getParameterByName = getParameterByName;
window.checkColors = checkColors;
