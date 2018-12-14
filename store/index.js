import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({

    state: {
      windowSize: {
        x: 0,
        y: 0
      },
      currentUser:{
        _id : null,
        loginMethod : null,
        ext_userId : null,
        ext_displayName : null,
        ext_pictureUrl : null,
        ext_statusMessege : null,
        latitude : null,
        longitude : null,
        gender : null,
        age : null,
        search_gender : null,
        search_distance_max : null,
        search_age_max : null,
        search_age_min : null
      },
      otherUserProfile:[],
      requestedList:[],
      myFriendList :[],
      SwipeIdx : 1

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