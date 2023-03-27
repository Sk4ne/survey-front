import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'boostrap/dist/js/bootstrap.min.js';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000/v1';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
