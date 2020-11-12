import application from '@/plugins/api/application';
import uniswap from '@/plugins/api/uniswap';

export default {
  install(Vue) {
    Vue.prototype.$api = {
      application,
      uniswap,
    };
  },
};
