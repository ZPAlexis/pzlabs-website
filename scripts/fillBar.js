import { collectFillBarCoin, restartAnimation } from './index.js';

const resetFillBarButton = document.querySelector('.js-fill-bar-reset-button');
const bestTimerText = document.querySelector('.js-fill-bar-best-text');

const fillBarFill = document.querySelector('.js-fill-bar-fill');
const fillBarGoldCoin = document.querySelector('.js-fill-bar-collected-coin');
const fillBarGrayCoin = document.querySelector('.js-fill-bar-gray-coin');
const fillBarBorder = document.querySelector('.js-fill-bar-container');
const fillBarText = document.querySelector('.js-fill-bar-text');
const fillTimerCont = document.querySelector('.js-fill-bar-timer-container');
const fillTimerEl = document.querySelector('.js-fill-bar-timer');

export function resetFillBarTimers() {
  bestTimer = null;
  lastTimer = null;
  localStorage.removeItem('bestTimer');
  localStorage.removeItem('lastTimer');
}

export function fillBar(amount) {
  const fill = document.querySelector('.js-fill-bar-fill');
  const currentWidthStr = fill.style.width || '0%';
  let currentWidth = parseFloat(currentWidthStr);
  
  let newWidth = currentWidth + amount;

  // Clamp between 0 and 100
  newWidth = Math.max(0, Math.min(100, newWidth));

  const isReachingFull = newWidth === 100 && currentWidth < 100;

  fill.style.width = newWidth + '%';

  if (currentWidth == 0) {
    startDecay();
    startTimer();
  } 
  if (isReachingFull) {
    const onTransitionEnd = (e) => {
      if (e.propertyName === 'width') {
        fill.removeEventListener('transitionend', onTransitionEnd);
        collectFillBarCoin();
      }
    };
    fill.addEventListener('transitionend', onTransitionEnd);
  } else if (currentWidth == 100) {
    collectFillBarCoin();
  }
}

async function startDecay() {
  const fill = document.querySelector('.js-fill-bar-fill');
  fill.dataset.decaying = 'true';
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 300)); // wait

    let currentWidth = parseFloat(fill.style.width) || 0;

    if (currentWidth <= 0) {
      fill.style.width = '0%';
      delete fill.dataset.decaying;
      break;
    } else if (currentWidth == 100) {
      fill.style.width = '100%';
      delete fill.dataset.decaying;
      break;
    }

    fill.style.width = Math.max(0, currentWidth - 2) + '%';
  }
}

let timerInterval = null;
let timerStart = null;
export let bestTimer = parseFloat(localStorage.getItem('bestTimer')) || null;
export let lastTimer = parseFloat(localStorage.getItem('lastTimer')) || null;

async function startTimer() {
  const fill = document.querySelector('.js-fill-bar-fill');
  const timerCont = document.querySelector('.js-fill-bar-timer-container');
  const timerEl = document.querySelector('.js-fill-bar-timer');
  const bestTimerEl = document.querySelector('.js-fill-bar-best-timer');

  let currentSeconds = "0.00";

  // Wait until transition actually begins
  fill.addEventListener('transitionstart', function handleStart(e) {
    if (e.propertyName === 'width') {
      timerStart = performance.now();
      timerInterval = requestAnimationFrame(updateTimer);
      timerCont.classList.remove('hidden');
      fill.removeEventListener('transitionstart', handleStart);
    }
  });

  function updateTimer() {
    const elapsed = performance.now() - timerStart;
    currentSeconds = (elapsed / 1000).toFixed(2);
    timerEl.textContent = currentSeconds;
    timerInterval = requestAnimationFrame(updateTimer);
  }

  fill.addEventListener('transitionend', function handleEnd(e) {
    if (e.propertyName !== 'width') return;

    const width = parseFloat(fill.style.width);

    if (width >= 100) {
      cancelAnimationFrame(timerInterval);
      timerInterval = null;

      lastTimer = currentSeconds;
      localStorage.setItem('lastTimer', lastTimer);

      if (bestTimer === null || parseFloat(currentSeconds) < parseFloat(bestTimer)) {
        bestTimer = currentSeconds;
        localStorage.setItem('bestTimer', bestTimer);
        bestTimerEl.textContent = `${bestTimer}s`;
        bestTimerText.classList.add('best');
      }

      fill.removeEventListener('transitionend', handleEnd);
    } else if (width <= 0) {
      cancelAnimationFrame(timerInterval);
      timerInterval = null;
      timerCont.classList.add('hidden');

      fill.removeEventListener('transitionend', handleEnd);
    }
  });
}

let isAnimatingFillBar = false;

export function triggerFillBarAnimations(collected) {
  if (isAnimatingFillBar) return;
  isAnimatingFillBar = true;

  if (collected) {
    fillBarFill.style.width = '100%';
    
    fillBarGrayCoin.classList.add('hidden');
    fillBarGoldCoin.classList.remove('hidden');
    
    fillBarBorder.classList.add('highlight');
    restartAnimation(fillBarGoldCoin, 'spin');
      
    fillBarText.classList.remove('show');
    fillBarText.innerHTML = i18next.t('index.coin-collected-text');
    void fillBarText.offsetWidth;
    fillBarText.classList.add('show');

    fillTimerEl.innerHTML = lastTimer;
    fillTimerCont.classList.remove('hidden');

    resetFillBarButton.classList.remove('hidden');

    if (lastTimer === bestTimer) {
      bestTimerText.classList.add('best');
    }
  } else if (!collected) {
    fillBarFill.style.width = '0%';
    
    fillBarGrayCoin.classList.remove('hidden');
    fillBarGoldCoin.classList.add('hidden');
    
    fillBarBorder.classList.remove('highlight');
      
    fillBarText.innerHTML = i18next.t('index.fill-bar-text-guide') + ' <img class="fill-bar-arrow" src="icons/arrow-fill-right.svg">';
    fillBarText.classList.remove('show');
    
    fillTimerCont.classList.add('hidden');

    resetFillBarButton.classList.add('hidden');

    bestTimerText.classList.remove('best');
  }

  setTimeout(() => {
    isAnimatingFillBar = false;
  }, 300);
}

function resetFillBar() {
  const fillBarFill = document.querySelector('.js-fill-bar-fill');
  const fillBarBorder = document.querySelector('.js-fill-bar-container');
  const fillBarText = document.querySelector('.js-fill-bar-text');
  const fillTimerCont = document.querySelector('.js-fill-bar-timer-container');

  fillBarFill.style.width = '0%';
  fillBarBorder.classList.remove('highlight');
  fillBarText.innerHTML = i18next.t('index.fill-bar-text-guide') + ' <img class="fill-bar-arrow" src="icons/arrow-fill-right.svg">';
  fillBarText.classList.remove('show');
  fillTimerCont.classList.add('hidden');
  bestTimerText.classList.remove('best');
}

resetFillBarButton.addEventListener('click', () => {
  resetFillBar();
});