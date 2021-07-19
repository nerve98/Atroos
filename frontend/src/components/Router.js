import Negozio from './Negozio.vue'
import Carrello from './Carrello.vue'
import { createRouter, createWebHistory } from 'vue-router'

const Routes = [
  {
    path:'/',
    component: Negozio,

  },
  {
    path:'/carrello',
    component:Carrello,

  },

]

const Router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: Routes

})

const Mapper={
  '/negozio/options/':'/',
  '/carrello/options/':'/carrello'
}

export {Router, Mapper, Routes}
