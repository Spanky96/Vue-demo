import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Buttons from '@/components/Buttons';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/buttons',
      name: 'buttons',
      component: Buttons
    }
  ]
});
