import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
/* eslint-disable */
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    // path: '/',
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/encuesta',
    name: 'encuesta',
    component: () => import(/* webpackChunkName: "Encuesta" */ '../views/Encuesta.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path:'/',
    name: 'login',
    component: () => import (/* webpackChunkName: 'Login' */'../components/Login.vue')
  },
  {
    path:'/restore-password',
    name: 'restore-password',
    component: () => import (/* webpackChunkName: 'restorePassword' */'../components/RestorePassword.vue'),
    // meta: {
    //   requireAuth: true
    // }
  },
  {
    path:'/password-reset/:id/:token',
    name: 'password-reset',
    component: () => import (/* webpackChunkName: 'passwordReset' */'../components/newPassword.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path:'/settings/profile',
    name: 'profile',
    component: () => import (/* webpackChunkName: 'profile' */'../components/Profile.vue'),
    meta: {
      requireAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) =>{
  let loggedIn = localStorage.getItem('token')
  const protectedRoute = to.matched.some(record=>record.meta.requireAuth);
  // if (protectedRoute && store.state.token === '') {
  if (protectedRoute && !loggedIn) {
    next({name:'login'})
  } else {
    next();
  }
})
export default router
