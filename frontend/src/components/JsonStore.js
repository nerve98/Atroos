
import {createStore} from 'vuex'
import axios from 'axios'
/*const internalInstance = getCurrentInstance()
const axios =internalInstance.appContext.config.globalProperties.axios;
*/
const JsonStore = createStore({
  state () {
    return {
      options: {
        title: '',
        option: '',
        carrello: false
      },
      articles:[]
    }
  },
  getters: {
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
    }
  },
  mutations: {
    optionsMutation(state, obj) {
      state.options.title = obj.title,
      state.options.option = obj.option,
      state.options.carrello = obj.carrello
    },
    articlesMutation(state, obj){
      state.articles=obj.articles
    }
  },
  actions: {
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
    }
  }
})


export default JsonStore
