const container = document.querySelector('.container');
let remainingTime = getParameterByName('remainingTime');

const typingProperties = {
  charNumber: 0,
  countMistakes: 0,
  expiredTime: 0,
  countPrintedChars: 0,
  typingSpeed: 0
};

const pageDiv = {
  mistakes: document.querySelector('.mistakes'),
  time: document.querySelector('.time'),
  speed: document.querySelector('.speed'),
  charsCount: document.querySelector('.charsCount')
};

pageDiv.time.innerHTML = `Remaining time: ${remainingTime}s`;

let interval = null;

const mainKeys = ['Tab', 'Backspace', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight'];

const addKeysToRow = (rowDiv, keys, keysText, row) => {
  for (const keyInRow of row) {
    const keyDiv = document.createElement('div');
    const rowIndex = keys.indexOf(row);
    const keyIndex = row.indexOf(keyInRow);
    if (mainKeys.includes(keyInRow) || keyInRow !== keysText[rowIndex][keyIndex] || keyInRow === 'Space') {
      keyDiv.classList.add(keyInRow);
    } else {
      keyDiv.classList.add('Key' + keyInRow);
    }
    keyDiv.textContent = keysText[rowIndex][keyIndex];
    rowDiv.appendChild(keyDiv);
  }
};
const generateKeyboard = () => {
  const keyboardDiv = document.createElement('div');
  keyboardDiv.classList.add('keyboard');
  const keys = [
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'BracketLeft', 'BracketRight', 'Backspace'],
    ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Semicolon', 'Quote', 'Backslash', 'Enter'],
    ['ShiftLeft', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Comma', 'Period', 'Slash', 'ShiftRight'],
    ['Space']
  ];
  const keysText = [
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', 'Backspace'],
    ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', "'", '\\', 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
    ['']
  ];
  for (const row of keys) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('keyboard-row');
    addKeysToRow(rowDiv, keys, keysText, row);
    keyboardDiv.appendChild(rowDiv);
  }
  return keyboardDiv;
};

container.appendChild(generateKeyboard());
const textHintArea = document.querySelector('#hintArea');

const handleKeyPress = (event) => {
  if (document.querySelector('#typingArea') === document.activeElement) {
    if (!interval) {
      interval = setInterval(updateInfo, 1000);
    }
    const keyCode = event.code;
    console.log('Key pressed:', keyCode);
    const key = document.querySelector(`.${keyCode}`);
    key.style.background = root.style.getPropertyValue('--colorOnClick');
    if (event.key === 'Backspace') {
      event.preventDefault();
    }
    checkCharacter(event);
  }
};

const checkCharacter = (event) => {
  if (textHintArea.value[typingProperties.charNumber] === event.key) {
    typingProperties.charNumber++;
    typingProperties.countPrintedChars++;
    pageDiv.charsCount.innerHTML = `Printed chars: ${typingProperties.countPrintedChars}`;
  } else {
    handleMistake(event);
  }
};

const handleMistake = (event) => {
  const keyCode = event.code;
  const key = document.querySelector(`.${keyCode}`);
  if (!mainKeys.includes(keyCode)) {
    key.style.background = 'red';
    typingProperties.countMistakes++;
    pageDiv.mistakes.innerHTML = `Mistakes: ${typingProperties.countMistakes}`;
  }
  event.preventDefault();
};

document.addEventListener('keydown', handleKeyPress);

document.addEventListener('keyup', keyUp = (event) => {
  const keyCode = event.code;
  console.log('Key released:', keyCode);
  const key = document.querySelector(`.${keyCode}`);
  key.style.background = root.style.getPropertyValue('--colorOnKeyup');
});

const updateInfo = () => {
  remainingTime--;
  typingProperties.expiredTime++;
  pageDiv.time.innerHTML = `Remaining time: ${remainingTime}s`;
  if (remainingTime === 0 || textHintArea.value.length === typingProperties.charNumber) {
    clearInterval(interval);
    document.querySelector('#typingArea').disabled = true;
    countSpeed();
  }
};

const countSpeed = () => {
  typingProperties.typingSpeed = roundToTwoDecimalPlaces(typingProperties.countPrintedChars / (typingProperties.expiredTime / 60));
  pageDiv.speed.innerHTML = `Chars per minute: ${typingProperties.typingSpeed}`;
};

const roundToTwoDecimalPlaces = (number) => Math.round(number * 100) / 100;

themeSwitch.addEventListener('click', () => {
  const keyboard = document.querySelector('.keyboard');
  container.removeChild(keyboard);
  container.appendChild(generateKeyboard());
  checkColors();
});
