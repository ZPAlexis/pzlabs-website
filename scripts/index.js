const img = document.querySelector('.intro-image');
img.addEventListener('click', () => {
  img.classList.remove('spin');
  void img.offsetWidth;
  img.classList.add('spin');
});

const autoTextHTML = document.querySelector('.auto-text');
const verticalBarBlinkHTML = document.querySelector('.vertical-bar-blink');

const autoText = "Creating";
let i = 0;

//add letter up to the last letter of the word, each at a time, with a quick delay between them
//blink dash | at the end for a few seconds
//delete each letter of the word, even quicker delay between deletes
//repeat for each word
//then loop through list again

async function typeAutoText() {
//vertical bar blink
//blink dash out and in once, control delay
//start first letter of the first word
  if (i < autoText.length) {
    autoTextHTML.innerHTML += autoText[i];
    i++;
    setTimeout(typeAutoText, 80);
  } else {
    i = 0;
    setTimeout(eraseAutoText, 3000);
  }
}

async function eraseAutoText() {
  if (autoTextHTML.innerHTML.length != 0) {
    autoTextHTML.innerHTML = autoTextHTML.innerHTML.slice(0, -1);
    setTimeout(eraseAutoText, 80);
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
typeAutoText();