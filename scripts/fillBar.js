import { collectFillBarCoin } from './index.js';

export function fillBar(amount) {
  const fill = document.querySelector('.fill-bar-fill');
  const currentWidthStr = fill.style.width || '0%';
  let currentWidth = parseFloat(currentWidthStr);
  
  let newWidth = currentWidth + amount;

  // Clamp between 0 and 100
  newWidth = Math.max(0, Math.min(100, newWidth));

  const isReachingFull = newWidth === 100 && currentWidth < 100;

  fill.style.width = newWidth + '%';

  if (currentWidth == 0) {
      startDecay();
  } 
  if (isReachingFull) {
    const onTransitionEnd = (e) => {
      if (e.propertyName === 'width') {
        fill.removeEventListener('transitionend', onTransitionEnd);
        collectFillBarCoin();
      }
    };
    fill.addEventListener('transitionend', onTransitionEnd);
  }
}

async function startDecay() {
  const fill = document.querySelector('.fill-bar-fill');
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