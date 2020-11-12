import axiosShadowStaking from '@/axios/axiosShadowStaking';

const getAddressInfo = (address) => axiosShadowStaking({
  method: 'get',
  url: `/api/v1/address/${address.toLowerCase()}`,
});

const insertAddress = (address) => axiosShadowStaking({
  method: 'post',
  url: '/api/v1/address',
  data: {
    address,
  },
});

const getPoolsHistory = () => axiosShadowStaking({
  method: 'get',
  url: '/api/v1/history',
});

const getPools = () => axiosShadowStaking({
  method: 'get',
  url: '/api/v1/pools',
});

export default {
  getAddressInfo,
  insertAddress,
  getPoolsHistory,
  getPools,
};
