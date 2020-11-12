import Web3 from 'web3';

export default {
  install(Vue) {
    Vue.prototype.$web3 = (() => {
      if (window.ethereum !== undefined) return new Web3(window.ethereum);
      if (window.web3 !== undefined) return new Web3(window.web3.currentProvider);
      return null;
    })();
  },
};
