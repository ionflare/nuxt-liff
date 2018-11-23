import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {

      currentUser:{
        displayName : null,
        lineId : null,
        pictureUrl : null,
        statusMessege : null,
        latitude : null,
        longitude : null
      }
     

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