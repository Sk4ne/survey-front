<template>
  <div id="app">
    <header class="bg-dark">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="padding:10px">
          <a class="navbar-brand" href="#">Generador | Encuestas</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
    
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <router-link class="nav-link" :to="{name:'home'}">Home</router-link>
              </li>
              <li class="nav-item ">
                <router-link class="nav-link" :to="{name:'encuesta'}">Surveys</router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<style scoped>
  .router-link-exact-active:focus {
    color: #42b983;
    border-bottom: 4px solid #42b983;
  }
  .nav-link{
    font-size: 20px;
  }
  span{
    color:white; 
  }
</style>