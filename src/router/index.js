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

export default router;
