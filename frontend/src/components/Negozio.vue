<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="row" v-for="(temp,index) in chunk" :key="index">
        <div v-for="(article, index2) in temp" :key="index2" class="col col-4">
          <div class="thumbnail" style="width: 18rem;">
            <img v-bind:src="article.url" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">{{article.name}}</h5>
              <p class="card-text">{{article.description}}</p>
              <router-link v-bind:to="/negozio/+parseInt(index*3+index2)"><NavLink class="btn btn-primary">Seleziona</NavLink></router-link>
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
  props:{
    setCarrello: Function
  },
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
    this.setCarrello(false);
  }
}
</script>
