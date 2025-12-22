import { buttonActions } from './actions.js';

const buttons = document.querySelectorAll('.js-button');

buttons.forEach((button) => {
  function handlePressStart() {
    if (button.disabled) return;

    window.addEventListener('pointerup', handlePressEnd);
    window.addEventListener('pointercancel', handlePressEnd);
  }

  function handlePressEnd() {
    if (button.disabled) return;

    window.removeEventListener('pointerup', handlePressEnd);
    window.removeEventListener('pointercancel', handlePressEnd);

    const actionType = button.dataset.action;
    const action = buttonActions[actionType];

    if (typeof action === 'function') {
      action(button);
    } else {
      console.warn(`No action found for type "${actionType}"`);
    }
  }

  button.addEventListener('pointerdown', handlePressStart);
});

const animatedButtons = document.querySelectorAll('.js-animated-button');

animatedButtons.forEach((button) => {
  function handlePressStart() {
    if (button.disabled) return;

    button.style.setProperty('transition', 'none');
    button.offsetHeight;
    button.classList.add('pressed');

    window.addEventListener('pointerup', handlePressEnd);
    window.addEventListener('pointercancel', handlePressEnd);
  }

  function handlePressEnd() {
    if (button.disabled) return;

    button.style.setProperty('transition', 'var(--btn-transition)');
    button.classList.remove('pressed');

    window.removeEventListener('pointerup', handlePressEnd);
    window.removeEventListener('pointercancel', handlePressEnd);

    const actionType = button.dataset.action;
    const action = buttonActions[actionType];

    if (typeof action === 'function') {
      action(button);
    } else {
      console.warn(`No action found for type "${actionType}"`);
    }
  }

  button.addEventListener('pointerdown', handlePressStart);
});

const mobileNavButtons = document.querySelectorAll('.js-mobile-nav-button');

mobileNavButtons.forEach((button) => {
  function handlePressStart() {
    if (button.disabled) return;
    
    const actionType = button.dataset.action;
    const action = buttonActions[actionType];
    
    //handle selection animation
    
    if (typeof action === 'function') {
      action(button);
    } else {
      console.warn(`No action found for type "${actionType}"`);
    }
  }

  button.addEventListener('pointerdown', handlePressStart);
});

const menuContainers = document.querySelectorAll('.js-header-menu');

function closeAllDrawers(except = null) {
  menuContainers.forEach(container => {
    const drawer = container.querySelector('.js-header-drawer');
    const button = container.querySelector('.js-menu-toggle');

    if (drawer && drawer !== except) {
      drawer.classList.remove('active');
      button?.setAttribute('aria-expanded', 'false');
    }
  });
}

function handleOutsideClick(e) {
  if (!e.target.closest('.js-header-menu')) {
    closeAllDrawers();
    document.removeEventListener('click', handleOutsideClick);
  }
}

menuContainers.forEach(container => {
  const toggleButton = container.querySelector('.js-menu-toggle');
  const drawer = container.querySelector('.js-header-drawer');

  if (!toggleButton || !drawer) return;

  toggleButton.addEventListener('click', e => {
    e.stopPropagation();

    const isOpen = drawer.classList.toggle('active');
    toggleButton.setAttribute('aria-expanded', isOpen);

    if (isOpen) {
      closeAllDrawers(drawer);
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
  });

  drawer.addEventListener('click', e => {
    if (e.target.closest('button')) {
      closeAllDrawers();
      document.removeEventListener('click', handleOutsideClick);
    }
  });
});

const returnToTopBtn = document.querySelector('.js-return-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 600) {
    returnToTopBtn.classList.remove('hidden');
  } else {
    requestAnimationFrame(() => {
      returnToTopBtn.classList.add('hidden');
    });
  }
});

returnToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});