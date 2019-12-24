import Vue from 'vue';
import VueRouter from 'vue-router';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import(/* webpackChunkName: "chat" */ '@/views/Chat.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

export default router;
