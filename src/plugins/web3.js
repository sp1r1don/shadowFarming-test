import Web3 from 'web3';

const Web3Inst = {
  install(Vue) {
    Vue.prototype.$web3 = (() => {
      if (window.ethereum !== undefined) return new Web3(window.ethereum);
      if (window.web3 !== undefined) return new Web3(window.web3.currentProvider);
      return new Web3('https://mainnet.infura.io/v3/7d0d81d0919f4f05b9ab6634be01ee73');
    })();
  },
};

export default Web3Inst;
