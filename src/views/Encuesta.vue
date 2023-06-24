<template>
  <div class="encuesta">
    <div class="container-fluid">
      <div class="row">
        <div class="mt-4 offset-md-2 col-md-8">
          <h1 class="text-center">Listado de encuestas</h1>
          <div class="mb-4 mt-2 card" v-for="(survey, key) of allSurveys" :key="key">
            <div class="mt-4 card-body">
              <h2 class="text-center">{{ survey.titleSurvey }} </h2>
              <p class="text-warning">{{ formatDate(survey.createAt) }} - {{ survey.user.name }}</p>

              <p class="mt-4">{{ survey.description }}</p>
              <!--? LISTADO DE PREGUNTAS CON SUS RESPUESTAS -->
              <div >
                <ul>
                  <div v-for="(question, key) of survey.question" :key="key">
                    <li class="mt-4 font-weight-bold">
                      {{ question.titleQuestion }}
                    </li>
                    <hr>
                    <!-- TODO: Valido el tipo de pregunta y muestro la respuesta de las mismas -->
                    <div v-if="question.typeQuestion === 'QUESTION_OPEN'">{{ question.answerO }}</div>
                    <div v-else>
                      <p>{{ question.answerM.answer }}</p>
                    </div>
                    
                    <!-- ?BOTON EDITAR PREGUNTA -->
                    <i class="mt-2 mx-2 btn btn-outline-secondary fa-regular fa-pen-to-square " data-toggle="modal"
                      data-target="#exampleModal" @click="activateQuestion(survey._id, question._id)">
                    </i>
                    <!-- ?BOTON ELIMINAR PREGUNTA -->
                    <i class="mt-2 fa-regular fa-trash-can btn btn-outline-secondary"
                      @click="deleteQuestion(survey._id, question._id)">
                    </i>
                  </div>
                </ul>
              </div>
              <!--? </LISTADO DE PREGUNTAS CON SUS RESPUESTAS -->

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
                          <input type="text" class="form-control" v-model="answerQuestion.titleQuestion">
                          <textarea rows="5" class="mt-2 form-control" v-model="answerQuestion.answerO"></textarea>
                        </div>
                        <button type="submit" class="mx-2 btn btn-outline-secondary" @click="hideModal()">
                          Guardar
                          <i class="fa-regular fa-floppy-disk " ></i>
                        </button>
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                          Cerrar
                          <i class="fa-solid fa-xmark"></i>
                        </button>
                      </form>
                    </div>
                    <!-- MUESTRO ESTE MODAL-BODY si la pregunta es QUESTION_MULTIPLE -->
                    <div class="modal-body" v-else>
                      <input type="text" class="mb-2 form-control" v-model="answerQuestion.titleQuestion">
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
                        <button type="submit" class="mx-2 btn btn-outline-secondary" @click="hideModal()">
                          Guardar
                          <i class="fa-regular fa-floppy-disk " ></i>
                        </button>
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                          Cerrar
                          <i class="fa-solid fa-xmark"></i>
                        </button>
                       
                      </form>
                    </div>
                    <!-- </MUESTRO ESTE MODAL-BODY si la pregunta es QUESTION_MULTIPLE -->
                  </div>
                </div>
              </div>
              <!-- </MODAL EDITAR | RESPONDER UNA PREGUNTA -->

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

              <!-- !MODAL AGREGAR UNA PREGUNTA -->
               <!-- Modal -->
                <div class="modal fade" id="addNewQuestion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Nueva Pregunta...</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form @submit.prevent=" addNewQuestion(question)">
                          <div class="form-group">
                            <input type="text" class="form-control" placeholder="Titulo Pregunta" v-model="question[0].titleQuestion">
                            <select class="mt-2 form-control" v-model="question[0].typeQuestion">
                              <!-- <option value="" disabled >Choose..</option>
                              <option value="QUESTION_OPEN">QUESTION_OPEN</option>
                              <option value="QUESTION_MULTIPLE">QUESTION_MULTIPLE</option> -->
                              <option :value="typeQuestionEnum.CHOOSE" disabled >Choose..</option>
                              <option :value="typeQuestionEnum.QUESTION_OPEN">QUESTION_OPEN</option>
                              <option :value="typeQuestionEnum.QUESTION_MULTIPLE">QUESTION_MULTIPLE</option>
                            </select>
                          </div>
                          <!--! Mensaje de error que viene del backend -->
                          <b-alert
                            :show="dismissCountDown"
                            dismissible
                            variant="danger"
                            @dismissed="dismissCountDown=0"
                            @dismiss-count-down="countDownChanged"
                            v-if="errorCreateQuestion"
                          >
                            <p>{{ errorCreateQuestion }}</p>
                          </b-alert>
                          <!--! </Mensaje de error que viene del backend -->
                          
                          <!--! Error titleQuestion vacion -->
                          <div v-if="errorA === true">
                            <b-alert 
                              :show="dismissCountDown" 
                              dismissible variant="danger" 
                              @dismissed="dismissCountDown = 0"
                              @dismiss-count-down="countDownChanged">

                              <ul v-for="(error, key) in fieldsEmpty" :key="key">
                              <li>{{ error }}</li>
                              </ul>

                            </b-alert>
                          </div>
                          <!--! </Error titleQuestion vacion -->

                          <button type="submit" class="btn btn-outline-secondary">Guardar</button>
                          <button type="button" class="mx-2 btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              <!-- !</MODAL AGREGAR UNA PREGUNTA -->

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

              <!--  !Agregar nueva pregunta a la encuesta existente -->
              <button
                class="btn btn-outline-secondary"
                @click="idForNewQuestion(survey._id)"
                data-toggle="modal" data-target="#addNewQuestion" >
                <i class="fa fa-plus-circle"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { protectRoutes } from "../helpers/readToken";
import Swal from 'sweetalert2'
import $ from 'jquery'
/* eslint-disable */
import dayjs from 'dayjs'
import 'dayjs/locale/es'
dayjs.locale("es");

import { mapState } from 'vuex';
import store from '@/store';
export default {
  name: 'Encuesta',
  data() {
    return {
      selected:'',
      // nameUnique:'',
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
      /* DATA NEW QUESTION */
      question:[
        {
          titleQuestion:'',
          typeQuestion: '',
          answerM: {
            options: [],
            answer:''
          },
          answerO: '',
          // _id:''
        }
      ],
      surveyById: {},
      /* TIPOS DE PREGUNTA */
      typeQuestionEnum:{
        CHOOSE: 'CHOOSE',
        QUESTION_OPEN: 'QUESTION_OPEN',
        QUESTION_MULTIPLE: 'QUESTION_MULTIPLE',
      },
      /* error backend */
      errorCreateQuestion:false,
      /* ALERTAS */
      /* Error Fields Empty */
      errorA: null,
      fieldsEmpty:[],
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false
    }
  },
  computed: {
    ...mapState(['token'])
  },
  created() {
    this.getSurveys()
  },
  methods: {
    async getSurveys() {
      // let configToken = {
      //   headers:{
      //     'x-token': this.token 
      //   } 
      // }
      /* LEER EL HEADER OPCION 2 */
      const survey = await this.axios.get('/surveys',protectRoutes(this.token));
      this.allSurveys = survey.data;
    },
    formatDate(date) {
      let fecha = dayjs(date).format('DD MMMM YYYY');
      return fecha;
    },
    async editSurvey(idSurvey) {
      try {
        let { data } = await this.axios.get(`/survey/${idSurvey}`,protectRoutes(this.token));
        let { _id } = data;
        this.surveySelectById = _id;
        this.surveyEdit = {
          _id: _id,
          titleSurvey: data.titleSurvey,
          description: data.description
        }
      } catch (error) {
        console.log(error)
      }
    },
    async updateSurvey(survey) {
      try {
        let { data } = await this.axios.put(`/survey/${survey._id}`,survey,protectRoutes(this.token))
        this.getSurveys();
        console.log(data)
        /* ALERTA TODO SALIO PERFECTO */
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${data.msg}`,
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        console.log(error)
      }
    },
    /* CREAR NUEVA PREGUNTA - se dispara cuando pulso el boton crear nueva pregunta (+) */
    async idForNewQuestion(idSurvey){
      try {
        const { data }  = await this.axios.get(`/survey/${idSurvey}`,protectRoutes(this.token));
        this.surveyById = {
          _id: data._id
        }
      } catch (error) {
        console.log(error.response.data.errors)
      }
    },
    /* AGREGAR NUEVA PREGUNTA */
    async addNewQuestion(survey){
      try {
        await this.axios.put(`/push-question/${this.surveyById._id}`, {question: this.question}, protectRoutes(this.token));
        /* LIMPIAR EL MODELO */
        this.getSurveys();
        this.question[0].titleQuestion = '';
        this.question[0].typeQuestion = '';

        /* Si todo va bien oculto el modal de agregar pregunta */
        this.hideModalNewQuestion()
        /* ALERTA TODO SALIO PERFECTO */
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Pregunta creada exitosamente!!',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        /* ERROR TIPO PREGUNTA  */
        if(error.response.data.errors === undefined){
          this.errorA = null; 
          this.errorCreateQuestion = true;
          this.errorCreateQuestion = error.response.data.msg 
  
          /* metodo que muestra la alerta de bootstrap - vue */
          this.showAlert()
        }else{
          /* ERROR TITULO PREGUNTA VACIO */
          this.errorA = true; 
          let errors = error.response.data.errors;
          this.fieldsEmpty = errors.map(element => {
            return element.msg
          })
          this.showAlert()
        }
        
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
            await this.axios.delete(`/survey/${idSurvey}`,protectRoutes(this.token))
            /* Regresar la data actualizada */
            this.getSurveys();
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
        const { data } = await this.axios.get(`/survey/${surveyID}/${questionID}`,protectRoutes(this.token));
        const { surveyQuestion } = data;
        /* VALIDAMOS EL TIPO DE PREGUNTA Y MODIFICAMOS EL ARREGLO answerQuestion */
        if (data.typeQuestion === 'QUESTION_OPEN') {
          this.answerQuestion = surveyQuestion;
          this.typeQuestion = this.answerQuestion.typeQuestion;
          this.surveySelected = {
            id: surveyID,
            idQuestion: questionID
          }
        } else {
          this.answerQuestion = surveyQuestion;
          this.typeQuestion = this.answerQuestion.typeQuestion;
          /* CHANGE DATA */
          this.surveySelected = {
            id: surveyID,
            idQuestion: questionID
          }

          /* Esta propiedad almaceno el value del input radio */
          this.rtaMultiple  = this.answerQuestion.answerM.answer
          /* y paso el valor a la propiedad selectOption con el fin de checkear por default el input radio con la respuesta  */
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
          const {data } = await this.axios.put(`/sub-question/${this.surveySelected.id}/${this.surveySelected.idQuestion}`, { answerOpen: this.answerQuestion.answerO, titleQuestion: this.answerQuestion.titleQuestion},protectRoutes(this.token));
          // Retornar la data actualizada
          this.getSurveys();

          /* ALERTA DE QUE TODO SALIO BIEN */
          /* ALERTA TODO SALIO PERFECTO */
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          const { data } = await this.axios.put(`/sub-question/${this.surveySelected.id}/${this.surveySelected.idQuestion}`,{answerMultiple: this.selectedOption, titleQuestion: this.answerQuestion.titleQuestion},protectRoutes(this.token))
          // Retornar la data actualizada
          this.getSurveys();

          // ALERTA TODO SALIO PERFECTO
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    /* DELETE QUESTION */
    async deleteQuestion(idSurvey, idQuestion) {
      try {
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
            let removeQuestion = await this.axios.delete(`/survey/${idSurvey}/${idQuestion}`,protectRoutes(this.token))
            // Retornar la data actualizada
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
    },
    hideModalNewQuestion() {
      $('#addNewQuestion').modal('hide')
    },
    /* ALERTS */
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
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}
</style>