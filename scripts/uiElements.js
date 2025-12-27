export const Elements = {
    // --- Language / Locales ---
    languageBtnPT: document.querySelector('.js-pt-locale'),
    languageBtnEN: document.querySelector('.js-en-locale'),

    // --- Cover Coin Section ---
    coverButton: document.querySelector('.cover-btn'),
    coverBoxImg: document.querySelector('.js-cover-box'),
    coverCoinContainer: document.querySelector('.js-coin-container'),
    coverCoinIdleGif: document.querySelector('.js-coin-idle'),
    coverCoinSpinGif: document.querySelector('.js-coin-spin'),
    coverCoinScrollText: document.querySelector('.js-cover-coin-collected-text'),

    // --- Rock Paper Scissors Section ---
    rpsGoldCoin: document.querySelector('.js-rps-collected-coin'),
    rpsGrayCoin: document.querySelector('.js-rps-gray-coin'),
    rpsBarBorder: document.querySelector('.js-rps-bar-container'),
    rpsBarText: document.querySelector('.js-rps-bar-text'),

    // --- Summary Header & Overlay ---
    summaryCoinContainer: document.querySelector('.js-coin-summary'),
    coinAmount: document.querySelector('.js-coin-amount'),
    analyticsCoinContainer: document.querySelector('.js-analytics-coin-summary'),
    analyticsCoinAmount: document.querySelector('.js-analytics-coin-amount'),
    coinSummaryTriggers: document.querySelectorAll('.js-trigger-coin-summary'),
    summaryOverlay: document.querySelector('.js-summary-menu-overlay'),
    summaryCloseButton: document.querySelector('.js-summary-close-btn'),

    // --- Summary Menu Details ---
    summaryMenuCoinCollectedCover: document.querySelector('.js-summary-menu-cover-gold-coin'),
    summaryMenuCoinCollectedFillbar: document.querySelector('.js-summary-menu-fillbar-gold-coin'),
    summaryMenuCoinCollectedRPS: document.querySelector('.js-summary-menu-rps-gold-coin'),
    
    summaryMenuCoverText: document.querySelector('.js-summary-menu-cover-text'),
    summaryMenuFillbarText: document.querySelector('.js-summary-menu-fillbar-text'),
    summaryMenuFillbarTimerContainer: document.querySelector('.js-summary-menu-stat-timer-container'),
    summaryMenuBestTimer: document.querySelector('.js-fill-bar-best-timer'),
    
    summaryMenuRPSText: document.querySelector('.js-summary-menu-rps-text'),
    summaryMenuRPSStats: document.querySelector('.js-summary-menu-rps-stats'),
    
    summaryMenuResetScoreButton: document.querySelector('.js-summary-reset-score-button'),
    summaryMenuUnlockText: document.querySelector('.js-summary-unlock-text'),

    get summaryMenuLockIcons() { 
        return document.querySelectorAll('.js-summary-lock-icon'); 
    },

    // --- Analytics Details ---
    analyticsCTACoins: document.querySelector('.js-analytics-cta-text'),
    analyticsSummaryCoins: document.querySelector('.js-analytics-coins-text'),
    analyticsSummaryPercentage: document.querySelector('.js-analytics-percentage-text'),
    
    // --- Helpers ---
    toggle(element, className, condition) {
        if (element) {
            element.classList.toggle(className, condition);
        }
    },

    setText(element, text) {
        if (element) {
            element.textContent = text;
        }
    },

    formatNumber(num) {
        return new Intl.NumberFormat().format(num);
    }
};