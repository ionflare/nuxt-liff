import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      current_user : "testUser",
    },
    mutations: {
      init_user (state,payload) {
        state.current_user = payload;
      }
    },
     actions:{
        nuxtServerInit(vuexContext,context){
        }
     }
  })
}

export default createStore