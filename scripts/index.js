const button = document.querySelector('.cover-btn');
const boxImg = button.querySelector('.js-cover-box');
const coinImg = button.querySelector('.js-cover-coin');

let coverCoinCollected = false;

button.addEventListener('click', () => {
  if (!coverCoinCollected) {
    boxImg.classList.remove('idle');
    boxImg.classList.add('open');
    coinImg.classList.add('visible');
    coverCoinCollected = true;
  } else {
    coinImg.classList.remove('spin');
    void coinImg.offsetWidth;
    coinImg.classList.add('spin');
  }
});