<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div v-if="this.sum>0">
        <table class="table">
          <thead>
            <tr>
              <th/>
              <th scope="col">Prodotto</th>
              <th scope="col">Quantit&agrave;</th>
              <th scope="col">Prezzo</th>
              <th/>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orders" v-bind:key="index">
              <th>{{index +1}}</th>
              <td>{{item.name}}</td>
              <td>{{item.qty}}</td>
              <td>{{item.price}} $</td>
              <button class="btn bi bi-trash-fill" v-on:click="this.remove(item._id)"></button>

            </tr>
            <tr v-if="this.sum>0">
              <th><h5><b>Totale spesa:</b></h5></th>
              <th>{{this.sum}} $</th>
            </tr>

          </tbody>
        </table>
        <br/>
        <br/>
        <button class="btn btn-success" v-on:click="checkout()">Checkout</button>
      </div>
      <div v-else>
        <h3>Carrello vuoto</h3>
      </div>
    </div>
  </div>
</template>

<script>

import JsonStore from './JsonStore.js'
import axios from 'axios'
import "bootstrap-icons/font/bootstrap-icons.css";


export default {
  name: 'Carrello',
  data: function(){
    return {
      rerender: false,
      sum: 0,
      orders:[]
    }
  },
  props:{
    setCarrello: Function
  },
  watch: {
    // whenever question changes, this function will run
    rerender: function (newRender) {
      if(newRender==true){
        this.callData()
        this.rerender=false
      }
    },

  },
  computed: {
    ordersLength(){
      return JsonStore.getters.ordersLength;
    },
    getOrders(){
      return JsonStore.getters.orders;
    },
  },
  methods:{
    checkout(){
      let path="/checkout/"+JsonStore.getters.user.user_id
      axios.get(path).then(function () {
        console.log("checkout effettuato")
      })
      .catch(function (error) {
        console.error(error);
      });
      this.rerender=true
    },
    async remove(id){
      let path="/negozio/carrello/"
      await axios.delete(path, {
        data: {
          id: id,
          user_id: JsonStore.getters.user.user_id
        }
      });
      this.rerender=true
    },
    totale(array){
      this.sum=0
      array.forEach((item) => {
        this.sum+=item.price*item.qty
      });

    },
    setOrders(){
      let data=this.getOrders
      this.totale(data)
      this.orders=data
      console.log(this.orders)

    },
    callData(){
      JsonStore.dispatch('ordersAction').then(() =>
      this.setOrders()
    )



  }

},
created(){
  this.callData()
  this.setCarrello(true);
}
}
</script>
