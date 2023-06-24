<template>
  <div class="new-password">
    <div class="container">
      <div class="mt-4 row">
        <div class="col-md-2"></div>
        <div class="mt-4 col-md-6 login-card">
          <form class="mt-4" @submit.prevent="newPassword()">
            <h3 class="text-center text-monospace">Nueva Contrasena</h3>
            <hr>
            <p class="text-center">Por favor ingrese una contrasena que contenga al menos una letra <b>mayuscula</b>, una <b>minuscula</b>, un <b>digito</b> y un <b>caracter especial.</b></p>
            <hr>
            <div class="mt-4 form-group">
              <input :type='changeInput' class="form-control form-control-lg" placeholder="Nueva Contrasena" v-model="password">
            </div>
            <input type="checkbox" class="mt-3 text-center" @click="changeValueInput()"> Mostrar contrasena 
            <hr>
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
            <div v-if="messageErrorPass === true">
              <b-alert :show="dismissCountDown" dismissible variant="danger" @dismissed="dismissCountDown = 0"
                @dismiss-count-down="countDownChanged">
                <ul v-for="(error, key) in arrayErrors" :key="key">
                  <li>{{ error }}</li>
                </ul>
              </b-alert>
            </div>
            <hr>
            <button type='button' class="mb-4 btn btn-outline-secondary" @click="cancelar()">Cancelar</button>
            <button type='submit' class="mb-4 mx-2 btn btn-outline-secondary">Guardar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'newPassword',
  data(){
    return {
      password: null,
      changeInput:'password',
      messageError: '',
      arrayErrors: [],
      messageErrorPass: null,
      dismissSecs: 5,
      dismissCountDown: 0,
    }
  },
  methods:{
    cancelar(){
      this.$router.push({name: 'login'})
    },
    async newPassword(){
      try {
        /* eslint-disable */
        const { data } = await this.axios.post(`/password-reset/${this.$route.params.id}/${this.$route.params.token}`,{password: this.password});
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${data.msg}`,
            showConfirmButton: false,
            timer: 1500
        })
        this.showAlert()
        this.$router.push({name:'login'})
      } catch (error) {
        // this.showAlert()
        if(error.response.data.msg && error.response.data.errors === undefined){
          this.messageError = error.response.data.msg; 
          this.messageErrorPass = false;
          this.showAlert()
          console.log('ERROR 1')
        }
        if (error.response.data.errors!==undefined) {
          this.messageErrorPass = true;
          let errors  = error.response.data.errors
          this.arrayErrors = errors.map(element => {
              return element.msg
          })
          this.showAlert()
          // console.log(this.arrayErrors)
        }
      }
    },
    /* ESTE CODIGO SE ESTA REPITENDO, POR FAVOR NO OLVIDES CREAR UN COMPONENETE PARA REUTILIZARLO */
    changeValueInput(){
       if(this.changeInput == 'password'){
         this.changeInput ='text' 
       }else{
         this.changeInput='password'
       }
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