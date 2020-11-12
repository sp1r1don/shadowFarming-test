import axiosUniswap from '@/axios/axiosUniswap';

const getPair = (pairId) => axiosUniswap({
  method: 'post',
  data: {
    query: `{
          pair(id: "${pairId}") {
            token0 {
              id
              symbol
            }
            token1 {
              id
              symbol
            }
            reserve0
            reserve1
            token0Price
            token1Price
            totalSupply
            reserveUSD
          }
        }`,
  },
});

export default {
  getPair,
};
