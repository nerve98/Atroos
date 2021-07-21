
import {createStore} from 'vuex'
import axios from 'axios'
/*const internalInstance = getCurrentInstance()
const axios =internalInstance.appContext.config.globalProperties.axios;
*/
const JsonStore = createStore({

  state () {
    return {
      user:{},
      options: {
        title: '',
        option: '',
        carrello: false
      },
      articles:[],
      orders:[]
    }
  },
  getters: {
    user: state => {
      return state.user
    },
    title: state => {
      return state.options.title
    },
    option: state => {
      return state.options.option
    },
    carrello: state => {
      return state.options.carrello
    },
    article: state=> (id) =>{
      return state.articles[id]
    },
    articles: state=>{
      return state.articles
    },
    orders: state=>{
      return state.orders
    },
    ordersLength: state=>{
      return state.orders.length
    }
  },
  mutations: {
    optionsMutation(state, obj) {
      state.options.title = obj.title,
      state.options.option = obj.option,
      state.options.carrello = obj.carrello
    },
    articlesMutation(state, obj){
      state.articles=obj
    },
    ordersMutation(state, obj){
      state.orders=obj
      console.log("ordersMutation: "+state.orders)
    },
    userMutation(state, obj){
      state.user=obj
      console.log("userMutation: "+state.user)
    },
  },
  actions: {
    userAction({commit}, u) {

        commit("userMutation", u);

    },
    optionsAction({commit},path) {


      console.log(path)
      axios.get(path)
      .then(function (response) {
        let json=JSON.parse(response.data)
        console.log(json)
        commit("optionsMutation", json);

      })
      .catch(function (error) {
        // handle error
        console.error(error);

      })
    },
    articlesAction({commit}) {
      const path='/negozio/articles/'
      axios.get(path)
      .then(function (response) {
        let json=JSON.parse(response.data)
        console.log(json)
        commit("articlesMutation", json);

      })
      .catch(function (error) {
        // handle error
        console.error(error);

      })
    },
    async ordersAction({commit}) {


      const path='/negozio/carrello/'+this.state.user.user_id
      try {
        const resp=await axios.get(path)

        let json=JSON.parse(resp.data)
        console.log(json)
        commit("ordersMutation", json);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }

    }
  }
})


export default JsonStore
