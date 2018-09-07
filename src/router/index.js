import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import GoodBye from '@/components/GoodBye';
import Gaozhi from '@/components/Gaozhi';
import Main from '@/components/Main';
import Validate from '@/components/Validate';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/validate/:identityId',
      name: 'Validate',
      component: Validate
    },
    {
      path: '/tp',
      name: 'Main',
      component: Main
    },
    {
      path: '/bye',
      name: 'GoodBye',
      component: GoodBye
    },
    {
      path: '/gz',
      name: 'Gaozhi',
      component: Gaozhi
    }
  ]
});
