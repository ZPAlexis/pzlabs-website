import { Elements } from './uiElements.js';

export const Animations = {
  restart(el, className) {
    if (!el) return;
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
  },

  highlightSummaryCoinContainer() {
        this.restart(Elements.summaryCoinContainer, 'highlight');
    },

  playCoinSpin(idleEl, spinEl, idleUrl, spinUrl, onComplete) {
    const SPIN_DURATION = 3200;
    spinEl.src = '';
    spinEl.style.opacity = '1';
    spinEl.src = spinUrl;
    idleEl.style.opacity = '0';

    setTimeout(() => {
      idleEl.src = idleUrl;
      idleEl.style.opacity = '1';
      spinEl.style.opacity = '0';
      if (onComplete) onComplete();
    }, SPIN_DURATION);
  }
};

//1. Fade Up Observer
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

//2. Fade Left Observer
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
  threshold: [0.5]
});

fadeLeft.forEach(el => fadeLeftObserver.observe(el));

//3. Fade Right Observer
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