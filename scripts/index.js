import { fadeUpdate, resetRPSScore } from './rock-paper-scissors.js';

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
const fillBarText = document.querySelector('.js-fill-bar-text');

//Rock Paper Scissors
const rpsGoldCoin = document.querySelector('.js-rps-collected-coin');
const rpsGrayCoin = document.querySelector('.js-rps-gray-coin');
const rpsBarBorder = document.querySelector('.js-rps-bar-container');
const rpsBarText = document.querySelector('.js-rps-bar-text');

//Summary Header
const summaryCoinContainer = document.querySelector('.js-coin-summary');
const summaryCoin = document.querySelector('.js-gold-coin-container');
const summaryOverlay = document.querySelector('.js-summary-menu-overlay');
const summaryCloseButton = document.querySelector('.js-summary-close-btn');

//Summary Menu
const summaryMenuCoinAmount = document.querySelector('.js-coin-summary-amount');
const summaryMenuCoinCollectedCover = document.querySelector('.js-summary-menu-cover-gold-coin'); 
const summaryMenuCoinCollectedFillbar = document.querySelector('.js-summary-menu-fillbar-gold-coin'); 
const summaryMenuCoinCollectedRPS = document.querySelector('.js-summary-menu-rps-gold-coin'); 
const summaryMenuCoverText = document.querySelector('.js-summary-menu-cover-text');
const summaryMenuFillbarText = document.querySelector('.js-summary-menu-fillbar-text');
const summaryMenuRPSText = document.querySelector('.js-summary-menu-rps-text');
const summaryMenuRPSStats = document.querySelector('.js-summary-menu-rps-stats');
const summaryMenuResetScoreButton = document.querySelector('.js-summary-reset-score-button'); 
const summaryMenuLockIcons = document.querySelectorAll('.js-summary-lock-icon');
const summaryMenuUnlockText = document.querySelector('.js-summary-unlock-text');

const defaultCoinFlags = {
  cover: false,
  fillBar: false,
  rps: false
};

const coinsCollectedFlags = { ...defaultCoinFlags };

const saved = localStorage.getItem('coinFlags');
if (saved) {
  Object.assign(coinsCollectedFlags, JSON.parse(saved));
}

export function calculateCoinAmount() {
  const totalCoins = Object.keys(coinsCollectedFlags).length;
  const coinsCollected = Object.values(coinsCollectedFlags).filter(Boolean).length;
  coinAmount.innerHTML = `${coinsCollected} / ${totalCoins}`;
  summaryMenuCoinAmount.innerHTML = `${coinsCollected} / ${totalCoins}`;
  
  if (coinsCollected != 0) {
    summaryCoinContainer.classList.remove('hidden');
    triggerSummaryAnimations();
    fadeUpdate(coinAmount, `${coinsCollected} / ${totalCoins}`);
  }

  updateSummaryMenu(coinsCollected, totalCoins);
}

function setClassByCondition(element, condition, className) {
  element.classList.toggle(className, condition);
}

function updateSummaryMenu(coinsCollected, totalCoins) {
  setClassByCondition(summaryMenuCoinAmount, coinsCollected === totalCoins, 'textHighlight');

  const flagMapping = {
    cover: [
      summaryMenuCoinCollectedCover,
      summaryMenuCoverText,
    ],
    fillBar: [
      summaryMenuCoinCollectedFillbar,
      summaryMenuFillbarText,
    ],
    rps: [
      summaryMenuCoinCollectedRPS,
      summaryMenuRPSText,
      summaryMenuRPSStats,
    ],
  };

  Object.entries(flagMapping).forEach(([flag, elements]) => {
    elements.forEach(el =>
      setClassByCondition(el, !coinsCollectedFlags[flag], 'hidden')
    );
  });

  const allCoinsCollected = coinsCollected === totalCoins;
  summaryMenuResetScoreButton.disabled = !allCoinsCollected;
  setClassByCondition(summaryMenuResetScoreButton, !allCoinsCollected, 'locked');

  summaryMenuLockIcons.forEach(el =>
    setClassByCondition(el, coinsCollected === totalCoins, 'hidden')
  );
  setClassByCondition(summaryMenuUnlockText, coinsCollected === totalCoins, 'hidden');
}

function refreshIndex() {
  setClassByCondition(coverBoxImg, !coinsCollectedFlags.cover, 'idle');
  setClassByCondition(coverBoxImg, coinsCollectedFlags.cover, 'hidden');
  setClassByCondition(coverCoinImg, coinsCollectedFlags.cover, 'collect');
  setClassByCondition(coverCoinImg, coinsCollectedFlags.cover, 'idle');
  setClassByCondition(coverCoinScrollText, coinsCollectedFlags.cover, 'collected');

  if (!coinsCollectedFlags.cover) {
    coverBoxImg.classList.remove('open');
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

export function restartAnimation(el, className) {
  el.classList.remove(className);
  void el.offsetWidth;
  el.classList.add(className);
}

export function highlightSummaryCoinContainer() {
  restartAnimation(summaryCoinContainer, 'highlight');
}

coverButton.addEventListener('click', () => {
  if (!coinsCollectedFlags.cover) {
    coverBoxImg.classList.remove('idle');
    coverBoxImg.classList.add('open');
    coverCoinImg.classList.add('collect');
    coverCoinScrollText.classList.add('collected');

    coinsCollectedFlags.cover = true;
    localStorage.setItem('coinFlags', JSON.stringify(coinsCollectedFlags));
    calculateCoinAmount();
  } else {
    coverCoinImg.classList.remove('idle');
    restartAnimation(coverCoinImg, 'spin');
    restartAnimation(coverCoinScrollText, 'collected');
    highlightSummaryCoinContainer();
  }
});

summaryCoinContainer.addEventListener('click', () => {
  summaryOverlay.classList.toggle('hidden');
  document.body.classList.toggle('no-scroll');
  summaryCoinContainer.classList.toggle('hidden');
});

summaryCloseButton.addEventListener('click', () => {
  summaryOverlay.classList.toggle('hidden');
  document.body.classList.toggle('no-scroll');
  summaryCoinContainer.classList.toggle('hidden');
});

summaryMenuResetScoreButton.addEventListener('click', () => {
  summaryOverlay.classList.toggle('hidden');
  document.body.classList.toggle('no-scroll');
  summaryCoinContainer.classList.toggle('hidden');
  resetCoins();
});


export function collectFillBarCoin() {
  if (!coinsCollectedFlags.fillBar) {
    fillBarGrayCoin.classList.add('hidden');
    fillBarGoldCoin.classList.remove('hidden');
    coinsCollectedFlags.fillBar = true;
    localStorage.setItem('coinFlags', JSON.stringify(coinsCollectedFlags));
    calculateCoinAmount();
    triggerFillBarAnimations();
  } else {
    triggerFillBarAnimations();
    highlightSummaryCoinContainer();
  }
}

let isAnimatingFillBar = false;

function triggerFillBarAnimations() {
  if (isAnimatingFillBar) return;
  isAnimatingFillBar = true;

  fillBarBorder.classList.add('highlight');
  restartAnimation(fillBarGoldCoin, 'spin');
    
  fillBarText.classList.remove('show');
  fillBarText.innerHTML = 'Coin Collected!';
  void fillBarText.offsetWidth;
  fillBarText.classList.add('show');

  setTimeout(() => {
    isAnimatingFillBar = false;
  }, 300);
}

export function collectRPSCoin() {
  if (!coinsCollectedFlags.rps) {
    coinsCollectedFlags.rps = true;
    localStorage.setItem('coinFlags', JSON.stringify(coinsCollectedFlags));
    calculateCoinAmount();
  }
}

function saveCoinFlags() {
  localStorage.setItem('coinFlags', JSON.stringify(coinsCollectedFlags));
}

export function resetCoins() {
  Object.assign(coinsCollectedFlags, defaultCoinFlags);
  saveCoinFlags();

  resetRPSScore();
  refreshIndex();
  calculateCoinAmount();
  
  //reset fillbar status
}

function triggerSummaryAnimations() {
  restartAnimation(summaryCoin, 'spin');
  highlightSummaryCoinContainer();
}

refreshIndex();
calculateCoinAmount();