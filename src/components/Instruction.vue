<template>
  <!-- Modal -->
    <div class="modal fade" id="instructions" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Instrucciones</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="description-user">
              Para guardar una pregunta por favor escribala en la caja de texto y escoja el tipo de la misma, luego pulse el boton <b>+</b> y por ultimo de click en <b>Guardar</b>
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import $ from "jquery";
  $( document ).ready(function() {
       $('#instructions').modal('toggle')
   });

export default {
  name: 'Instruction',
  /* Modal para darle instrucciones al usuario */
}
</script>

<style scoped>
 /* .description-user{
   font-family: 'Oswald', sans-serif;
 } */
</style>