import { fadeUpdate, resetRPSScore } from './rock-paper-scissors.js';
import { bestTimer, resetFillBarTimers, triggerFillBarAnimations } from './fillBar.js';

//Language Change
const languageBtnPT = document.querySelector('.js-pt-locale');
const languageBtnEN = document.querySelector('.js-en-locale');

//Cover Coin
const coverButton = document.querySelector('.cover-btn');
const coverBoxImg = coverButton.querySelector('.js-cover-box');
const coverCoinContainer = coverButton.querySelector('.js-coin-container');
const coverCoinIdleGif = coverButton.querySelector('.js-coin-idle');
const coverCoinSpinGif = coverButton.querySelector('.js-coin-spin');
const coinAmount = document.querySelector('.js-coin-amount');
const coverCoinScrollText = document.querySelector('.js-cover-coin-collected-text');

//Rock Paper Scissors
const rpsGoldCoin = document.querySelector('.js-rps-collected-coin');
const rpsGrayCoin = document.querySelector('.js-rps-gray-coin');
const rpsBarBorder = document.querySelector('.js-rps-bar-container');
const rpsBarText = document.querySelector('.js-rps-bar-text');

//Summary Header
const summaryCoinContainer = document.querySelector('.js-coin-summary');
const coinSummaryTrigger = document.querySelectorAll('.js-trigger-coin-summary');
const summaryCoin = document.querySelector('.js-gold-coin-container');
const summaryOverlay = document.querySelector('.js-summary-menu-overlay');
const summaryCloseButton = document.querySelector('.js-summary-close-btn');

//Summary Menu
const summaryMenuCoinCollectedCover = document.querySelector('.js-summary-menu-cover-gold-coin'); 
const summaryMenuCoinCollectedFillbar = document.querySelector('.js-summary-menu-fillbar-gold-coin'); 
const summaryMenuCoinCollectedRPS = document.querySelector('.js-summary-menu-rps-gold-coin'); 
const summaryMenuCoverText = document.querySelector('.js-summary-menu-cover-text');
const summaryMenuFillbarText = document.querySelector('.js-summary-menu-fillbar-text');
const summaryMenuBestTimer = document.querySelector('.js-fill-bar-best-timer');
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

  summaryMenuBestTimer.textContent = bestTimer !== null ? `${bestTimer}s` : '---';

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
  setClassByCondition(coverCoinContainer, coinsCollectedFlags.cover, 'idle');
  setClassByCondition(coverCoinScrollText, coinsCollectedFlags.cover, 'collected');

  if (!coinsCollectedFlags.cover) {
    coverBoxImg.classList.remove('open');
  }

  triggerFillBarAnimations(coinsCollectedFlags.fillBar);
}

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
    coverCoinContainer.classList.add('idle');
    playCoinSpinAnimation();
    coverCoinScrollText.classList.add('collected');

    coinsCollectedFlags.cover = true;
    localStorage.setItem('coinFlags', JSON.stringify(coinsCollectedFlags));
    calculateCoinAmount();
  } else if (!coinIsSpinning) {
    playCoinSpinAnimation();
    restartAnimation(coverCoinScrollText, 'collected');
    highlightSummaryCoinContainer();
  }
});

let coinIsSpinning = false;

const idleUrl = 'icons/coin_idle.gif';
const spinUrl = 'icons/coin_spin.gif';

const idleImage = new Image();
idleImage.src = idleUrl;

const spinImage = new Image();
spinImage.src = spinUrl;

function playCoinSpinAnimation() {
  if (coinIsSpinning) return;
  coinIsSpinning = true;

  const FADE_DURATION = 100;
  const SPIN_DURATION = 3000;

  Promise.all([
    idleImage.complete ? Promise.resolve() : new Promise(res => idleImage.onload = res),
    spinImage.complete ? Promise.resolve() : new Promise(res => spinImage.onload = res)
  ]).then(() => {
    coverCoinSpinGif.style.opacity = '1';
    coverCoinSpinGif.src = spinUrl;
    coverCoinIdleGif.style.opacity = '0';

    setTimeout(() => {
      coverCoinIdleGif.src = '';
    }, FADE_DURATION);

    setTimeout(() => {
      setTimeout(() => {
        coverCoinSpinGif.src = '';
      }, FADE_DURATION);
      coverCoinIdleGif.src = idleUrl;
      coverCoinIdleGif.style.opacity = '1';
      coverCoinSpinGif.style.opacity = '0';
      coinIsSpinning = false;
    }, SPIN_DURATION);
  });
}

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

const triggerCoinSummaryObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      summaryCoinContainer.classList.remove('hidden');
    
      const handleTransitionEnd = (e) => {
        if (e.target === el && (e.propertyName === 'transform' || e.propertyName === 'opacity')) {
          el.classList.remove('js-trigger-coin-summary');
          el.removeEventListener('transitionend', handleTransitionEnd);
        }
      };

      el.addEventListener('transitionend', handleTransitionEnd);

      triggerCoinSummaryObserver.unobserve(el);
    }
  });
});

coinSummaryTrigger.forEach(el => triggerCoinSummaryObserver.observe(el));

export function collectFillBarCoin() {
  if (!coinsCollectedFlags.fillBar) {
    coinsCollectedFlags.fillBar = true;
    localStorage.setItem('coinFlags', JSON.stringify(coinsCollectedFlags));
    calculateCoinAmount();
  } else {
    highlightSummaryCoinContainer();
  }
  triggerFillBarAnimations(coinsCollectedFlags.fillBar);
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

  resetFillBarTimers();
  resetRPSScore();
  refreshIndex();
  calculateCoinAmount();
}

function triggerSummaryAnimations() {
  restartAnimation(summaryCoin, 'spin');
  highlightSummaryCoinContainer();
}

function changeLanguage(lng) {
  i18next.changeLanguage(lng, () => {
    updateContent();
  });
}

languageBtnEN.addEventListener('click', () => {
  changeLanguage('en');
});

languageBtnPT.addEventListener('click', () => {
  changeLanguage('pt');
});


refreshIndex();
calculateCoinAmount();