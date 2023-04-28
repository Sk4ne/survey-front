import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    // path: '/',
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/encuesta',
    name: 'encuesta',
    component: () => import(/* webpackChunkName: "Encuesta" */ '../views/Encuesta.vue')
  },
  {
    path:'/',
    name: 'login',
    component: () => import (/* webpackChunkName: 'Login' */'../components/Login.vue')
  },
  {
    path:'/restore-password',
    name: 'restore-password',
    component: () => import (/* webpackChunkName: 'restorePassword' */'../components/RestorePassword.vue')
  },
  {
    path:'/password-reset/:id/:token',
    name: 'password-reset',
    component: () => import (/* webpackChunkName: 'passwordReset' */'../components/newPassword.vue')
  },
  {
    path:'/settings/profile',
    name: 'profile',
    component: () => import (/* webpackChunkName: 'profile' */'../components/Profile.vue')
  },
  // {
  //   path:'/change-password',
  //   name: 'change-password',
  //   component: () => import (/* webpackChunkName: 'changePassword' */'../components/ChangePassword.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
