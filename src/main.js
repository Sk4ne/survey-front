import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap';
/* eslint-disable */
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'boostrap/dist/js/bootstrap.min.js';
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
// Vue.use(Swal)

Vue.config.productionTip = false

// Desarrollo
axios.defaults.baseURL = 'http://localhost:3000/v1';

// Produccion RAILWAY
// axios.defaults.baseURL = 'https://survey-production.up.railway.app/v1';

// Produccion VERCEL
// axios.defaults.baseURL = 'https://survey-sk4ne.vercel.app/v1';

/* TOOTIP GLOBAL */
// $(function () {
//   $('[data-toggle="popover"]').popover()
// })

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
