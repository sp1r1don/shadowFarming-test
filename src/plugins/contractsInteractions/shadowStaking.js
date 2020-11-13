import shadowStakingABI from '@/abi/shadowStakingABI.json';

export default {
  async install(Vue) {
    const contractAddress = '0xef2bcfb7ef3d3d1ee6fa6e86871c6f3f4f541f8d';
    const web3 = Vue.prototype.$web3;
    const contract = new web3.eth.Contract(shadowStakingABI, contractAddress);
    const getYearTokensAmount = (currentBlockNumber) => {
      const blocksPerYear = 2336000;
      return contract
        .methods
        .getMultiplier(currentBlockNumber, currentBlockNumber + blocksPerYear)
        .call();
    };
    const getLastBlock = (address) => contract.methods.getLastBlock(address).call();
    const registerUser = async (from) => {
      const gasPrice = await web3.eth.getGasPrice();
      const gas = await contract.methods.registration().estimateGas({
        from,
      });
      try {
        return await contract.methods.registration().send({
          from,
          gas,
          gasPrice,
        });
      } catch (e) {
        console.error('registerUser error');
        console.error(e);
        return false;
      }
    };
    const withdraw = async (from, withdrawOptions) => {
      const {
        keyId,
        amount,
        lastBlockNumber,
        currentBlockNumber,
        sign,
      } = withdrawOptions;
      try {
        const gasPrice = await web3.eth.getGasPrice();
        const gas = await contract.methods.withdraw(
          keyId,
          amount,
          lastBlockNumber,
          currentBlockNumber,
          sign,
        ).estimateGas({
          from,
        });
        return await contract.methods.withdraw(
          keyId,
          amount,
          lastBlockNumber,
          currentBlockNumber,
          sign,
        ).send({
          from,
          gas,
          gasPrice,
        });
      } catch (e) {
        console.error('withdraw error');
        console.error(e);
        return false;
      }
    };

    Vue.prototype.$shadowStaking = {
      getYearTokensAmount,
      getLastBlock,
      registerUser,
      withdraw,
    };
  },
};
