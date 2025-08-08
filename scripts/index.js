let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

updateScoreText();

function updateScoreText() {
  if (score.wins !== 0 || score.losses !== 0 || score.ties !== 0) {
    document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

    document.querySelector('.js-reset-score-button')
    .innerHTML = `<button onclick="
          score.wins = 0;
          score.losses = 0;
          score.ties = 0;
          localStorage.removeItem('score');
          updateScoreText();
        " class="button-link reset-score-button">Reset Score</button>`;
  } else if (score.wins === 0 && score.losses === 0 && score.ties === 0) {
    document.querySelector('.js-score')
    .innerHTML = '';

    document.querySelector('.js-result').innerHTML = '';

    document.querySelector('.js-moves')
    .innerHTML = `Make a move to play the game.`;

    document.querySelector('.js-reset-score-button')
    .innerHTML = '';
  }
  
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
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
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
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins++;
  } else if (result === 'You lose.') {
    score.losses++;
  } else if (result === 'Tie.') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreText();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `<img src="icons/${playerMove}-emoji.png" class="move-icon"> VS <img src="icons/${computerMove}-emoji.png" class="move-icon">`;

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