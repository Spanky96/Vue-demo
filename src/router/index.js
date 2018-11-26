import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import GoodBye from '@/components/GoodBye';
import Gaozhi from '@/components/Gaozhi';
import Main from '@/components/Main';
import Validate from '@/components/Validate';
import Diaocha from '@/components/Diaocha';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/index/:personType?',
      name: 'Index',
      component: Index
    },
    {
      path: '/',
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
    },
    {
      path: '/dc',
      name: 'Diaocha',
      component: Diaocha
    }
  ]
});
