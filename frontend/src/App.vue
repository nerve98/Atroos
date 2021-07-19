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
          <div v-if="!carrello">
            <li><router-link to="/carrello"><NavLink v-on:click="getJsonData('/carrello/options/')">{{option}}</NavLink></router-link></li>
          </div>
          <div v-else>
            <li><router-link to="/negozio"><NavLink v-on:click="getJsonData('/negozio/options/')">{{option}}</NavLink></router-link></li>
          </div>
        </ul>
      </div>
    </div>
  </div>

  <h3>{{title}}</h3>


</nav>
<router-view/>

</template>

<script>

import JsonStore from './components/JsonStore.js'
export default {
  name: 'App',
  data(){
    return {
      user:{
        userId: "5e4fde5d21146d12587ffd98",
        username: "gian98",
        nome: "Gianluca",
        cognome: "Canova"
      },
    }
  },
  methods:{
    iniziali: function(){
      return this.user.nome.charAt(0)+this.user.cognome.charAt(0)
    },
    /*getData: function() {
    //do something with users
    this.title=JsonStore.state.options.title
    this.option=JsonStore.state.options.option
    this.carrello=JsonStore.state.options.carrello
  },*/
  getJsonData: function(path){
    JsonStore.dispatch('optionsAction',path)
  }
},
created() {
  this.getJsonData('/negozio/options/')
},
computed: {
  title(){
    return JsonStore.getters.title;
  },
  option(){
    return JsonStore.getters.option;
  },
  carrello(){
    console.log(JsonStore.getters.carrello)
    return JsonStore.getters.carrello;
  }
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
