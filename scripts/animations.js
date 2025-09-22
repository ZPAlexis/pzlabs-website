const fadeUp = document.querySelectorAll('.fade-up');
const fadeUpObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeUpObserver.unobserve(entry.target);
    }
  });
});

fadeUp.forEach(b => fadeUpObserver.observe(b));