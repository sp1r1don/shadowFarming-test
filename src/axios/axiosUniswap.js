import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
});
