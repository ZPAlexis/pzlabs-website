import { collectFillBarCoin } from './index.js';

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

export function resetFillBarTimers() {
  bestTimer = null;
  lastTimer = null;
  localStorage.removeItem('bestTimer');
  localStorage.removeItem('lastTimer');
}