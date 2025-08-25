const img = document.querySelector('.intro-image');
img.addEventListener('click', () => {
  img.classList.remove('spin');
  void img.offsetWidth;
  img.classList.add('spin');
});

let autoTextHTML = '';
const verticalBarBlinkHTML = document.querySelector('.vertical-bar-blink');
const autoTextOptions = [
  'Text 1',
  'Text 2',
  'Text 3'
];

/*autoTextOptions.forEach((textOption) => {
  autoTextHTML += textOption + ' ';
});

//document.querySelector('.intro-auto-text')
  .innerHTML = autoTextHTML;*/

//add letter up to the last letter of the word, each at a time, with a quick delay between them
//blink dash | at the end for a few seconds
//delete each letter of the word, even quicker delay between deletes
//repeat for each word
//then loop through list again

async function autoText() {
//vertical bar blink
//blink dash out and in once, control delay
//start first letter of the first word
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function verticalBarBlink() {
  await sleep(600);
  verticalBarBlinkHTML.innerHTML = '&nbsp;';
  await sleep(300);
  verticalBarBlinkHTML.innerHTML = '|';
};

verticalBarBlink();