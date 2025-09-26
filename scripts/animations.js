const fadeUp = document.querySelectorAll('.fade-up');

const fadeUpObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.classList.add('visible');
    
      const handleTransitionEnd = (e) => {
        if (e.target === el && (e.propertyName === 'transform' || e.propertyName === 'opacity')) {
          el.classList.remove('fade-up', 'visible');
          el.removeEventListener('transitionend', handleTransitionEnd);
        }
      };

      el.addEventListener('transitionend', handleTransitionEnd);

      fadeUpObserver.unobserve(el);
    }
  });
});

fadeUp.forEach(el => fadeUpObserver.observe(el));