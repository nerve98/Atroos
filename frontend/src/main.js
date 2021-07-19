import { createApp} from 'vue'
import JsonStore from './components/JsonStore.js'
//import axios from 'axios'
//import VueAxios from 'vue-axios'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import router from './router'
/*const app = createApp(App)
app.use(JsonStore)
app.use(VueAxios, axios)
app.mount('#app')*/

const myApp = createApp(App).use(router)
myApp.use(JsonStore)

// add more functionality to myV3App

// now we're ready to mount
myApp.mount('#app')
