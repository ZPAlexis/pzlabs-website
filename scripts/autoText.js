const coverTextHTML = document.querySelector('.js-cover-text');
const coverBarBlinkHTML = document.querySelector('.js-cover-bar-blink');

const listText1HTML = document.querySelector('.js-list-text-1');
const listText2HTML = document.querySelector('.js-list-text-2');
const listText3HTML = document.querySelector('.js-list-text-3');
const listBarBlinkHTML = document.querySelectorAll('.js-list-bar-blink');

const target = document.querySelector('.about-focus-list-container');

const coverTextOptions = [
  'Creating',
  'Engineering',
  'Designing',
  'Coding',
  'Developing',
  'Researching',
  'Scoping',
  'Reviewing',
  'Enhancing',
  'Implementing'
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

function startListText() {
  typeText('Gamification', listText1HTML, 60);
  typeText('Game elements', listText2HTML, 60);
  typeText('Our focus', listText3HTML, 60);
}

startCoverBarBlink();
startCoverText();
startListBarBlink();

// Intersection Observer setup
const autoTextObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Element is now visible in the viewport
      startListText();
      autoTextObserver.unobserve(entry.target); // run only once
    }
  });
}, {
  threshold: 0.5 // 50% of the element must be visible (tweak as needed)
});

// Attach observer
if (target) {
  autoTextObserver.observe(target);
}