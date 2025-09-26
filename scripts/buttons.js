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
  fillBarButton.style.transition = 'none';
  fillBarButton.offsetHeight;
  fillBarButton.classList.add('pressed');
}

// Remove .pressed after interaction ends
function handlePressEnd() {
  fillBarButton.style.transition = 'border 0.1s ease-out, transform 0.1s linear, box-shadow 0.1s linear, background-color 0.1s ease-out';
  fillBarButton.classList.remove('pressed');
}

// Touch (mobile)
fillBarButton.addEventListener('touchstart', handlePressStart);
fillBarButton.addEventListener('touchend', handlePressEnd);
fillBarButton.addEventListener('touchcancel', handlePressEnd); // just in case

// Mouse (desktop)
fillBarButton.addEventListener('mousedown', handlePressStart);
fillBarButton.addEventListener('mouseup', handlePressEnd);