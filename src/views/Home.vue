<template>
  <div class="home">
    <div class="container">
      <div class="mt-4 row">
        <div class="col-md-2"></div>
        <div class="col-sm-12  col-md-8">
          <Instruction/>
          <h2 class="text-center">Encuestas</h2>
          <form class="mt-4" @submit.prevent="saveSurvey()" autocomplete="off">
            <!-- NEW -->
            <div class="form-group">
              <input type="text" class="form-control form-control-lg" id="exampleInputEmail1"
                placeholder="TITULO ENCUESTA" v-model="survey.titleSurvey">
            </div>

            <div class="form-group">
              <textarea name="" id="" rows="5" class="form-control" placeholder="DESCRIPCION ENCUESTA"
                v-model="survey.description"></textarea>
            </div>
            <!-- </NEW -->
            <!-- FORMULARIO DOBLE -->
            <div class="row">
              <div class="col">
                <input type="text" class="form-control" placeholder="TITULO PREGUNTA" v-model="model.titleQuestion"
                  ref="input1" @keydown.enter.prevent="submit" />
              </div>
              <div class="col">
                <select name="" id="" class="form-control" v-model="model.typeQuestion">
                  <!-- <option :value="typeQuestionEnums.CHOOSE">Choose...</option> ORIGINAL -->
                  <option value="" disabled>Choose...</option>
                  <option :value="typeQuestionEnums.QUESTION_OPEN">QUESTION_OPEN</option>
                  <option :value="typeQuestionEnums.QUESTION_MULTIPLE">QUESTION_MULTIPLE</option>
                </select>
              </div>
            </div>
            <div class="mt-2 form-group" v-if="model.typeQuestion === typeQuestionEnums.QUESTION_OPEN">
              <textarea rows="5" class="form-control" placeholder="RTA ABIERTA" v-model="model.answerO"
                disabled></textarea>
            </div>
            <!-- INPUT RADIO -->
            <div v-if="model.typeQuestion === typeQuestionEnums.QUESTION_MULTIPLE">
              <div class="mt-2 form-check">
                <input type="radio" class="input-check-radio" :value="typeOptionEnums.optionSi"
                  v-model="model.answerM.answer" disabled>
                <label class="mx-2 form-check-label" for="exampleRadios1"> {{ typeOptionEnums.optionSi }}</label>
              </div>
              <div class="mt-2 form-check">
                <input type="radio" class="input-check-radio" :value="typeOptionEnums.optionNo"
                  v-model="model.answerM.answer" disabled>
                <label class="mx-2 form-check-label" for="exampleRadios1"> {{ typeOptionEnums.optionNo }}</label>
              </div>
              <div class="mt-2 form-check">
                <input type="radio" class="input-check-radio" :value="typeOptionEnums.optionUnPoco"
                  v-model="model.answerM.answer" disabled>
                <label class="mx-2 form-check-label" for="exampleRadios1"> {{ typeOptionEnums.optionUnPoco }}</label>
              </div>
            </div>
            <!-- </INPUT RADIO -->
            <!-- ======= NUEVA PREGUNTA ========= -->
            <!-- NUEVA PREGUNTA -->
            <div class='mt-4' v-if="newQuestions.length > 0">
              <!-- SE CREA CUANDO PRESIONO EL boton +  -->
              <div v-for="(question, key) in newQuestions" :key="key" ref="newDataDOM">
                <div class="row">
                  <div class="col">
                    <input type="text" class="form-control " placeholder="TITULO PREGUNTA"
                      v-model="question.titleQuestion" ref="input2">
                  </div>
                  <div class="col">
                    <select name="" id="" class="form-control" v-model="question.typeQuestion">
                      <option :value="typeQuestionEnums.CHOOSE">Choose...</option>
                      <option :value="typeQuestionEnums.QUESTION_OPEN">QUESTION_OPEN</option>
                      <option :value="typeQuestionEnums.QUESTION_MULTIPLE">QUESTION_MULTIPLE</option>
                    </select>
                  </div>
                </div>
                <div class="mt-2 form-group" v-if="question.typeQuestion === typeQuestionEnums.QUESTION_OPEN"
                  ref="openQuestion">
                  <textarea name="" id="" rows="5" class="form-control" placeholder="RTA ABIERTA"
                    v-model="question.answerO" disabled>
                    </textarea>
                </div>
                <!-- ?INPUT RADIO -->
                <div v-if="question.typeQuestion === typeQuestionEnums.QUESTION_MULTIPLE">
                  <div class="mt-2 form-check">
                    <input type="radio" class="input-check-radio" :value='typeOptionEnums.optionSi'
                      v-model="model.answerM.answer" disabled>
                    <label class="mx-2 form-check-label" for="exampleRadios1"> {{ typeOptionEnums.optionSi }}</label>
                  </div>
                  <div class="mt-2 form-check">
                    <input type="radio" class="input-check-radio" :value='typeOptionEnums.optionNo'
                      v-model="model.answerM.answer" disabled>
                    <label class="mx-2 form-check-label" for="exampleRadios1"> {{ typeOptionEnums.optionNo }}</label>
                  </div>
                  <div class="mt-2 form-check">
                    <input type="radio" class="input-check-radio" :value='typeOptionEnums.optionUnPoco'
                      v-model="model.answerM.answer" disabled>
                    <label class="mx-2 form-check-label" for="exampleRadios1"> {{ typeOptionEnums.optionUnPoco }}</label>
                  </div>
                </div>
                <!-- ?</INPUT RADIO -->
                <!-- ELIMINAR PREGUNTA DEL DOM -->
                <button type='button' class="mt-4 mb-4 btn btn-outline-secondary" @click="deleteElementDom(this)">
                  Eliminar
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </div>

            </div>
            <!-- </NUEVA PREGUNTA -->
            <!-- =========== </NUEVA PREGUNTA> ============= -->

            <!-- !ALL ERRORS -->
            <div v-show="messageError === true" class="mt-4 p-4 bg-danger text-white">
              <ul>
                <li v-for="(error, key) in allErrors" :key="key"> {{ error }}</li>
              </ul>
            </div>

            <br>
            <!-- !</ALL ERRORS -->
            <button type="submit" class="mt-2 btn btn-outline-secondary mb-4">
              Guardar
              <i class="fa-solid fa-floppy-disk"></i>
            </button>
          </form>
        </div>
        <div class="col-md-2">
          <!-- BOTON CREAR NUEVA DATA -->
          <!-- <button class="btn btn-outline-secondary" @click="saveNewQuestion()" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Agregar Pregunta!!" data-trigger="hover"> -->
          <button class="btn btn-outline-secondary" @click="saveNewQuestion()" data-container="body" data-toggle="tooltip"
            data-placement="bottom" title="Crear Pregunta">
            <i class="fa fa-plus-circle"></i>
            <!-- Agregar -->
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { protectRoutes } from "../helpers/readToken";
import Swal from 'sweetalert2'
import Instruction from '../components/Instruction.vue';
import { mapState } from 'vuex';
export default {
  name: 'Home',
  components: {
    Instruction
  },
  /* DATA ORIGINAL */
  created() {
    this.typeQuestionEnums.QUESTION_MULTIPLE = 'QUESTION_MULTIPLE';
    this.typeQuestionEnums.QUESTION_OPEN = 'QUESTION_OPEN';
    this.typeQuestionEnums.CHOOSE = 'CHOOSE';
  },
  data() {
    return {
      messageError: false,
      allErrors: [],
      typeQuestionEnums: {
        // QUESTION_MULTIPLE: 'QUESTION_MULTIPLE',
        // QUESTION_OPEN: 'QUESTION_OPEN'
        QUESTION_MULTIPLE: null,
        QUESTION_OPEN: null,
        CHOOSE: null,
      },
      /* PREGUNTAS MULTIPLES */
      typeOptionEnums: {
        optionSi: 'SI',
        optionNo: 'NO',
        optionUnPoco: 'UNPOCO'
      },
      typeQuestion: '',
      questionAnswer: '',
      surveys: [],
      survey: {
        titleSurvey: 'Vue3',
        description: 'Aliquam sed ligula vitae lacus mollis commodo. Proin a laoreet nisl. In venenatis urna id convallis pretium. Etiam quis aliquam arcu, at porttitor nisi. Mauris viverra nunc metus',
        question: [
          {
            answerM: {
              options: [],
              answer: ''
            },
            titleQuestion: [],
            typeQuestion: [],
            answerO: ''
          }
        ]
      },
      newQuestions: [],
      model: {
        answerM: {
          options: [],
          answer: ''
        },
        titleQuestion: [],
        // typeQuestion: [],
        typeQuestion: [],
        answerO: ''
      },

      /* PREGUNTA MULTIPLE  eliminar esto no hace nada....*/
      answerMultiple: {
        // SI,NO,UNPOCO
        options: [],
        answer: ''
      }
    }
  },
  computed:{
    ...mapState(['token'])
  },
  methods: {
    submit(ev) {
      if (ev.key == 'Enter') {
        ev.preventDefault();
        return;
      }
    },
    deleteElementDom() {
      this.newQuestions.pop()
    },
    /* ESTE METODO SE LE ASIGNA AL BOTON + -> AGREGAR NUEVA PREGUNTA */
    saveNewQuestion() {
      /* eslint-disable */
      this.newQuestions.push(this.model)
      /* LIMPIAR EL MODELO */
      this.model = {
        answerM: {
          options: [],
          answer: ''
        },
        titleQuestion: [],
        typeQuestion: [],
        answerO: ''
      }
    },
    async getSurveys() {
      /* eslint-disable */
      this.axios.get('/surveys')
        .then((res) => {
          // console.log(res.data);
        }).catch(err => {
          console.log(err);
        })
    },
    async saveSurvey() {
      try {
        const surveys = await this.axios.post('/survey', {
          /* TituloEncuesta, descripcionEncuesta */
          ...this.survey,
          /* ARREGLO DE PREGUNTAS */
          question: this.newQuestions 
        },protectRoutes(this.token))
        this.surveys.unshift(surveys.data);
        console.log('DATA SAVED')
        // console.log(this.surveys)
        this.$router.push({ name: 'encuesta' })

        /* MENSAJE EXITO SWEETALERT 2 */
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Encuesta guardada exitosamente',
          showConfirmButton: false,
          timer: 1500
        })

      } catch (error) {
        /* EL BACKEND ME RETORNA UN ARREGLO CON TODOS LOS ERRORES  */

        let listErrors = error.response.data.errors;
        listErrors.forEach(({ msg }) => {
          this.allErrors.push(msg);
          this.messageError = true;
        });
        console.log(error.response.data.errors)
      }
    }
  },
}
</script>

<style scoped>
.space-bottom {
  margin-bottom: 10px;
}
</style>