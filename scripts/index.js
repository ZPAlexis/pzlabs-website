const button = document.querySelector('.cover-btn');
const boxImg = button.querySelector('.js-cover-box');
const coinImg = button.querySelector('.js-cover-coin');
const coinAmount = document.querySelector('.js-coin-amount');

const coinsCollectedFlags = {
  cover: false,
  fillBar: false,
  rps: false
};

function calculateCoinAmount() {
  const totalCoins = Object.keys(coinsCollectedFlags).length;
  const coinsCollected = Object.values(coinsCollectedFlags).filter(Boolean).length;
  coinAmount.innerHTML = `${coinsCollected} / ${totalCoins}`;
}

button.addEventListener('click', () => {
  if (!coinsCollectedFlags.cover) {
    boxImg.classList.remove('idle');
    boxImg.classList.add('open');
    coinImg.classList.add('visible');

    coinsCollectedFlags.cover = true;
    calculateCoinAmount();
  } else {
    coinImg.classList.remove('spin');
    void coinImg.offsetWidth;
    coinImg.classList.add('spin');
  }
});

calculateCoinAmount();

/* AI PROMPT

What is the best way to refactor this code and calculate the funcion calculateCoinAmount based on the steps provided? 

function calculateCoinAmount { 
  //calculate how many coins were collected (coinsCollected) based on true values from coverCoinCollected, fillBarCoinCollected, rpsCoinCollected 
  //update innerHTML of coinAmount based on coinsCollected and total possible coins ´${coinsCollected} / 3´
}

*/