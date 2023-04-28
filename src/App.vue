<template>
  <div id="app">
    <header class="bg-dark">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="padding:10px">
          <a class="navbar-brand" href="#">Generador | Encuestas</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
    
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <router-link class="nav-link active" :to="{name:'home'}" v-if="isActive">Home</router-link>
              </li>
              <li class="nav-item ">
                <router-link class="nav-link" :to="{name:'encuesta'}" v-if="isActive">Surveys</router-link>
              </li>
              <li class="nav-item ">
                <router-link class="nav-link" :to="{name:'login'}" v-if="!isActive">Login</router-link>
              </li>
              <!-- LOGOUT -->
              <li class="nav-item dropdown" v-if="isActive">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                  <i class="fa-regular fa-circle-user"></i>
                  {{ getInfoUser.name.charAt(0) }}
                </a>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#"> {{  getInfoUser.name }}</a>
                  <a class="dropdown-item" href="#"> {{  getInfoUser.email }}</a>
                  <!-- <a class="dropdown-item" href="#">
                    <i class="fa-regular fa-user"></i>
                    Perfil
                  </a> -->
                  <router-link :to="{name: 'profile'}" class="dropdown-item">
                    <i class="fa-regular fa-user"></i>
                    Perfil
                  </router-link>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item logout" @click="logOut()">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    Cerrar Sesion
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
/* PINTAR LOS ELEMENTOS DEL MENU */
/* $(document).ready(function(){
  console.log('YA CARGO EL DOCUMENTO')
  $('.nav-link').click(function(){
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
  });
}); */

import { mapActions,mapGetters } from "vuex";
import $ from 'jquery'
export default {
  data(){
    return {
      
    }
  },
  mounted(){
    /* JQUERY */
    $('.nav-link').click(function(){
      $('.nav-link').removeClass('active');
      $(this).addClass('active');
    });
  },
  created(){
    this.readToken();
  },
  methods: {
    ...mapActions(['logOut','readToken']),
  },
  computed: {
    ...mapGetters(['isActive','getInfoUser'])
  }
}
</script>
<style scoped>
  .router-link-exact-active:focus {
    color: #42b983;
    border-bottom: 4px solid #42b983;
  }
  /* .active{
    border-bottom: 4px solid #42b983;
  } */
  .nav-link{
    font-size: 20px;
  }
  span{
    color:white; 
  }
  .logout{
    cursor: pointer;
  }
</style>