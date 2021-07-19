
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
      }
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
    }
  },
  mutations: {
    optionsMutation(state, obj) {
      state.options.title = obj.title,
      state.options.option = obj.option,
      state.options.carrello = obj.carrello
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
    }
  }
})

export default JsonStore
