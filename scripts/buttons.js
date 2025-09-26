import { buttonActions } from './actions.js';

const buttons = document.querySelectorAll('.js-animated-button');

buttons.forEach((button) => {
  function handlePressStart() {
    button.style.setProperty('transition', 'none');
    button.offsetHeight;
    button.classList.add('pressed');
  }

  function handlePressEnd() {
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
  button.addEventListener('pointercancel', handlePressEnd);
});