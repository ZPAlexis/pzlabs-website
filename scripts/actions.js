import { fillBar } from './fillBar.js';
import { playGame } from './rock-paper-scissors.js';

export const buttonActions = {
  fillBar: (el) => {
    const value = parseInt(el.dataset.value, 10);
    fillBar(value);
  },
  rps: (el) => {
    const move = el.dataset.value;
    playGame(move);
  },
  navigate: (el) => {
    const target = el.dataset.target;
    window.location.href = target;
  }
};
