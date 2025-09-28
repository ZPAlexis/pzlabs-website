import { fadeUpdate } from './rock-paper-scissors.js';

//Cover Coin
const coverButton = document.querySelector('.cover-btn');
const coverBoxImg = coverButton.querySelector('.js-cover-box');
const coverCoinImg = coverButton.querySelector('.js-cover-coin');
const coinAmount = document.querySelector('.js-coin-amount');
const coverCoinScrollText = document.querySelector('.js-cover-coin-collected-text');

//Fill Bar
const fillBarGoldCoin = document.querySelector('.js-fill-bar-collected-coin');
const fillBarGrayCoin = document.querySelector('.js-fill-bar-gray-coin');
const fillBarBorder = document.querySelector('.js-fill-bar-container');
const fillBarText = document.querySelector('.fill-bar-text');

//Summary Header
const summaryCoinContainer = document.querySelector('.js-coin-summary');
const summaryCoin = document.querySelector('.js-gold-coin-container');

const coinsCollectedFlags = {
  cover: false,
  fillBar: false,
  rps: false
};

export function calculateCoinAmount() {
  const totalCoins = Object.keys(coinsCollectedFlags).length;
  const coinsCollected = Object.values(coinsCollectedFlags).filter(Boolean).length;
  coinAmount.innerHTML = `${coinsCollected} / ${totalCoins}`;
  
  if (coinsCollected != 0) {
    summaryCoinContainer.classList.remove('hidden');
    triggerSummaryAnimations();
    fadeUpdate(coinAmount, `${coinsCollected} / ${totalCoins}`);
  }
}

coverCoinImg.addEventListener('animationend', (e) => {
  if (e.animationName === 'coinUpSpin' || e.animationName === 'coinCollect') {
    coverCoinImg.classList.remove('spin');
    coverCoinImg.style.transform = '';
    requestAnimationFrame(() => {
      restartAnimation(coverCoinImg, 'idle');
    });
  }
});

function restartAnimation(el, className) {
  el.classList.remove(className);
  void el.offsetWidth;
  el.classList.add(className);
}

coverButton.addEventListener('click', () => {
  if (!coinsCollectedFlags.cover) {
    coverBoxImg.classList.remove('idle');
    coverBoxImg.classList.add('open');
    coverCoinImg.classList.add('visible');
    coverCoinScrollText.classList.add('collected');

    coinsCollectedFlags.cover = true;
    calculateCoinAmount();
  } else {
    coverCoinImg.classList.remove('idle');
    restartAnimation(coverCoinImg, 'spin');

    restartAnimation(coverCoinScrollText, 'collected');

    restartAnimation(summaryCoinContainer, 'highlight');
  }
});

export function collectFillBarCoin() {
  if (!coinsCollectedFlags.fillBar) {
    fillBarGrayCoin.classList.add('hidden');
    fillBarGoldCoin.classList.remove('hidden');
    coinsCollectedFlags.fillBar = true;
    calculateCoinAmount();
    triggerFillBarAnimations();
  } else {
    triggerFillBarAnimations();
    summaryCoinContainer.classList.remove('highlight');
    void summaryCoin.offsetWidth;
    summaryCoinContainer.classList.add('highlight');
  }
}

let isAnimatingFillBar = false;

function triggerFillBarAnimations() {
  if (isAnimatingFillBar) return;
  isAnimatingFillBar = true;

  fillBarBorder.classList.add('highlight');
  fillBarGoldCoin.classList.remove('spin');
  void fillBarGoldCoin.offsetWidth;
  fillBarGoldCoin.classList.add('spin');
    
  fillBarText.classList.remove('show');
  fillBarText.innerHTML = 'Coin Collected!';
  void fillBarText.offsetWidth;
  fillBarText.classList.add('show');

  setTimeout(() => {
    isAnimatingFillBar = false;
  }, 300);
}

function triggerSummaryAnimations() {
  summaryCoin.classList.remove('spin');
  void summaryCoin.offsetWidth;
  summaryCoin.classList.add('spin');

  summaryCoinContainer.classList.remove('highlight');
  void summaryCoin.offsetWidth;
  summaryCoinContainer.classList.add('highlight');
}


calculateCoinAmount();