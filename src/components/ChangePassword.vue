<template>
  <div class="change-password">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="modal fade" id="ModalChangePassword" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title font-weight-bold text-monospace" id="exampleModalLabel">Cambiar Contrasena</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="changePassword()">
                    <div class="form-group">
                      <label for="Pasword"><b>Contrasena Actual</b></label>
                      <input type="text" class="form-control" placeholder="Contrasena Actual" v-model="oldPassword" required>
                    </div>
                    <div class="form-group">
                      <label for="ConfirmPassword"><b>Nueva Contrasena</b></label>
                      <input type="text" class="form-control" placeholder="Confirmar Contrasena" v-model='newPassword' required>
                    </div>
                    <!-- !Error oldPassword-->
                    <b-alert
                      :show="dismissCountDown"
                      dismissible
                      variant="danger"
                      @dismissed="dismissCountDown = 0"
                      @dismiss-count-down="countDownChanged"
                      v-if="errorB === true">
                      <p>{{errorOldPassword}}</p>
                    </b-alert>
                    <!-- !Error newPassword -->
                    <div v-if="errorA === true">
                      <b-alert :show="dismissCountDown" dismissible variant="danger" @dismissed="dismissCountDown = 0"
                        @dismiss-count-down="countDownChanged">
                        <ul v-for="(error, key) in showErrors" :key="key">
                         <li>{{ error }}</li>
                        </ul>
                      </b-alert>
                    </div>

                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="submit" class="mx-2 btn btn-outline-secondary" variant="info">Cambiar
                      Contrasena
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'
import $ from 'jquery'
export default {
  name: 'ChangePassword',
  data() {
    return {
      user: {},
      newPassword: null,
      // errors: [],
      oldPassword: null,
      errorOldPassword: null,
      errorB: null,
      errorA: null,
      // En este arreglo almaceno los errores que vienen del backend - express-validator
      showErrors: [],
      dismissSecs: 4,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const { data } = await this.axios.get(`/user/${this.getInfoUser._id}`)
        this.user = data.userID;
      } catch (error) {
        console.log(error)
      }
    },
    ...mapActions(['logOut']),
    async changePassword() {
      try {
        const { data } = await this.axios.put(`/change-password/${this.getInfoUser._id}`, { oldPassword: this.oldPassword, newPassword: this.newPassword });
        /* Cambiamos el estado de la propiedad errorB  */
        // console.log('ERROR A: ' + this.errorA)
        // console.log('ERROR B: ' + this.errorB)
        this.errorA = null; 
        console.log('THIS ERROR B: ' + this.errorA)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Contrasena Actualizada!!',
          showConfirmButton: false,
          timer: 1500
        })
        this.hideModalChangePassword()
        /* SI TODO VA BIEN CIERRO SESION PARA EL USUARIO INICIE CON LA NUEVA CONTRASENA */
        this.logOut()

        /* LIMPIAR LOS CAMPOS DEL FORMULARIO */
        this.oldPassword = null;
        this.newPassword = null;
        // }
      } catch (error) {
         if(error.response.data.errors!== undefined){
            this.errorA = true; 
            let errors = error.response.data.errors;
            this.showErrors = errors.map(element => {
              return element.msg
            })
            this.showAlert()
            console.log(this.showErrors)
         }else{
           this.errorB = true; 
           this.errorOldPassword = error.response.data.msg; 
          //  this.errorB = null; 
           console.log(error.response.data.errors)
           console.log(this.showErrors)
           this.showAlert()
           this.showErrors = null
           this.errorA = false;
           console.log(error.response.data)
           console.log(this.errorOldPassword)
         }
      }
    },
    hideModalChangePassword() {
      $('#ModalChangePassword').modal('hide')
    },

    /* MENSAJE DE ERROR */
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    }
  },
  computed: {
    ...mapGetters(['getInfoUser'])
  }
}
</script>