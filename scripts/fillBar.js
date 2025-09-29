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

async function startTimer() {
  const fill = document.querySelector('.js-fill-bar-fill');
  const timerCont = document.querySelector('.js-fill-bar-timer-container');
  const timerEl = document.querySelector('.js-fill-bar-timer');

  timerStart = performance.now();

  timerInterval = requestAnimationFrame(updateTimer);

  timerCont.classList.remove('hidden');

  async function updateTimer() {
    const currentTime = performance.now();
    const elapsed = currentTime - timerStart;
    const seconds = (elapsed / 1000).toFixed(2);

    timerEl.textContent = seconds;

    const width = parseFloat(fill.style.width) || 0;

    if (width >= 100) {
      const onTransitionEnd = (e) => {
        if (e.propertyName === 'width') {
          fill.removeEventListener('transitionend', onTransitionEnd);
          cancelAnimationFrame(timerInterval);
          timerInterval = null;
          return;
        }
      };
      fill.addEventListener('transitionend', onTransitionEnd);
    } else if (width <= 0) {
      const onTransitionEnd = (e) => {
        if (e.propertyName === 'width') {
          fill.removeEventListener('transitionend', onTransitionEnd);
          cancelAnimationFrame(timerInterval);
          timerInterval = null;
          timerCont.classList.add('hidden'); 
          return;
        }
      };
      fill.addEventListener('transitionend', onTransitionEnd);
    }
    timerInterval = requestAnimationFrame(updateTimer);
  }
}