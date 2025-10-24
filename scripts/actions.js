export const buttonActions = {
  fillBar: async (el) => {
    const { fillBar } = await import('./fillBar.js');
    const value = parseInt(el.dataset.value, 10);
    fillBar(value);
  },

  rps: async (el) => {
    const { playGame } = await import('./rock-paper-scissors.js');
    const move = el.dataset.value;
    playGame(move);
  },

  navigate: (el) => {
    const target = el.dataset.target;
    const newTab = el.dataset.newTab === 'true' || el.dataset.blank === 'true';

    if (newTab) {
      window.open(target, '_blank');
    } else {
      window.location.href = target;
    }
  }
};