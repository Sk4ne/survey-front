<template>
  <div class="restore-password">
    <div class="container">
      <div class="mt-4 row">
        <div class="col-md-2"></div>
        <div class="mt-4 col-md-6">
          <div class="card login-card">
            <div class="card-body">
              <!-- Loading -->
              <isLoading v-if="isLoading"/>
              <!-- </Loading -->
              <h4 class="text-center text-monospace">Recuperar tu cuenta</h4>
              <hr>
              <p class="text-center">Por favor ingrese el correo con el que se registro</p>
              <div class="alert alert-danger" role="alert">
                Por favor recuerde que el link para reestablecer la contrasena solo sera valido por 10 minutos!!!
              </div>
              <form @submit.prevent="restorePassword()">
                <div class="form-group">
                  <input type="email" class="form-control form-control-lg" placeholder="Ingrese su E-Mail" v-model="email">
                </div>
                <!-- !MENSAJE DE ERROR -->
                <!-- ?MENSAJE DE ERROR -->
                <b-alert
                  :show="dismissCountDown"
                  dismissible
                  variant="danger"
                  @dismissed="dismissCountDown=0"
                  @dismiss-count-down="countDownChanged"
                  v-if="messageError!==''"
                >
                  {{ messageError }} 
                </b-alert>
                <button type='button' class="btn btn-outline-secondary" @click="cancelar()">Cancelar</button>
                <button type='submit' class="mx-2 btn btn-outline-secondary" @click="showAlert()">Buscar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Swal from 'sweetalert2';
import isLoading  from '../components/isLoading.vue';


export default {
  components: {
    isLoading
  },
  name: 'RestorePassword',
  data(){
    return{
      // messageError: false,
      messageError: '',
      email: '',
      dismissSecs: 5,
      dismissCountDown: 0,
      isLoading: false
    }
  },
  methods:{
    async restorePassword(){
      try {
        this.isLoading = true;
        const { data } = await this.axios.post(`/restore-password`,{email: this.email});
        /* EMAIL SEND SUCCESFULLY */
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${data.msg}`,
          showConfirmButton: false,
          timer: 1500
        })
        if (data.msg === 'Email send successfully') {
          this.isLoading = false;
          this.email = null; 
          /* Redirect Login */
          this.$router.push({name: 'login'});
        }
      } catch (error) {
        // this.messageError = true; 
        this.messageError = error.response.data;
        if (this.messageError === "Don't exist and user with this email in the database") {
          this.isLoading = false; 
          this.email = null;
        }
      }
    },
    cancelar(){
      this.$router.push({name: 'login'})
    },
    /* MENSAJE DE ERROR */
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>

<style scoped>
 .login-card{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
  }
</style>