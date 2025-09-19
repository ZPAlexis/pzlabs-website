let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

updateScoreText();

function updateScoreText() {
  const jsResult = document.querySelector('.js-result');
  const jsScore = document.querySelector('.js-score');
  const jsResetScoreButton = document.querySelector('.js-reset-score-button');

  if (score.wins !== 0 || score.losses !== 0 || score.ties !== 0) {
    fadeUpdate(jsScore, `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
    resetScoreButtonCheck();
  } else if (score.wins === 0 && score.losses === 0 && score.ties === 0) {
    fadeUpdate(jsResult, `Make a move to play the game.`);
    jsScore.innerHTML = '';
    jsResetScoreButton.innerHTML = '';
  }
}

function resetScoreButtonCheck() {
  const jsResetScoreButton = document.querySelector('.js-reset-score-button');

  if (jsResetScoreButton.innerHTML === ``) {
    fadeUpdate(jsResetScoreButton, `<button onclick="
          score.wins = 0;
          score.losses = 0;
          score.ties = 0;
          localStorage.removeItem('score');
          updateScoreText();
        " class="button-link reset-score-button">Reset Score</button>`);
  }
}

function fadeUpdate(element, newHTML, skipFadeOut = false) {
  if (skipFadeOut) {
    element.innerHTML = newHTML;
    element.classList.remove('hidden');
    return;
  }

  element.classList.remove('hidden');
  void element.offsetWidth;
  element.classList.add('hidden');

  element.addEventListener('transitionend', function handler() {
    element.innerHTML = newHTML;
    void element.offsetWidth;
    element.classList.remove('hidden');
    element.removeEventListener('transitionend', handler);
  });
}
/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  }
}
*/
console.log(score);

function playGame(playerMove) {
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

  updateScoreText();

  fadeUpdate(document.querySelector('.js-result'), result);

  document.querySelector('.js-player-move').innerHTML = `<img src="icons/${playerMove}-emoji.png" class="move-icon">`;

  document.querySelector('.js-ai-move').innerHTML = `<img src="icons/${computerMove}-emoji.png" class="move-icon">`;
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