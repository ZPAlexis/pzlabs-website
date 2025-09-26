import { fillBar } from './fillBar.js';

const fillBarButton = document.querySelector('.js-fill-bar-play-button');

/*
fillBarButton.onclick = function () {
  fillBar(6);
  fillBarButton.classList.add('pressed');
  setTimeout(() => {
    fillBarButton.classList.remove('pressed');
  }, 100);
};
*/

// Apply .pressed immediately on touchstart or mousedown
function handlePressStart() {
  fillBar(6);
  fillBarButton.classList.add('pressed');
}

// Remove .pressed after interaction ends
function handlePressEnd() {
  fillBarButton.classList.remove('pressed');
}

// Touch (mobile)
fillBarButton.addEventListener('touchstart', handlePressStart);
fillBarButton.addEventListener('touchend', handlePressEnd);
fillBarButton.addEventListener('touchcancel', handlePressEnd); // just in case

// Mouse (desktop)
fillBarButton.addEventListener('mousedown', handlePressStart);
fillBarButton.addEventListener('mouseup', handlePressEnd);