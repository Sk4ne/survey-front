<template>
  <div class="profile">
    <div class="container">
      <div class="row">
        <div class="mt-4 col-md-4">
          <h4 class="text-center font-weight-bold">
            <!-- !ESTE EL NOMBRE DEL USUARIO QUE INICIA SESION -->
            <!-- {{ getInfoUser.name }} -->
            
            <!-- +NOMBRE DEL USUARIO QUE INICIA SESION ACTUALIZADO!!! -->
            <!-- {{ user.name }} -->
            {{  getInfoUser.name }}
          </h4>
          <hr>
          <small class="text-center form-text text-muted">Informacion personal</small>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2">
          <button class="mt-4 btn btn-outline-secondary btn-block" @click="goHome()">Ir a inicio</button>
        </div>
      </div>
      <div class="row">
        <div class="mt-4 col-md-4">
          <!-- <router-link
            class="mt-4 text-center text-monospace font-weight-bold btn btn-outline-secondary update-password"
            data-toggle="modal" data-target="ModalChangePassword"
            :to="{}"
            >
            <i class="fa-solid fa-lock"></i>
            Cambiar Contrasena
          </router-link> -->

          <!-- + MODAL CHANGE-PASSWORD -->
          <ChangePassword/>
          <button
            class="mt-4 text-center text-monospace font-weight-bold btn btn-outline-secondary update-password"
            data-toggle="modal" data-target="#ModalChangePassword"
            :to="{}"
            >
            <i class="fa-solid fa-lock"></i>
            Cambiar Contrasena
          </button>
          
        </div>
        <div class="mt-4 col-md-6">
          <h4 class="text-center text-monospace font-weight-bold">Tus Datos</h4>
          <form @submit.prevent="updateProfile()">
            <div class="form-group">
              <input type="text" placeholder="Nombre" class="form-control" v-model="user.name">
            </div>
            <div class="form-group">
              <input type="email" placeholder="Correo" class="form-control" v-model="user.email">
            </div>
            <button type='submit' class="btn btn-outline-secondary">Actualizar Perfil</button>
            <button type='button' class="mx-2 btn btn-outline-secondary" @click="cancelar()">Cancelar</button>
          </form>
          <hr>
        </div>
        <div class="mt-4 col-md-2">
           <h4 class="text-center text-monospace font-weight-bold">Imagen de perfil</h4>
          <img :src="user.img" alt="logo-user" class="img-thumbnail img-fluid">
        </div>
      </div>

      <div class="mt-4 row">
        <div class="col-md-12 fixed-bottom mb-4 ">
          <h4 class="text-center text-monospace font-weight-bold" :class="[deleteAccountMessage]">Eliminar cuenta</h4>
          <p class="text-center text-monospace">Si elimina su cuenta no la prodra recuperar, desea continuar?</p>
          <div class="text-center">
            <button type='button' class="btn btn-outline-danger" @click="deleteAccount()">Eliminar Cuenta</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import ChangePassword from './ChangePassword.vue'
import Swal from 'sweetalert2'
export default {
  name: 'Profile',
  components:{
    ChangePassword
  },
  data(){
    return {
      deleteAccountMessage: 'text-danger',
      user: {}
    }
  },
  created(){
    this.getUserLogged()
    this.readToken();
  },
  methods:{
    cancelar(){
      this.$router.push({name:'home'})
    },
    goHome(){
      this.cancelar();
    },
    ...mapActions(['logOut','readToken']),
    async deleteAccount(){
      try {
        let { data } = await this.axios.delete(`/user/${this.getInfoUser._id}`);
        console.log(data);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Cuenta eliminada exitosamente exitosamente!!',
          showConfirmButton: false,
          timer: 1500
        });
        this.$router.push({name:'home'})
        this.logOut()
      } catch (error) {
        console.log(error)
      }
    },
    async getUserLogged(){
      try {
        const { data } = await this.axios.get(`/user/${this.getInfoUser._id}`);
        this.user = data.userID; 
      } catch (error) {
        console.log(error)
      }
    },
    async updateProfile(){
      try {
        /* eslint-disable */
        const { data } = await this.axios.put(`/user/${this.getInfoUser._id}`,this.user)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario actualizado exitosamente!!',
          showConfirmButton: false,
          timer: 1500
        });
        this.getInfoUser.name = this.user.name; 
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed:{
    ...mapGetters(['getInfoUser'])
  }
}
</script>

<style scoped>
 .update-password{
  text-decoration: none; color: inherit;
 }


 @media (max-width: 576px) {
      .fixed-bottom {
        position: static;
        width: 30%;
        height: auto;
      }
    }
</style>