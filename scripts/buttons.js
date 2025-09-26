import { fillBar } from './fillBar.js';

const fillBarButton = document.querySelector('.js-fill-bar-play-button');

fillBarButton.onclick = function () {
  fillBar(6);
  fillBarButton.classList.add('pressed');
  setTimeout(() => {
    fillBarButton.classList.remove('pressed');
  }, 100);
};