import application from '@/plugins/api/application';

export default {
  install(Vue) {
    Vue.prototype.$api = {
      application,
    };
  },
};
