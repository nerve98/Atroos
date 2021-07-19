<template>
  <ul id="prodotti">
    <li v-for="(article, index) in articles" :key="index">
      <div class="card" style="width: 18rem;">
        <img v-bind:src="article.url" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">{{article.prodotto}}</h5>
          <p class="card-text">{{article.descrizione}}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>

import JsonStore from './JsonStore.js'
export default {
  name: 'Negozio',

  computed: {
    articles(){
      return JsonStore.getters.articles;
    }
  },
  created(){
    JsonStore.dispatch('articlesAction')
  }
}
</script>
