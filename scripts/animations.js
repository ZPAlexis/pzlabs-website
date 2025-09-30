//Fade Up Observer
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

//Trigger Coin Summary Observer
const coinSummaryTrigger = document.querySelectorAll('.js-trigger-coin-summary');
const summaryCoinContainer = document.querySelector('.js-coin-summary');

const triggerCoinSummaryObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      summaryCoinContainer.classList.remove('hidden');
    
      const handleTransitionEnd = (e) => {
        if (e.target === el && (e.propertyName === 'transform' || e.propertyName === 'opacity')) {
          el.classList.remove('js-trigger-coin-summary');
          el.removeEventListener('transitionend', handleTransitionEnd);
        }
      };

      el.addEventListener('transitionend', handleTransitionEnd);

      triggerCoinSummaryObserver.unobserve(el);
    }
  });
});

coinSummaryTrigger.forEach(el => triggerCoinSummaryObserver.observe(el));

//Fade Left Observer
const fadeLeft = document.querySelectorAll('.fade-left');

const fadeLeftObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.classList.add('visible');
    
      const handleTransitionEnd = (e) => {
        if (e.target === el && (e.propertyName === 'transform' || e.propertyName === 'opacity')) {
          el.classList.remove('fade-left', 'visible');
          el.removeEventListener('transitionend', handleTransitionEnd);
        }
      };

      el.addEventListener('transitionend', handleTransitionEnd);

      fadeLeftObserver.unobserve(el);
    }
  });
}, {
  threshold: [1]
});

fadeLeft.forEach(el => fadeLeftObserver.observe(el));

//Fade Right Observer
const fadeRight = document.querySelectorAll('.fade-right');

const fadeRightObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.classList.add('visible');
    
      const handleTransitionEnd = (e) => {
        if (e.target === el && (e.propertyName === 'transform' || e.propertyName === 'opacity')) {
          el.classList.remove('fade-right', 'visible');
          el.removeEventListener('transitionend', handleTransitionEnd);
        }
      };

      el.addEventListener('transitionend', handleTransitionEnd);

      fadeRightObserver.unobserve(el);
    }
  });
}, {
  threshold: [0.5]
});

fadeRight.forEach(el => fadeRightObserver.observe(el));