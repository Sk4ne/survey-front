<template>
  <div class="home">
    <div class="container">
      <div class="mt-4 row">
        <div class="offset-2 col-md-8">
          <h2 class="text-center">Encuestas</h2>
          <form class="mt-4" @submit.prevent="saveSurvey()" autocomplete="off">
            <div class="form-group">
              <input type="text" class="form-control" id="exampleInputEmail1" placeholder="TITULO ENCUESTA"
                v-model="survey.titleSurvey">
            </div>
            <div class="form-group">
              <textarea name="" id="" rows="5" class="form-control" placeholder="DESCRIPCION ENCUESTA"
                v-model="survey.description"></textarea>
            </div>
            <!-- FORMULARIO DOBLE -->
            <div class="row">
              <div class="col">
                <input type="text" class="form-control" placeholder="TITULO PREGUNTA" v-model="model.titleQuestion">
              </div>
              <div class="col">
                <select name="" id="" class="form-control" v-model="model.typeQuestion">
                  <option value="x">Choose...</option>
                  <option :value="typeQuestionEnums.QUESTION_OPEN">QUESTION_OPEN</option>
                  <option :value="typeQuestionEnums.QUESTION_MULTIPLE">QUESTION_MULTIPLE</option>
                </select>
              </div>
            </div>
            <!-- </FORMULARIO DOBLE -->
            <!-- <div class="mt-2 form-group" v-if="model.typeQuestion === typeQuestionEnums.QUESTION_OPEN">
              <textarea name="" id="" rows="5" class="form-control" placeholder="RTA ABIERTA"
                v-model="model.answerO"></textarea>
            </div>
            <div v-if="model.typeQuestion === typeQuestionEnums.QUESTION_MULTIPLE" class="form-group">
              <input type="radio" name="" id="" class="input-check-radio">
            </div> -->
            <div class="mt-2 form-group" v-if="model.typeQuestion === typeQuestionEnums.QUESTION_OPEN">
              <textarea rows="5" class="form-control" placeholder="RTA ABIERTA"
                v-model="model.answerO"></textarea>
            </div>
            <!-- INPUT RADIO -->
            <div v-if="model.typeQuestion === typeQuestionEnums.QUESTION_MULTIPLE">
              <div class="mt-2 form-check" >
                <input type="radio" class="input-check-radio">
                <label class="mx-2 form-check-label" for="exampleRadios1"> SI</label>
              </div>
              <div class="mt-2 form-check">
                <input type="radio" class="input-check-radio">
                <label class="mx-2 form-check-label" for="exampleRadios1"> NO</label>
              </div>
              <div class="mt-2 form-check">
                <input type="radio" class="input-check-radio">
                <label class="mx-2 form-check-label" for="exampleRadios1"> UN POCO</label>
              </div>
            </div>
            <!-- </INPUT RADIO -->
            <!-- NUEVA PREGUNTA -->
            <div class='mt-4' v-if="newQuestions.length > 0">
              <!-- SE CREA CUANDO PRESIONO EL boton +  -->
              <div v-for="(question, key) in newQuestions" :key="key">
                <div class="row">
                  <div class="col">
                    <input type="text" class="form-control" placeholder="TITULO PREGUNTA"
                      v-model="question.titleQuestion">
                  </div>
                  <div class="col">
                    <select name="" id="" class="form-control" v-model="question.typeQuestion">
                      <option value="x">Choose...</option>
                      <option value="QUESTION_OPEN">QUESTION_OPEN</option>
                      <option value="QUESTION_MULTIPLE">QUESTION_MULTIPLE</option>
                    </select>
                  </div>
                </div>
                <div class="mt-2 form-group" v-if="model.typeQuestion === typeQuestionEnums.QUESTION_OPEN">
                  <textarea name="" id="" rows="5" class="form-control" placeholder="RTA ABIERTA"
                    v-model="model.answerO"></textarea>
                </div>
                <!-- INPUT RADIO -->
                <div v-if="model.typeQuestion === typeQuestionEnums.QUESTION_MULTIPLE">
                  <div class="mt-2 form-check">
                    <input type="radio" class="input-check-radio">
                    <label class="mx-2 form-check-label" for="exampleRadios1"> SI</label>
                  </div>
                  <div class="mt-2 form-check">
                    <input type="radio" class="input-check-radio">
                    <label class="mx-2 form-check-label" for="exampleRadios1"> NO</label>
                  </div>
                  <div class="mt-2 form-check">
                    <input type="radio" class="input-check-radio">
                    <label class="mx-2 form-check-label" for="exampleRadios1"> UN POCO</label>
                  </div>
                </div>
                <!-- </INPUT RADIO -->
              </div>
            </div>
            <!-- </NUEVA PREGUNTA -->

            <button type="submit" class="mt-2 btn btn-outline-secondary">Guardar</button>
          </form>
        </div>
        <div class="col-md-2">
          <!-- BOTON CREAR NUEVA DATA -->
          <!-- <button class="btn btn-outline-secondary" @click="saveNewQuestion()">+</button> -->
          <button class="btn btn-outline-secondary" @click="saveNewQuestion()">
            <i class="fa-sharp fa-solid fa-plus fa-lg" style="color: #8c929b;"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {

  },
  created(){
    this.typeQuestionEnums.QUESTION_MULTIPLE = 'QUESTION_MULTIPLE';
    this.typeQuestionEnums.QUESTION_OPEN = 'QUESTION_OPEN';
  }, 
  data() {
    return {
      typeQuestionEnums: {
        // QUESTION_MULTIPLE: 'QUESTION_MULTIPLE',
        // QUESTION_OPEN: 'QUESTION_OPEN'
        QUESTION_MULTIPLE: null,
        QUESTION_OPEN: null 
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
            // typeQuestion: [],
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
        answerO: ''
      }
    }
  },
  methods: {
    saveNewQuestion() {
      this.newQuestions.push(this.model)
      this.model = {
        answerM: {
          option: [],
          answer: ''
        },
        titleQuestion: [],
        // typeQuestion: [],
        answerO: ''
      }
    },
    async getSurveys() {
      this.axios.get('/surveys')
        .then((res) => {
          console.log(res.data);
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
        this.surveys.push(surveys.data);
        console.log('DATA SAVED')
        console.log(surveys);
      } catch (error) {
        console.log(error.response.data.errors[0].msg);
      }

    }
  }

}
</script>
