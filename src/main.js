// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import Vum from './vum.js';
import FastClick from 'fastclick';

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.use(Vum);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

Vum.router(router);
FastClick.attach(document.body);
