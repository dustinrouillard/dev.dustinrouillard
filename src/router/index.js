import Vue from 'vue';
import Router from 'vue-router';
import core from '../core';

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
      beforeEnter: (to, from, next) => {
        if (!core.accounts.authenticated) {
          next('/login');
        } else {
          next();
        }
      },
      component: () => import('../screens/NDA.vue')
    },
    {
      path: '/chat',
      name: 'NDA Chat',
      beforeEnter: (to, from, next) => {
        if (!core.accounts.authenticated) {
          next('/login');
        } else {
          next();
        }
      },
      component: () => import('../screens/NDAChat.vue')
    },
    {
      path: '/login',
      name: 'NDA Login',
      beforeEnter: (to, from, next) => {
        if (core.accounts.authenticated) {
          next('/nda');
        } else {
          next();
        }
      },
      component: () => import('../screens/NDALogin.vue')
    },
    {
      path: '/register',
      name: 'NDA Register',
      beforeEnter: (to, from, next) => {
        if (core.accounts.authenticated) {
          next('/nda');
        } else {
          next();
        }
      },
      component: () => import('../screens/NDARegister.vue')
    }
  ]
});
