import { trackEvent } from './utils.js';

const defaultCoinFlags = {
  cover: false,
  fillBar: false,
  rps: false
};

export const GameState = {
  flags: { ...defaultCoinFlags },

  load() {
    const saved = localStorage.getItem('coinFlags');
    if (saved) Object.assign(this.flags, JSON.parse(saved));
    return this.flags;
  },

  save() {
    localStorage.setItem('coinFlags', JSON.stringify(this.flags));
  },

  reset() {
    this.flags = { ...defaultCoinFlags };
    this.save();
  },

  getCollectedCount() {
    return Object.values(this.flags).filter(Boolean).length;
  },

  getTotalCount() {
    return Object.keys(this.flags).length;
  },

  collectCoverCoin() {
      if (!this.flags.cover) {
          this.flags.cover = true;
          this.save();
          trackEvent("boxCoin", { syncToApi: true });
          return true;
      }
      return false;
  },

  collectFillBarCoin() {
      if (!this.flags.fillBar) {
          this.flags.fillBar = true;
          this.save();
          trackEvent("fillCoin", { syncToApi: true });
          return true;
      }
      return false;
  },

  collectRPSCoin() {
      if (!this.flags.rps) {
          this.flags.rps = true;
          this.save();
          trackEvent("rpsCoin", { syncToApi: true });
          return true;
      }
      return false;
  }
};