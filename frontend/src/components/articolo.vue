<template>
  <div class="container">
    <div class="justify-content-md-center">

      <div class="row">
        <div class="col-6 offset-3">
          <img v-bind:src="article.url" class="mx-auto d-block img-circle"/>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h5 class="panel-title">{{article.name}}</h5>
            </div>
            <div class="panel-body">
              <p>{{article.description}}</p>
              <h6>Prezzo: {{article.price}} $</h6>
              <h6>Quantit&agrave; disponibile: {{article.available_quantity}}</h6>
              <div v-if="article.available_quantity>0">
                <div class="container">
                  <div class="row" style="display: flex;
                  justify-content: center;
                  align-items: center;">

                  <button class="btn col col-2 btn-primary" v-on:click="added_carrello=added_carrello+1" :disabled="added_carrello==article.available_quantity">+</button>
                  <h6 class="col col-8" style="justify-content: center;
                  align-items: center;" >Aggiunti: {{added_carrello}}</h6>
                  <button class="btn btn-danger col col-2" :disabled="added_carrello<1" v-on:click="added_carrello=added_carrello-1">-</button>

                </div>
              </div>
              <br/>
              <br/>
              <button class="btn btn-success" style="width:100%" v-on:click="pushJsonData()">
                <div v-if="added_carrello>0">Aggiungi e vai al carrello</div>
                <div v-else>Vai al carrello</div></button>
              </div>
              <div v-else>
                <p>Prodotto esaurito</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import JsonStore from './JsonStore.js'
import axios from 'axios'
import router from '../router'

export default {
  name: 'Negozio',
  data: ()=>{
    return {
      added_carrello: 0
    }
  },
  props:{
    setCarrello: Function
  },
  methods:{
    pushJsonData(){
      if(this.added_carrello>0){
        let path="/ordersTest"
        axios.post(path, {
          user_id:JsonStore.getters.user.user_id,name:this.article.name,quantity:this.added_carrello, price: this.article.price},
          {headers: {'content-type': 'application/json'}
        }).then(function (response) {
          if(response.status==200){
            router.push('/carrello')
          }
        })
        .catch(function (error) {
          console.error(error);
        });
      }
      else{
        router.push('/carrello')
      }


    }
  },
  computed: {
    article(){
      return JsonStore.getters.article(this.$route.params.id );
    }
  },
  created(){
    this.setCarrello(false);
  }
}
</script>
