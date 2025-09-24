const fillBarButton = document.querySelector('.js-fill-bar-play-button');

fillBarButton.onclick = function () {
  fillBar(5);
  fillBarButton.classList.add('pressed');
  setTimeout(() => {
    fillBarButton.classList.remove('pressed');
  }, 100);
};