<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="row" v-for="(temp,index) in chunk" :key="index">
        <div v-for="(article, index) in temp" :key="index" class="col col-4">
          <div class="card" style="width: 18rem;">
            <img v-bind:src="article.url" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">{{article.prodotto}}</h5>
              <p class="card-text">{{article.descrizione}}</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import JsonStore from './JsonStore.js'
export default {
  name: 'Negozio',

  computed: {
    articles(){
      return JsonStore.getters.articles;
    },
    chunk(){
      let array=this.articles
      let i,j, temporary, chunk = 3;
      let result=[]
      for (i = 0,j = array.length; i < j; i += chunk) {
        temporary = array.slice(i, i + chunk);
        result.push(temporary)
      }
      return result
    }
  },
  created(){
    JsonStore.dispatch('articlesAction')
  }
}
</script>
