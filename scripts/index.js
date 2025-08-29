const img = document.querySelector('.intro-image');
img.addEventListener('click', () => {
  img.classList.remove('spin');
  void img.offsetWidth;
  img.classList.add('spin');
});
/*
const autoTextHTML = document.querySelector('.auto-text');
const verticalBarBlinkHTML = document.querySelector('.vertical-bar-blink');

const autoTextOptions = [
  'Engineering',
  'Designing',
  'Coding',
  'Developing',
  'Researching',
  'Scoping',
  'Reviewing',
  'Creating',
  'Enhancing',
  'Ideating',
  'Implementing',
  'Workshopping'
]
let autoText = '';
let i1 = 0;
let i2 = 0;

//startAutoText
//chooseAutoText < loop start
//short delay
//stop vertical blinking
//typeAutoText
//resume vertical blinking
//short delay
//stop vertical blinking
//eraseAutoText
//resume vertical blinking
//chooseAutoText < loop start

function chooseAutoText() {
  if (i1 < autoTextOptions.length) {
    autoText = autoTextOptions[i1];
    i1++;
  } else {
    i1 = 0;
    autoText = autoTextOptions[i1];
    i1++;
  }
}

async function typeAutoText() {
  if (i2 < autoText.length) {
    autoTextHTML.innerHTML += autoText[i2];
    i2++;
    setTimeout(typeAutoText, 80);
  } else {
    i2 = 0;
    chooseAutoText();
    setTimeout(eraseAutoText, 2000);
  }
}

async function eraseAutoText() {
  if (autoTextHTML.innerHTML.length != 0) {
    autoTextHTML.innerHTML = autoTextHTML.innerHTML.slice(0, -1);
    setTimeout(eraseAutoText, 60);
  } else {
    setTimeout(typeAutoText, 300);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function verticalBarBlink() {
  await sleep(1000);
  verticalBarBlinkHTML.innerHTML = '&nbsp;';
  await sleep(400);
  verticalBarBlinkHTML.innerHTML = '|';
  setTimeout(verticalBarBlink, 80);
}

verticalBarBlink();
chooseAutoText();
typeAutoText();
*/