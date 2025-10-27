import { collectRPSCoin, restartAnimation } from './index.js';

const jsResult = document.querySelector('.js-result');
const jsPlayerMove = document.querySelector('.js-player-move');
const jsAiMove = document.querySelector('.js-ai-move');
const jsAvatarMove = document.querySelectorAll('.js-avatar-move');
const fill = document.querySelector('.js-rps-bar-fill');
const rpsGoldCoin = document.querySelector('.js-rps-collected-coin');
const rpsGrayCoin = document.querySelector('.js-rps-gray-coin');
const rpsBarBorder = document.querySelector('.js-rps-bar-container');
const rpsBarText = document.querySelector('.js-rps-bar-text');

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

export function resetResult() {
  jsResult.innerHTML = i18next.t('index.rps-make-a-move');
}

export function updateScoreText() {
  if (score.wins !== 0 || score.losses !== 0 || score.ties !== 0) {
    if (jsResult.innerHTML.trim() === '') {
      resetResult();
    }
  } else if (score.wins === 0 && score.losses === 0 && score.ties === 0) {
    resetResult();
    jsPlayerMove.innerHTML = '';
    jsAiMove.innerHTML = '';
    jsAvatarMove.forEach(el => {
      if (!el.classList.contains('hidden')) {
        el.classList.add('hidden');
      }
    });
  }

  if (score.wins >= 3) {
    updateSummaryScore();
  }
}

function updateSummaryScore() {
  document.querySelector('.js-rps-wins').innerHTML = score.wins;
  document.querySelector('.js-rps-losses').innerHTML = score.losses;
  document.querySelector('.js-rps-ties').innerHTML = score.ties;
}

function completeRPSGame() {
  collectRPSCoin();
}

export function resetRPSScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreText();
  updateRPSFillBar();
  updateSummaryScore();
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

export function updateRPSFillBar() {
  if (score.wins >= 3) {
    fill.style.width = '100%';

    rpsGrayCoin.classList.add('hidden');
    rpsGoldCoin.classList.remove('hidden');
    restartAnimation(rpsBarBorder, 'highlight');
    restartAnimation(rpsGoldCoin, 'spin');

    rpsBarText.classList.remove('show');
    rpsBarText.innerHTML = i18next.t('index.coin-collected-text');
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
    rpsBarText.innerHTML = i18next.t('index.rps-win-3-times');
    rpsBarText.classList.remove('show');
    rpsBarBorder.classList.remove('highlight');
    rpsGrayCoin.classList.remove('hidden');
    rpsGoldCoin.classList.add('hidden');
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

let isRPSPlaying = false;

export async function playGame(playerMove) {
  if (isRPSPlaying) return;
  isRPSPlaying = true;

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

  let resultText = '';

  if (result === 'You win!') {
    score.wins++;
    resultText = 'win';
  } else if (result === 'You lose.') {
    score.losses++;
    resultText = 'lose';
  } else if (result === 'Tie.') {
    score.ties++;
    resultText = 'tie';
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelectorAll('.js-avatar-move').forEach(el => {
    if (el.classList.contains('hidden')) {
      el.classList.remove('hidden');
    }
  });

  fadeUpdate(document.querySelector('.js-player-move'), `<img src="icons/${playerMove}-emoji.png" class="move-icon">`);

  await fadeUpdate(document.querySelector('.js-ai-move'), `<img src="icons/${computerMove}-emoji.png" class="move-icon">`);

  let i18nResult = i18next.t(`index.rps-${resultText}`);

  await fadeUpdate(document.querySelector('.js-result'), `<p class="result-highlight">${i18nResult}</p>`);

  updateScoreText();

  isRPSPlaying = false;

  if (result === 'You win!') {
    updateRPSFillBar();
  }
  if (score.wins >= 3) {
    completeRPSGame();
  }
}

function initRPS() {
  updateScoreText();
  updateRPSFillBar();
}

if (i18next.isInitialized) {
  initRPS();
} else {
  i18next.on('initialized', () => {
    initRPS();
  });
}