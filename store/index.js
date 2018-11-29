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
      },
      kea : "sssss"
     

    },
    mutations: {
      init_user (state,payload) {
        //state.current_user = payload;
        //state.currentUser = payload;
        state.kea = payload;

      }
    },
     actions:{
        nuxtServerInit(vuexContext,context){
        }
     }
  })
}

export default createStore