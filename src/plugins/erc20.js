import erc20ABI from '@/abi/erc20/erc20.json';

const Erc20 = {
  install(Vue, { store }) {
    const web3 = Vue.prototype.$web3;
    const BN = Vue.prototype.$BN;
    const createContract = (tokenAddress) => new web3.eth.Contract(erc20ABI, tokenAddress);
    const getTokenBalance = (tokenAddress) => {
      if (tokenAddress !== '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
        const contract = createContract(tokenAddress);
        return contract.methods.balanceOf(store.state.wallet.currentAccount).call();
      }
      return web3.eth.getBalance(store.state.wallet.currentAccount);
    };
    const getTokenSymbol = (tokenAddress) => {
      const contract = createContract(tokenAddress);
      return contract.methods.symbol().call();
    };
    const getTokenNameERC20ABI = (tokenAddress) => {
      const contract = createContract(tokenAddress);
      return contract.methods.name().call();
    };
    const getTokenAllowance = (tokenAddress, contractAddress) => {
      const contract = createContract(tokenAddress);
      return contract
        .methods
        .allowance(store.state.wallet.currentAccount, contractAddress)
        .call();
    };
    const approveToken = (tokenAddress, contractAddress) => {
      const contract = createContract(tokenAddress);
      contract
        .methods
        .approve(contractAddress, BN(10).pow(40).toString())
        .send({ from: store.state.wallet.currentAccount });
    };
    // install
    Vue.prototype.$erc20 = (() => ({
      getTokenBalance,
      getTokenSymbol,
      getTokenNameERC20ABI,
      getTokenAllowance,
      approveToken,
    }))();
  },
};

export default Erc20;
