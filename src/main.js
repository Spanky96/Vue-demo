// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import 'babel-polyfill';
import db from './db';
import router from './router';
import axios from 'axios';
import Vum from './vum.js';
import FastClick from 'fastclick';
import Toast from '@/components/toast';
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(Toast);
Vue.prototype.$db = db;
axios.defaults.withCredentials = true;
Vue.use(Vum);
Vue.filter('NumFormat', function (value) {
  return value < 10 ? "0" + value : value;
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

Vum.router(router);
FastClick.attach(document.body);
