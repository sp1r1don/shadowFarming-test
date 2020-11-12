import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
// plugins
import Web3 from '@/plugins/web3';
import bigNumber from '@/plugins/bigNumber';
import api from '@/plugins/api';
import uniswap from '@/plugins/contractsInteractions/uniswap';
import shadowStaking from '@/plugins/contractsInteractions/shadowStaking';

Vue.config.productionTip = false;
Vue.use(Web3);
Vue.use(bigNumber);
Vue.use(api);
Vue.use(uniswap);
Vue.use(shadowStaking);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
