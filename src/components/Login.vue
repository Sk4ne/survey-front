<template>
  <div class="login">
    <div class="container">
      <div class="row mt-4">
        <div class="mt-4 col-md-6">
          <h1 class="text-monospace text-muted">Generador de Encuestas</h1>
          <h5>Generador de encuestas dinamicas mediante preguntas abiertas y de opcion multiple...</h5>
        </div>
        <div class="mt-4 col-md-4 login-card">
          <form class="mt-4" @submit.prevent="loginUser()">
            <div class="form-group">
              <input type="email" class="form-control" placeholder="INGRESE SU CORREO ELECTRONICO"
                v-model="user.email">
            </div>
            <div class="form-group">
              <input :type='changeInput' class="form-control" placeholder="INGRESE SU CONTRASENA"
                v-model="user.password">
            </div>
            <!-- ?Mostrar Loading -->
            <div class="loading text-center" v-if="isLoading">
              <div class="spinner-border">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <!-- ?MOSTRAR OCULTAR CONTRASENA -->
            <input type="checkbox" class="mt-3 text-center" @click="changeValueInput()"> Mostrar contrasena
            <!-- ?BOTON INICIAR SESION -->
            <button type='submit' class="mt-3 btn btn-outline-secondary mb-3 btn-block"
              variant="info">Iniciar Sesion
            </button>
            <!-- ?LOGIN WITH FACEBOOK -->
            <button type='button' class="btn btn-primary btn-block" @click="loginWithFacebook()">
              <i class="fa-brands fa-facebook"></i>
              Sign In With Facebook
            </button>
            <hr>
            <!-- ?LOGIN WITH GOOGLE -->
            <button class="btn btn-danger btn-block">
              <i class="fa-brands fa-google"></i>
              Sign In With Google 
            </button>
            <!-- ?OLVIDASTE LA CONTRASENA? -->
            <p class="mt-4 forgot-password text-right">
              <router-link :to="{ name: 'restore-password' }">Olvidaste la contraseña? </router-link><br>
            </p>
            <hr>
            <!-- ?MODAL NUEVO USUARIO -->
            <div class="modal fade" id="modalNewUser" tabindex="-1" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title text-monospace" id="exampleModalLabel"><b>Registrarte</b></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="saveNewUser()">
                      <div class="form-group">
                        <input type="text" class="form-control" placeholder="Nombre" v-model="newUser.name">
                      </div>
                      <div class="form-group">
                        <input type="email" class="form-control" placeholder="Correo" v-model="newUser.email">
                      </div>
                      <div class="form-group">
                        <input type="password" class="form-control" placeholder="Contrasena" v-model="newUser.password">
                      </div>
                      <!-- ?Mensaje de error -->
                      <b-alert
                        :show="dismissCountDown"
                        dismissible
                        variant="danger"
                        @dismissed="dismissCountDown=0"
                        @dismiss-count-down="countDownChanged"
                        v-if="errorNewUser"
                      >
                        {{ errorNewUser }} 
                      </b-alert>
                      <button type="submit" class="mt-2 btn btn-outline-secondary"><b>Registrarte</b></button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <!-- ?REGISTRARSE - CREAR CUENTA-->
            <button type='button' class="mb-4 btn btn-outline-secondary btn-block" data-toggle="modal"
              data-target="#modalNewUser">Registrarse</button>
            <!-- ?MENSAJE DE ERROR LOGIN -->
            <b-alert
              :show="dismissCountDown"
              dismissible
              variant="danger"
              @dismissed="dismissCountDown = 0"
              @dismiss-count-down="countDownChanged"
              v-if="errorLogin === true">
              {{ messageError }}
            </b-alert>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";  
import Swal from "sweetalert2";
import $ from 'jquery'

export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      user: { email: 'dani.test@gmail.com', password: 'Ak*35#' },
      /* Error login */
      errorLogin: null,
      messageError: false,
      changeInput: 'password',
      /* new USER */
      newUser: {name:'',email:'',password:''},
      errorNewUser: null,
      color: 'text-danger',
      /* LOADING */
      isLoading: false,
      dataUserFacebook: []

    }
  },
  methods: {
    ...mapActions(['saveUser', 'saveNameUser']),
    async loginUser() {
      try {
        // En este punto mostrarmos el isLoading
        this.isLoading = true;
        const { data } = await this.axios.post(`/user/login`, this.user);
        const token = data.token;
        // Almacenamos el token en el localStorage
        this.saveUser(token);

        /* Cuando obtengo la data cambio el estado del loading */
        this.isLoading = false;
        this.$router.push({ name: 'home' })
      } catch (error) {
        this.errorLogin = true;
        this.messageError = error.response.data.msg;
        this.showAlert()
        // isLoading false para que no se siga ejecutando el isLoading
        this.isLoading = false;
      }
    },
    async loginWithFacebook(){
      try {
        const data = await this.axios.get('http://localhost:3000/v1/auth/facebook')
        window.location.href = data.request.responseURL;
      } catch (error) {
        console.log(error)
      }
      
    },
    /* OCULTAR MOSTRAR CONTRASENA */
    changeValueInput() {
      if (this.changeInput == 'password') {
        this.changeInput = 'text'
      } else {
        this.changeInput = 'password'
      }
    },
    async saveNewUser() {
      try {
        const { data } = await this.axios.post(`/user`,this.newUser)
        console.log(data)
        this.newUser.email = '';
        this.newUser.name = '';
        this.newUser.password = '';
        /* SI TODO VA BIEN CIERRO EL MODAL */
        this.hideModalNewUser()

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario creado exitosamente!!',
          showConfirmButton: false,
          timer: 1500
        })

      } catch (error) {
        console.log(error)
        this.errorNewUser = true; 
        this.errorNewUser = error.response.data.errors[0].msg;
        this.showAlert();
      }
    },
    /* OCULTAR MODAL */
    hideModalNewUser(){
      $('#modalNewUser').modal('hide')
    },
    /* MENSAJE DE ERROR */
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
  },
}
</script>

<style scoped>
.login-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}
/* .loading{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
} */
</style>