import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({

    state: {
      currentUser:{
        line_userId : null,
        line_displayName : null,
        line_pictureUrl : null,
        line_statusMessege : null,
        latitude : null,
        longitude : null
      },
      kea : null
    },
    mutations: {
      init_user (state,payload) {
        //state.current_user = payload;
        //state.currentUser = payload;
        //state.kea = payload;

      },
     

    },
     actions:{
        nuxtServerInit(vuexContext,context){
          if (context.req.session.currentUser) {
            // vuexContext.commit('setLineuser', context.req.session.lineuser)
            vuexContext.state.currentUser = context.req.session.currentUser;
           
        }
        else{
            vuexContext.state.currentUser = null;
          
            console.log('---[$sotre.nextServerInit] no euser')
        }
        }
     }
  })
}

export default createStore