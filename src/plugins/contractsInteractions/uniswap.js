import uniswapPairABI from '@/abi/uniswapPairABI.json';

export default {
  async install(Vue) {
    const web3 = Vue.prototype.$web3;
    const getReserves = (pairAddress) => {
      const pairContract = new web3.eth.Contract(uniswapPairABI, pairAddress);
      return pairContract.methods.getReserves().call();
    };
    const getBalanceOf = (address, pairAddress) => {
      const pairContract = new web3.eth.Contract(uniswapPairABI, pairAddress);
      return pairContract.methods.balanceOf(address).call();
    };
    const getTotalSupply = (pairAddress) => {
      const pairContract = new web3.eth.Contract(uniswapPairABI, pairAddress);
      return pairContract.methods.totalSupply().call();
    };

    Vue.prototype.$uniswap = {
      getReserves,
      getBalanceOf,
      getTotalSupply,
    };
  },
};
