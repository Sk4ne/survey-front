<template>
  <div class="encuesta">
    <div class="container-fluid">
      <!-- COL ORIGINAL offset-md-2 col-md-8 -->
      <div class="row">
        <div class="mt-4 offset-md-2 col-md-8">
          <h1 class="text-center">Listado de encuestas</h1>
          <!-- <div class="mb-4 mt-2 card" v-for="(survey,key) of allSurveys" :key="key"> ORIGINAL -->
          <div class="mb-4 mt-2 card" v-for="(survey, key) of allSurveys" :key="key">
            <div class="mt-4 card-body">
              <h2 class="text-center">{{ survey.titleSurvey }}</h2>
              <p class="text-warning">{{ formatDate(survey.createAt) }}</p>

              <p class="mt-4">{{ survey.description }}</p>
              <!-- LISTADO DE PREGUNTAS CON SUS RESPUESTAS -->
              <div >
                <ul>
                  <div v-for="(question, key) of survey.question" :key="key">
                    <li class="mt-4 font-weight-bold">
                      {{ question.titleQuestion }} - <span style="color:red">{{ question.typeQuestion }}</span>
                    </li>
                    <hr>
                    <!-- TODO: Valido el tipo de pregunta y muestro la respuesta de las mismas -->
                    <div v-if="question.typeQuestion === 'QUESTION_OPEN'">{{ question.answerO }}</div>
                    <div v-else>
                      <p>{{ question.answerM.answer }}</p>
                    </div>
                    
                    <!-- !BOTON EDITAR PREGUNTA -->
                    <i class="mt-2 mx-2 btn btn-outline-secondary fa-regular fa-pen-to-square " data-toggle="modal"
                      data-target="#exampleModal" @click="activateQuestion(survey._id, question._id)">
                    </i>
                    <!-- !BOTON ELIMINAR PREGUNTA -->
                    <i class="mt-2 fa-regular fa-trash-can btn btn-outline-secondary"
                      @click="deleteQuestion(survey._id, question._id)">
                    </i>
                  </div>
                </ul>
              </div>
              <!-- </LISTADO DE PREGUNTAS CON SUS RESPUESTAS -->

              <!-- ====================================================================== -->
              <!-- MODAL EDITAR | RESPONDER UNA PREGUNTA -->
              <!-- !RESPONDER UN PREGUNTA - BETTER COMMENTS -->
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Respondiendo...</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body" v-if="typeQuestion === 'QUESTION_OPEN'">
                      <form @submit.prevent="updateAnswer()">
                        <div class="form-group">
                          <p class="text-center font-weight-bold">{{ answerQuestion.titleQuestion }}</p>
                          <textarea rows="5" class="form-control" v-model="answerQuestion.answerO"></textarea>
                        </div>
                        <button type="submit" class="mx-2 btn btn-outline-secondary" @click="hideModal()">Guardar</button>
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
                      </form>
                    </div>
                    <!-- MUESTRO ESTE MODAL-BODY si la pregunta es QUESTION_MULTIPLE -->
                    <!-- !MUESTRO ESTE MODAL-BODY si la pregunta es QUESTION_MULTIPLE -->
                    <div class="modal-body" v-else>
                      <p class="text-center font-weight-bold">{{ answerQuestion.titleQuestion }}</p>
                      <div >
                      </div>
                      <form @submit.prevent="updateAnswer()">
                        <div class="form-check">
                          <input
                            type="radio"
                            id="respuestaSi"
                            class="form-check-input"
                            name="radioB"
                            :value="optionAnswers.optionSi"
                            v-model="selectedOption"
                            >
                          <label class="form-check-label" for="ExampleRadio1"> SI</label>
                        </div>
                        <div class="form-check">
                          <input type="radio" class="form-check-input" name="radioB" :value="optionAnswers.optionNo" v-model="selectedOption">
                          <label class="form-check-label" for="ExampleRadio1"> NO</label>
                        </div>
                        <div class="form-check">
                          <input type="radio" class="form-check-input" name="radioB" :value="optionAnswers.optionUnPoco" v-model="selectedOption">
                          <label class="form-check-label" for="ExampleRadio1"> UNPOCO</label>
                        </div>
                        <hr>
                        <button type="submit" class="mx-2 btn btn-outline-secondary" @click="hideModal()">Guardar</button>
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
                      </form>
                    </div>
                    <!-- </MUESTRO ESTE MODAL-BODY si la pregunta es QUESTION_MULTIPLE -->
                    <!-- !</MUESTRO ESTE MODAL-BODY si la pregunta es QUESTION_MULTIPLE -->
                  </div>
                </div>
              </div>
              <!-- </MODAL EDITAR | RESPONDER UNA PREGUNTA -->
              <!-- !</RESPONDER UN PREGUNTA - BETTER COMMENTS -->

              <!-- MODAL EDIT SURVEY -->
              <div class="modal fade" id="modalEditSurvey" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Editando encuesta...</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form @submit.prevent="updateSurvey(surveyEdit)">
                        <input type="text" class="form-control" v-model="surveyEdit.titleSurvey">
                        <textarea rows="5" class="mt-2 form-control" v-model="surveyEdit.description"></textarea>

                        <button type="submit" class="mt-2 mx-2 btn btn-outline-secondary"
                          @click="hideModalSurvey()">Guardar</button>
                        <button type="button" class="mt-2 btn btn-outline-secondary"
                          data-dismiss="modal">Cancelar</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <!-- </MODAL EDIT SURVEY -->
              <!-- MENSAJE DE ERROR BACKEND -->
              <p class="text-center text-white bg-danger p-2" v-if="errorMessage">{{ errorMessage }}</p>
            </div>
            <div class="card-footer">
              <button class="btn btn-outline-secondary" @click="deleteSurvey(survey._id)">
                Eliminar
                <i class="fa-regular fa-trash-can"></i>
              </button>
              <!-- EDITAR ENCUESTA -->
              <button class='mx-2 btn btn-outline-secondary ' @click="editSurvey(survey._id)" data-toggle="modal"
                data-target="#modalEditSurvey">
                Editar
                <i class="fa-regular fa-pen-to-square"></i>
              </button>
              <!-- </EDITAR ENCUESTA> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import $ from 'jquery'
/* eslint-disable */
import dayjs from 'dayjs'
import 'dayjs/locale/es'
dayjs.locale("es");
export default {
  name: 'Encuesta',
  data() {
    return {
      selected:'',
      nameUnique:'',
      disableRadio: false,
      dateFormat: null,
      allSurveys: [],
      errorMessage: null,
      /* ESTA PROPIEDAD LA NECESITO PARA VALIDAR EL TIPO DE PREGUNTA */
      typeQuestion: null,
      surveySelected: null,
      surveySelectById: null,
      // answerQuestion: {}, ORIGINAL 
      answerQuestion: {}, 
      surveyEdit: {},
      /* OPCIONES RESPUESTA */
      optionAnswers: {
        'optionSi': 'SI',
        'optionNo': 'NO',
        'optionUnPoco' : 'UNPOCO'
      },
      /* SELECTED OPTION EXAMPLE */
      rtaMultiple:'',
      /* SE LE ASIGNA EL VALOR QUE EL USUARIO SELECCIONA EN LAS PREGUNTAS MULTIPLES - SI,NO,UNPOCO */
      selectedOption: '',
    }
  },
  created() {
    this.getSurveys()
  },
  methods: {
    async getSurveys() {
      const survey = await this.axios.get('/surveys');
      this.allSurveys = survey.data;
      /* name unique */
      this.nameUnique = Math.random().toString(36).substr(2, 18);
      console.log(this.nameUnique)
      // console.log(this.allSurveys)
    },
    formatDate(date) {
      let fecha = dayjs(date).format('DD MMMM YYYY');
      return fecha;
    },
    async editSurvey(idSurvey) {
      try {
        let { data } = await this.axios.get(`/survey/${idSurvey}`);
        let { _id } = data;
        this.surveySelectById = _id;
        this.surveyEdit = {
          _id: _id,
          titleSurvey: data.titleSurvey,
          description: data.description
        }
        // console.log(this.surveySelectById)
        // console.log(this.surveyEdit)
      } catch (error) {
        console.log(error)
      }
    },
    async updateSurvey(survey) {
      try {
        // await this.axios.put(`/survey/${this.surveySelectById}`,{data: this.surveyEdit})
        let data = await this.axios.put(`/survey/${survey._id}`, survey)
        this.getSurveys();
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    async deleteSurvey(idSurvey) {
      try {
        Swal.fire({
          title: 'Esta seguro?',
          text: "Esta accion no se podra revertir!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            await this.axios.delete(`/survey/${idSurvey}`)
            /* update data */
            this.getSurveys();
            console.log('Survey delete succesfully');
            Swal.fire(
              'Eliminada!',
              'Encuesta eliminada.',
              'success'
            )
          }
        })
      } catch (error) {
        console.log(error.response.data.errors[0].msg)
        /* SAVE MESSAGE FROM BACKEND */
        this.errorMessage = error.response.data.errors[0].msg
      }
    },
    /* ACTIVATE QUESTION */
    async activateQuestion(surveyID, questionID) {
      try {
        const { data } = await this.axios.get(`/survey/${surveyID}/${questionID}`);
        const { surveyQuestion } = data;
        /* VALIDAMOS EL TIPO DE PREGUNTA Y MODIFICAMOS EL ARREGLO answerQuestion */
        if (data.typeQuestion === 'QUESTION_OPEN') {
          this.answerQuestion = surveyQuestion;
          this.typeQuestion = this.answerQuestion.typeQuestion;
          this.surveySelected = {
            id: surveyID,
            idQuestion: questionID
          }
          console.log(this.surveySelected);
        } else {
          this.answerQuestion = surveyQuestion;
          this.typeQuestion = this.answerQuestion.typeQuestion;
          /* CHANGE DATA */
          this.surveySelected = {
            id: surveyID,
            idQuestion: questionID
          }

          console.log('SOY ANSWERQUESTION');
          /* TEST - MEJORAR ESTO */
          this.rtaMultiple  = this.answerQuestion.answerM.answer
          console.log(this.rtaMultiple);
          this.selectedOption = this.rtaMultiple
        }
        
      } catch (error) {
        console.log(error)
      }
    },
    /* ANSWER QUESTION */
    async updateAnswer() {
      try {
        /* VALIDO EL TIPO DE PREGUNTA */
        if (this.typeQuestion == 'QUESTION_OPEN') {
          await this.axios.put(`/sub-question/${this.surveySelected.id}/${this.surveySelected.idQuestion}`, { answerOpen: this.answerQuestion.answerO });
          /* LLAMO EL METODO QUE ME RETORNA TODAS LAS ENCUESTAS - PARA ACTUALIZAR ESTA VISTA */
          this.getSurveys();
          console.log(this.typeQuestion)
        } else {
          // alert('SOY UNA PREGUNTA MULTIPLE - AHORA TRABAJARE CONTIGO');
          await this.axios.put(`/sub-question/${this.surveySelected.id}/${this.surveySelected.idQuestion}`,{answerMultiple: this.selectedOption})
          this.getSurveys();
        }
      } catch (error) {
        console.log(error)
      }
    },
    /* DELETE QUESTION */
    async deleteQuestion(idSurvey, idQuestion) {
      try {
        /* MENSAJE SWEETALERT DELETE */
        Swal.fire({
          title: 'Esta seguro?',
          text: "Esta accion no se podra revertir",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            let removeQuestion = await this.axios.delete(`/survey/${idSurvey}/${idQuestion}`)
            /* update data */
            this.getSurveys();
            console.log(removeQuestion)
            Swal.fire(
              'Eliminado!',
              'Pregunta eliminada.',
              'success'
            )
          }
        })
        /* </MENSAJE SWEETALERT DELETE */
      } catch (error) {
        console.log(error)
      }
    },
    hideModal() {
      $('#exampleModal').modal('hide')
    },
    hideModalSurvey() {
      $('#modalEditSurvey').modal('hide')
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}
</style>