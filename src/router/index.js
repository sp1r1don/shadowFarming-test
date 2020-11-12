import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('@/views/Home.vue');
const WalletConnect = () => import('@/views/WalletConnect.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/wallet-connect',
    name: 'WalletConnect',
    component: WalletConnect,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const ctx = router.app;
  if (to.name !== 'WalletConnect') {
    if (!ctx.$web3) next({ name: 'WalletConnect' });
    else {
      const account = await ctx.$web3.eth.getAccounts();
      if (account && account[0]) next();
      else next({ name: 'WalletConnect' });
    }
  } else if (ctx.$web3) {
    const account = await ctx.$web3.eth.getAccounts();
    if (account && account[0]) {
      next(from);
    }
    next();
  } else next();
});

export default router;
