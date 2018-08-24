import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';
import Buttons from '@/components/Buttons';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/buttons',
      name: 'buttons',
      component: Buttons
    }
  ]
});
