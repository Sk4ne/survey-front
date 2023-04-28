import Vue from 'vue'
import Vuex from 'vuex'

/* eslint-disable */
import jwtDecode from 'jwt-decode'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userDb: '',
    /* nameUser */
    userLogin:{}
  },
  mutations: {
    getUser(state,payload){
      state.token = payload;
      if (payload === '') {
        state.userDb = ''
      }else{
        state.userDb = jwtDecode(payload)
      }
    }
  },
  actions: {
    saveUser({commit}, payload){
      /* save data localstorage */
      localStorage.setItem('token',payload);
      commit('getUser',payload);
    },
    logOut({commit}){
      commit('getUser','');
      localStorage.removeItem('token');
      router.push({name: 'login'})
    },
    readToken({commit}){
      const token = localStorage.getItem('token');
      if (token) {
        commit('getUser',token)
      }else{
        commit('getUser','');
      }
    },
  },
  getters:{
    isActive : state => !!state.token,
    getInfoUser(state){
      state.userLogin = {
        name: state.userDb.name,
        email: state.userDb.email, 
        /* NECESITO EL ID PARA HACER UN GET Y ACTUALIZAR EL PERFIL DEL USUARIO */
        _id: state.userDb.id
      }
      return state.userLogin;
    }
  },
  modules: {
  }
})
