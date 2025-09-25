import { fadeUpdate } from './rock-paper-scissors.js';

const button = document.querySelector('.cover-btn');
const boxImg = button.querySelector('.js-cover-box');
const coinImg = button.querySelector('.js-cover-coin');
const coinAmount = document.querySelector('.js-coin-amount');
const fillBarGoldCoin = document.querySelector('.js-fill-bar-collected-coin');
const fillBarGrayCoin = document.querySelector('.js-fill-bar-gray-coin');
const fillBarBorder = document.querySelector('.js-fill-bar-container');
const fillBarText = document.querySelector('.fill-bar-text');
const summaryCoinBorder = document.querySelector('.js-coin-summary');
const summaryCoin = document.querySelector('.js-gold-coin-container');
const coverCoinScrollText = document.querySelector('.js-cover-coin-collected-text');

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
    triggerSummaryAnimations();
    fadeUpdate(coinAmount, `${coinsCollected} / ${totalCoins}`);
  }
}

coinImg.addEventListener('animationend', (e) => {
  if (e.animationName === 'coinSpin') {
    coinImg.classList.remove('spin');
    coinImg.classList.add('idle');
  }
  if (e.animationName === 'coinCollect') {
    coinImg.classList.add('idle');
  }
});

button.addEventListener('click', () => {
  if (!coinsCollectedFlags.cover) {
    boxImg.classList.remove('idle');
    boxImg.classList.add('open');
    coinImg.classList.add('visible');
    coverCoinScrollText.classList.add('collected');

    coinsCollectedFlags.cover = true;
    calculateCoinAmount();
  } else {
    coinImg.classList.remove('idle');
    coinImg.classList.remove('spin');
    void coinImg.offsetWidth;
    coinImg.classList.add('spin');

    coverCoinScrollText.classList.remove('collected');
    void coverCoinScrollText.offsetWidth;
    coverCoinScrollText.classList.add('collected');
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

  setTimeout(() => {
    fillBarText.classList.add('show');
  }, 100);

  setTimeout(() => {
    fillBarBorder.classList.remove('highlight');
    isAnimatingFillBar = false;
  }, 600);
}

function triggerSummaryAnimations() {
  summaryCoin.classList.remove('spin');
  void summaryCoin.offsetWidth;
  summaryCoin.classList.add('spin');
}


calculateCoinAmount();