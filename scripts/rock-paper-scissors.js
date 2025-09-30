import { collectRPSCoin, restartAnimation } from './index.js';

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

document.addEventListener('DOMContentLoaded', () => {
  updateScoreText();
  updateRPSFillBar();
});

function updateScoreText() {
  const jsResult = document.querySelector('.js-result');
  const jsScore = document.querySelector('.js-score');
  const jsResetScoreButton = document.querySelector('.js-reset-score-button');
  const jsPlayerMove = document.querySelector('.js-player-move');
  const jsAiMove = document.querySelector('.js-ai-move');
  const jsAvatarMove = document.querySelectorAll('.js-avatar-move');

  if (score.wins !== 0 || score.losses !== 0 || score.ties !== 0) {
    fadeUpdate(jsScore, `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
    resetScoreButtonCheck();
    if (jsResult.innerHTML.trim() === '') {
      jsResult.innerHTML = 'Make a move to play the game.';
    }
  } else if (score.wins === 0 && score.losses === 0 && score.ties === 0) {
    jsResult.innerHTML = `Make a move to play the game.`;
    jsScore.innerHTML = '';
    jsResetScoreButton.innerHTML = '';
    jsPlayerMove.innerHTML = '';
    jsAiMove.innerHTML = '';
    jsAvatarMove.forEach(el => {
      if (!el.classList.contains('hidden')) {
        el.classList.add('hidden');
      }
    });
  }
}

function resetScoreButtonCheck() {
  const jsResetScoreButton = document.querySelector('.js-reset-score-button');

  if (jsResetScoreButton.innerHTML === ``) {
    jsResetScoreButton.innerHTML = `
      <button class="button-link reset-score-button">Reset Score</button>
    `;

    // Add event listener after inserting the button
    const resetButton = jsResetScoreButton.querySelector('.reset-score-button');
    resetButton.addEventListener('click', resetRPSScore);
  }
}

export function resetRPSScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreText();
  updateRPSFillBar();
}

export function fadeUpdate(element, newHTML, skipFadeOut = false) {
  return new Promise((resolve) => {
    if (skipFadeOut) {
      element.innerHTML = newHTML;
      element.classList.remove('hidden');
      resolve();
      return;
    }

    element.classList.remove('hidden');
    void element.offsetWidth;
    element.classList.add('hidden');

    element.addEventListener('transitionend', function handler(e) {
      if (e.target !== element) return;

      element.innerHTML = newHTML;
      void element.offsetWidth;
      element.classList.remove('hidden');
      element.removeEventListener('transitionend', handler);
      resolve();
    });
  });
}

function updateRPSFillBar() {
  const fill = document.querySelector('.js-rps-bar-fill');
  const rpsGoldCoin = document.querySelector('.js-rps-collected-coin');
  const rpsGrayCoin = document.querySelector('.js-rps-gray-coin');
  const rpsBarBorder = document.querySelector('.js-rps-bar-container');
  const rpsBarText = document.querySelector('.js-rps-bar-text');

  if (score.wins >= 3) {
    fill.style.width = '100%';
    collectRPSCoin();

    rpsGrayCoin.classList.add('hidden');
    rpsGoldCoin.classList.remove('hidden');
    restartAnimation(rpsBarBorder, 'highlight');
    restartAnimation(rpsGoldCoin, 'spin');

    rpsBarText.classList.remove('show');
    rpsBarText.innerHTML = 'Coin Collected!';
    void rpsBarText.offsetWidth;
    rpsBarText.classList.add('show');
  } else if (score.wins == 2) {
    fill.style.width = '66%';
    rpsBarText.classList.remove('show');
    rpsBarText.innerHTML = '2/3';
    void rpsBarText.offsetWidth;
    rpsBarText.classList.add('show');
  } else if (score.wins == 1) {
    fill.style.width = '33%';
    rpsBarText.classList.remove('show');
    rpsBarText.innerHTML = '1/3';
    void rpsBarText.offsetWidth;
    rpsBarText.classList.add('show');
  } else if (score.wins == 0) {
    fill.style.width = '0%';
    rpsBarText.innerHTML = 'Win 3 times to get a coin';
    rpsBarText.classList.remove('show');
    rpsBarBorder.classList.remove('highlight');
  }
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

console.log(score);

export async function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win!';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win!';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win!';
    }
  }

  if (result === 'You win!') {
    score.wins++;
  } else if (result === 'You lose.') {
    score.losses++;
  } else if (result === 'Tie.') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelectorAll('.js-avatar-move').forEach(el => {
    if (el.classList.contains('hidden')) {
      el.classList.remove('hidden');
    }
  });

  updateScoreText();

  fadeUpdate(document.querySelector('.js-player-move'), `<img src="icons/${playerMove}-emoji.png" class="move-icon">`);
  
  fadeUpdate(document.querySelector('.js-ai-move'), `<img src="icons/${computerMove}-emoji.png" class="move-icon">`);

  await fadeUpdate(document.querySelector('.js-result'), `<p class="result-highlight">${result}</p>`);

  if (result === 'You win!') {
    updateRPSFillBar();
  }
}