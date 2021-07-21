<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="nav nav-pills" style="padding:15px">
      <div class="nav-item dropdown">
        <a class="nav-link my_btn" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"
        >{{iniziali()}}
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" >
        <ul >

          <li class="dropdown-item">{{this.user.nome+" "+this.user.cognome}}
          </li>
          <div v-if="!carrello" >
            <li><router-link to="/carrello"><NavLink>Torna al carrello</NavLink></router-link></li>
          </div>
          <div v-else>
            <li><router-link to="/negozio"><NavLink>Torna al negozio</NavLink></router-link></li>
          </div>
        </ul>
      </div>
    </div>
  </div>
  <div v-if="carrello">
    <h3>Carrello</h3>
  </div>
  <div v-else>
    <h3>Negozio</h3>
  </div>
</nav>
<router-view v-bind:setCarrello="setCarrello"/>

</template>

<script>
import JsonStore from './components/JsonStore.js'
import axios from 'axios'

export default {
  name: 'App',
  data:()=>{
    return {
      user: {},
      carrello: false,
    }
  },
  methods:{
    iniziali: function(){
      return this.user.nome.charAt(0)+this.user.cognome.charAt(0)
    },
    setCarrello: function(newCar){
      this.carrello=newCar
    },
    getJsonData: function(path){
      JsonStore.dispatch('optionsAction',path)
    },
    setUser: function(){
      JsonStore.dispatch('userAction',this.user)
    },
    callData:async function(path){
      return new Promise(resolve=>{

        axios.get(path).then((resp)=>{
          let json=JSON.parse(resp.data)
          console.log(json)
          resolve(json[0])
        }).catch( (err) =>{
          console.error(err);
        })




      })



    }


  },

  computed: {
    getUser(){
      return JsonStore.getters.user;
    },
    title(){
      return JsonStore.getters.title;
    },
    option(){
      return JsonStore.getters.option;
    },
    /*carrello(){
      console.log(JsonStore.getters.carrello)
      return JsonStore.getters.carrello;
    },*/

  },
  async created(){
    let json=await this.callData('/user/5e4fde5d21146d12587ffd98')
    this.user=json
    this.setUser()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.my_btn{
  backgroundColor:'#D6C3C9';
  color:'#FAFAFA';
  borderColor:'#D6C3C9';
  fontSize:'30px';
  height:'60px';
  width: '60px';
}
li {
  list-style-type: none;
}
</style>
