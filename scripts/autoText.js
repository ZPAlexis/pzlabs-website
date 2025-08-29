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
];

let autoText = '';
let i1 = 0;

function chooseAutoText() {
  autoText = autoTextOptions[i1];
  i1 = (i1 + 1) % autoTextOptions.length;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ----------------
// Blink Controller
// ----------------
let blinkActive = true;

async function verticalBarBlink() {
  while (true) {
    if (blinkActive) {
      verticalBarBlinkHTML.innerHTML = '|';
      await sleep(600);
      verticalBarBlinkHTML.innerHTML = '&nbsp;';
      await sleep(400);
    } else {
      // while disabled, just ensure bar is visible and check again
      verticalBarBlinkHTML.innerHTML = '|';
      await sleep(300);
    }
  }
}

// ----------------
// Typing Logic
// ----------------
async function typeAutoText() {
  for (let i = 0; i < autoText.length; i++) {
    autoTextHTML.innerHTML += autoText[i];
    await sleep(80);
  }
}

async function eraseAutoText() {
  while (autoTextHTML.innerHTML.length > 0) {
    autoTextHTML.innerHTML = autoTextHTML.innerHTML.slice(0, -1);
    await sleep(60);
  }
}

// ----------------
// Main Orchestrator
// ----------------
async function startAutoText() {
  chooseAutoText();

  while (true) {
    await sleep(1000); // short delay before typing

    blinkActive = false;        // stop blinking while typing
    await typeAutoText();
    blinkActive = true;         // resume blinking

    await sleep(2200);          // pause with word visible

    blinkActive = false;        // stop blinking while erasing
    await eraseAutoText();
    blinkActive = true;         // resume blinking
    
    chooseAutoText();           // pick next word

  }
}

// ----------------
// Start Everything
// ----------------
verticalBarBlink();
startAutoText();

// PROMPT
/*
I have a typewriter effect logic in JS for my website that I'd like to improve. Currently, it runs with setTimeout callbacks on the typeAutoText and verticalBarBlink functions. Howevever, I would like to stop the blinking "animation" while the word is being typed and while it is being erased. One way I thought of doing that was to control the whole logic with a single function that goes step by step. //startAutoText //chooseAutoText < loop start //short delay //stop vertical blinking //typeAutoText //resume vertical blinking //short delay //stop vertical blinking //eraseAutoText //resume vertical blinking //chooseAutoText < loop start How can I do that?
*/