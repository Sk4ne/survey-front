<template>
  <div class="home">
    <div class="container">
      <div class="mt-4 row">
        <div class="offset-2 col-sm-12  col-md-8">
          <h2 class="text-center">Encuestas</h2>
          <form class="mt-4" @submit.prevent="saveSurvey()" autocomplete="off" >
            <!-- NEW -->
            <div class="form-group">
              <input type="text" class="form-control form-control-lg" id="exampleInputEmail1" placeholder="TITULO ENCUESTA"
                v-model="survey.titleSurvey">
            </div>
            
            <div class="form-group">
              <textarea name="" id="" rows="5" class="form-control" placeholder="DESCRIPCION ENCUESTA"
                v-model="survey.description"></textarea>
            </div>
            <!-- </NEW -->
            <!-- FORMULARIO DOBLE -->
            <div class="row" >
              <div class="col">
                <input type="text" class="form-control" placeholder="TITULO PREGUNTA" v-model="model.titleQuestion">
              </div>
              <div class="col">
                <select name="" id="" class="form-control" v-model="model.typeQuestion">
                  <option :value="typeQuestionEnums.CHOOSE">Choose...</option>
                  <option :value="typeQuestionEnums.QUESTION_OPEN">QUESTION_OPEN</option>
                  <option :value="typeQuestionEnums.QUESTION_MULTIPLE">QUESTION_MULTIPLE</option>
                </select>
              </div>
            </div>
            <div class="mt-2 form-group" v-if="model.typeQuestion === typeQuestionEnums.QUESTION_OPEN ">
              <textarea rows="5" class="form-control" placeholder="RTA ABIERTA" v-model="model.answerO"  disabled></textarea>
            </div>
            <!-- INPUT RADIO -->
            <div v-if="model.typeQuestion === typeQuestionEnums.QUESTION_MULTIPLE">
              <div class="mt-2 form-check" >
                <input type="radio" class="input-check-radio" disabled>
                <label class="mx-2 form-check-label" for="exampleRadios1"> SI</label>
              </div>
              <div class="mt-2 form-check">
                <input type="radio" class="input-check-radio" disabled>
                <label class="mx-2 form-check-label" for="exampleRadios1"> NO</label>
              </div>
              <div class="mt-2 form-check">
                <input type="radio" class="input-check-radio" disabled>
                <label class="mx-2 form-check-label" for="exampleRadios1"> UN POCO</label>
              </div>
            </div>
            <!-- </INPUT RADIO -->

            <!-- NUEVA PREGUNTA -->
            <div class='mt-4' v-if="newQuestions.length > 0">
              <!-- SE CREA CUANDO PRESIONO EL boton +  -->
              <div v-for="(question, key) in newQuestions" :key="key" ref="newDataDOM">
                <div class="row">
                  <div class="col">
                    <input type="text" class="form-control " placeholder="TITULO PREGUNTA"
                      v-model="question.titleQuestion">
                  </div>
                  <div class="col">
                    <select name="" id="" class="form-control" v-model="question.typeQuestion">
                      <!-- <option value="CHOOSE">Choose...</option>
                      <option value="QUESTION_OPEN">QUESTION_OPEN</option>
                      <option value="QUESTION_MULTIPLE">QUESTION_MULTIPLE</option> -->
                      <option :value="typeQuestionEnums.CHOOSE">Choose...</option>
                      <option :value="typeQuestionEnums.QUESTION_OPEN">QUESTION_OPEN</option>
                      <option :value="typeQuestionEnums.QUESTION_MULTIPLE">QUESTION_MULTIPLE</option>
                    </select>
                  </div>
                </div>
                <div class="mt-2 form-group" v-if="question.typeQuestion === typeQuestionEnums.QUESTION_OPEN" ref="openQuestion">
                  <textarea
                    name=""
                    id=""
                    rows="5"
                    class="form-control"
                    placeholder="RTA ABIERTA"
                    v-model="question.answerO"
                    disabled>
                  </textarea>
                </div>
                <!-- INPUT RADIO -->
                <div v-if="question.typeQuestion === typeQuestionEnums.QUESTION_MULTIPLE" >
                  <div class="mt-2 form-check">
                    <input type="radio" class="input-check-radio" disabled>
                    <label class="mx-2 form-check-label" for="exampleRadios1"> SI</label>
                  </div>
                  <div class="mt-2 form-check">
                    <input type="radio" class="input-check-radio" disabled>
                    <label class="mx-2 form-check-label" for="exampleRadios1"> NO</label>
                  </div>
                  <div class="mt-2 form-check">
                    <input type="radio" class="input-check-radio" disabled>
                    <label class="mx-2 form-check-label" for="exampleRadios1"> UN POCO</label>
                  </div>
                </div>
                <!-- </INPUT RADIO -->
                 <!-- ELIMINAR PREGUNTA DEL DOM -->
                 <button type='button' class="mt-4 mb-4 btn btn-outline-secondary" @click="deleteElementDom(this)">
                  Eliminar
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </div>
             
            </div>
            <!-- </NUEVA PREGUNTA -->

            <!-- ALL ERRORS -->
            <div v-show="messageError===true" class="mt-4 p-4 bg-danger text-white">
              <ul>
                <li v-for="(error,key) in allErrors" :key="key"> {{ error }}</li>
              </ul>
            </div>

            <br>
            <!-- <b-alert show>Default Alert</b-alert> -->
            <!-- </ALL ERRORS -->
            <!--</ Mensajes de error -->
            <button type="submit" class="mt-2 btn btn-outline-secondary mb-4">
              Guardar
              <i class="fa-solid fa-floppy-disk"></i>  
            </button>
          </form>
        </div>
        <div class="col-md-2">
          <!-- BOTON CREAR NUEVA DATA -->
          <button class="btn btn-outline-secondary" @click="saveNewQuestion()" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Agregar Pregunta!!" data-trigger="hover">
            <i class="fa fa-plus-circle"></i>
            <!-- Agregar -->
          </button>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'Home',
  components: {

  },
  created(){
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
        CHOOSE:null
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
              option: [],
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
          option: [],
          answer: ''
        },
        titleQuestion: [],
        // typeQuestion: [],
        typeQuestion: [],
        answerO: ''
      }
    }
  },
  // computed(){
    
  // },
  methods: {
    deleteElementDom(){
      this.newQuestions.pop()
    },
    saveNewQuestion() {
      this.newQuestions.push(this.model)
      this.model = {
        answerM: {
          option: [],
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
          ...this.survey,
          question: this.newQuestions
        })
        this.surveys.unshift(surveys.data);
        console.log('DATA SAVED')
        console.log(surveys);
        this.$router.push({name: 'encuesta'})
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
        listErrors.forEach( ( { msg } )  => {
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
.space-bottom{
  margin-bottom: 10px;
}
</style>