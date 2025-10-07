const coverTextHTML = document.querySelector('.js-cover-text');
const coverBarBlinkHTML = document.querySelector('.js-cover-bar-blink');

const listText1HTML = document.querySelector('.js-list-text-1');
const listText2HTML = document.querySelector('.js-list-text-2');
const listText3HTML = document.querySelector('.js-list-text-3');
const listBarBlinkHTML = document.querySelectorAll('.js-list-bar-blink');

const targets = document.querySelectorAll('.js-list-text-1, .js-list-text-2, .js-list-text-3');


const coverTextOptions = [
  'Creating',
  'Engineering',
  'Designing',
  'Scoping',
  'Researching',
  'Mapping',
  'Coding',
  'Implementing',
  'Testing',
  'Iterating'
];

let coverText = '';
let i1 = 0;

function chooseCoverText() {
  coverText = coverTextOptions[i1];
  i1 = (i1 + 1) % coverTextOptions.length;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ----------------
// Blink Controller
// ----------------
let coverBlinkActive = true;

async function startCoverBarBlink() {
  while (true) {
    if (coverBlinkActive) {
      coverBarBlinkHTML.innerHTML = '|';
      await sleep(800);
      coverBarBlinkHTML.innerHTML = '&nbsp;';
      await sleep(400);
    } else {
      coverBarBlinkHTML.innerHTML = '|';
      await sleep(400);
    }
  }
}

async function startListBarBlink() {
  while (true) {
    listBarBlinkHTML.forEach(el => el.innerHTML = '|');
    await sleep(800);
    listBarBlinkHTML.forEach(el => el.innerHTML = '&nbsp;');
    await sleep(400);
  }
}

// ----------------
// Typing Logic
// ----------------
async function typeText(textString, html, ms) {
  for (let i = 0; i < textString.length; i++) {
    html.innerHTML += textString[i];
    await sleep(ms);
  }
}

async function eraseCoverText() {
  while (coverTextHTML.innerHTML.length > 0) {
    coverTextHTML.innerHTML = coverTextHTML.innerHTML.slice(0, -1);
    await sleep(60);
  }
}

// ----------------
// Main Orchestrator
// ----------------
async function startCoverText() {
  chooseCoverText();

  while (true) {
    await sleep(1000);

    blinkActive = false;
    await typeText(coverText, coverTextHTML, 80);
    blinkActive = true;

    await sleep(2200);

    blinkActive = false;
    await eraseCoverText();
    blinkActive = true;
    
    chooseCoverText();
  }
}

const autoTextObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startListText(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.8 });

targets.forEach(target => autoTextObserver.observe(target));

function startListText(element) {
  const text = element.dataset.text;
  typeText(text, element, 60);
}

startCoverBarBlink();
startCoverText();
startListBarBlink();