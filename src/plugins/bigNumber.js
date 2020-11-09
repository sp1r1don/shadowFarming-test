import BigNumber from 'bignumber.js';

BigNumber.config({
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
  EXPONENTIAL_AT: 1e9,
  DECIMAL_PLACES: 18,
});

export const BNVueInst = {
  install(Vue) {
    Vue.prototype.$BN = (num) => new BigNumber(num);
  },
};

export const BN = (num) => new BigNumber(num);
