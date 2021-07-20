<template>
  <div class="container">
    <div class="row justify-content-md-center">

      <div class="col col-4">

        <img v-bind:src="article.url" class="card-img-top" />

        <h5>{{article.prodotto}}</h5>
        <p>{{article.descrizione}}</p>
        <h6>{{article.prezzo}}</h6>
      </div>
    </div>
  </div>

</template>

<script>

import JsonStore from './JsonStore.js'

export default {
  name: 'Negozio',

  computed: {
    article(){
      return JsonStore.getters.article(this.$route.params.id );
    }
  }

}
</script>
