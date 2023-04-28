<template>
  <div class="new-user">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <!-- <div class="modal fade" id="modalNewUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-monospace" id="exampleModalLabel"><b>Registrarte</b></h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="newUser()">
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder="Nombre" v-model="user.name">
                    </div>
                    <div class="form-group">
                      <input type="email" class="form-control" placeholder="Correo" v-model="user.email">
                    </div>
                    <div class="form-group">
                      <input type="password" class="form-control" placeholder="Contrasena" v-model="user.password">
                    </div>
                    <button type="submit" class="btn btn-outline-secondary"><b>Registrarte</b></button>
                  </form>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewUser',
  data() {
    return {
    }
  },
  methods:{
    
  }
}
</script>

<style scoped></style>