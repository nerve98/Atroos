import Negozio from '../components/Negozio.vue'
import Carrello from '../components/Carrello.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path:'/negozio',
    component: Negozio,
    
  },
  {
    path:'/carrello',
    component:Carrello,

  },
  {
    path: '/',
    redirect: '/negozio'
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes

})



export default router
