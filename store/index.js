import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      current_user : null,
      user_latitude : null,
      user_longitude : null,
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