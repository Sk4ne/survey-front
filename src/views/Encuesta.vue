<template>
  <div class="encuesta">
    <div class="container">
      <div class="row">
        <div class="mt-4 col-md-12">
          <h1 class="text-center">Titulo ENcuesta</h1>
          <div class="mt-2 card" v-for="(survey,key) of allSurveys" :key="key">
            <div class=" card-body">
               <h2 class="text-center">{{ survey.titleSurvey }}</h2>
               <p>{{ survey.description }}</p>
               <div>
                <ul>
                  <li v-for="(question,key) of survey.question" :key="key">{{ question.titleQuestion }}</li>
                </ul>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Encuesta',
    data(){
      return {
        allSurveys : []
      }
    },
    created(){
      this.getSurveys()
    },  
    methods:{
      async getSurveys(){
         const survey = await this.axios.get('/surveys');
         this.allSurveys = survey.data;
         console.log(survey.data); 
      }
    }
  }
</script>