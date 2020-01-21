import Vue from 'vue';
import Router from 'vue-router';

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
    {
      path: '/nda',
      name: 'NDA',
      component: () => import('../screens/NDA.vue')
    }
  ]
});
