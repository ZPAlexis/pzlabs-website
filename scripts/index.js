const button = document.querySelector('.cover-btn');
const boxImg = button.querySelector('.js-cover-box');
const coinImg = button.querySelector('.js-cover-coin');
const coinAmount = document.querySelector('.js-coin-amount');
const fillBarGoldCoin = document.querySelector('.js-fill-bar-collected-coin');
const fillBarGrayCoin = document.querySelector('.js-fill-bar-gray-coin');
const fillBarBorder = document.querySelector('.js-fill-bar-container');
const fillBarText = document.querySelector('.fill-bar-text');

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

coinImg.addEventListener('animationend', (e) => {
  if (e.animationName === 'coinSpin') {
    coinImg.classList.remove('spin');
    coinImg.classList.add('idle');
  }
  if (e.animationName === 'coinCollect') {
    coinImg.classList.add('idle');
  }
});

button.addEventListener('click', () => {
  if (!coinsCollectedFlags.cover) {
    boxImg.classList.remove('idle');
    boxImg.classList.add('open');
    coinImg.classList.add('visible');

    coinsCollectedFlags.cover = true;
    calculateCoinAmount();
  } else {
    coinImg.classList.remove('idle');
    coinImg.classList.remove('spin');
    void coinImg.offsetWidth;
    coinImg.classList.add('spin');
  }
});

function collectFillBarCoin() {
  if (!coinsCollectedFlags.fillBar) {
    fillBarGrayCoin.classList.add('hidden');
    fillBarGoldCoin.classList.remove('hidden');
    coinsCollectedFlags.fillBar = true;
    calculateCoinAmount();
    triggerFillBarAnimations();
  } else {
    triggerFillBarAnimations();
  }
}

function triggerFillBarAnimations() {
  fillBarBorder.classList.add('highlight');
  fillBarGoldCoin.classList.remove('spin');
  void fillBarGoldCoin.offsetWidth;
  fillBarGoldCoin.classList.add('spin');
    
  fillBarText.classList.remove('show');
  fillBarText.innerHTML = 'Coin Collected!';
  void fillBarText.offsetWidth;

  setTimeout(() => {
    fillBarText.classList.add('show');
    fillBarBorder.classList.remove('highlight');
  }, 300);
}


calculateCoinAmount();