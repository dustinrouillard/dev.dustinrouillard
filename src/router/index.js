import Vue from 'vue';
import Router from 'vue-router';
import redirects from './redirects.js';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../screens/Home.vue')
    },
    ...redirects
  ]
});
