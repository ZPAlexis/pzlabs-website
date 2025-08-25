const img = document.querySelector('.intro-image');
img.addEventListener('click', () => {
  img.classList.remove('spin');
  void img.offsetWidth;
  img.classList.add('spin');
});