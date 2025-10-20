import { buttonActions } from './actions.js';

const buttons = document.querySelectorAll('.js-animated-button');

buttons.forEach((button) => {
  function handlePressStart() {
    if (button.disabled) return;

    button.style.setProperty('transition', 'none');
    button.offsetHeight;
    button.classList.add('pressed');
  }

  function handlePressEnd() {
    if (button.disabled) return;

    button.style.setProperty('transition', 'var(--btn-transition)');
    button.classList.remove('pressed');

    // Perform action based on data-action
    const actionType = button.dataset.action;
    const action = buttonActions[actionType];

    if (typeof action === 'function') {
      action(button);
    } else {
      console.warn(`No action found for type "${actionType}"`);
    }
  }

  button.addEventListener('pointerdown', handlePressStart);
  button.addEventListener('pointerup', handlePressEnd);
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
