<template>
  <v-app id="inspire">
    <v-container>  
      <v-layout row justify-center>
        <v-tabs
          centered
          color="cyan"
          dark
          icons-and-text>
          <v-tabs-slider color="yellow"></v-tabs-slider>
      
          <v-tab href="#tab-1" @click="setTab(1)">
            Profile
            <v-icon>account_box</v-icon>
          </v-tab>
      
          <v-tab href="#tab-2" @click="setTab(2)">
            Settings
            <v-icon>settings</v-icon>
          </v-tab>
      
          <v-tab href="#tab-3" @click="setTab(3)" >
            Swipe
            <v-icon>favorite</v-icon> 
          </v-tab>

           <v-tab href="#tab-4" @click="setTab(4)" >
            Friends
            <v-icon>supervisor_account</v-icon>
          </v-tab>
          
          <v-tab-item  id="tab-1"
            key="1">
              <Profile   v-if="currentTab==1"/>
          </v-tab-item>

          <v-tab-item  id="tab-2"
            key="2">
            
              <Settings v-if="currentTab==2"/>
                
          </v-tab-item>
            <v-tab-item  id="tab-3"
            key="3">
              <SwipeUser v-if="currentTab==3"/>
          </v-tab-item>

            <v-tab-item  id="tab-4"
            key="4">
             <ChatMain v-if="currentTab==4"/>
          </v-tab-item>

      </v-tabs>
      
      </v-layout>
      
      {{message2}}
    </v-container>
  </v-app>
</template>

<script>
import _ from 'lodash';
import Profile from '~/components/Profile.vue';
import SwipeUser from '~/components/SwipeUser.vue';
import Settings from '~/components/Settings.vue';
import ChatMain from '~/components/ChatMain.vue';
export default {
  head: {
    script: [
      //{  src: '/external.js'},
      //{  src: '/external2.js'},
      //{  src: 'https://d.line-scdn.net/liff/1.0/sdk.js'},
      //{  src: '/liff-starter.js'},
      //{  src: '/geoip.js'},
    ]
  },
  /*
  data: () => ({
    
    bottomNav: 'profile',
    currentTab : 1,
    otherUserProfile : ['']
  }),
  */
  data () {
    return {
       timer: 25,
        message2: "",
        counter: false,
        interval: null,



      bottomNav: 'profile',
      currentTab : 1,
      //otherUserProfile : ['']
      windowSize: {
        x: 0,
        y: 0
      }
    }
  },
   components:{
      Profile, SwipeUser, Settings, ChatMain
  },
  mounted () {
    this.onResize()
  },
  computed:{
        getProp(){
           
            return {
               e1: 1
                
            }
        },
        updateVar (){
           return this.$store.state.currentUser.longitude
        },
    },
    methods : {
      setTab(inputTab){
        this.currentTab = inputTab;
      },
      onResize () {
      this.$store.state.windowSize = { x: window.innerWidth, y: window.innerHeight }
      },
      startTimer() {
            this.interval = setInterval(this.countDown, 1000);
        },
        countDown() {
          var n = this.timer
            if (!this.counter) {
                this.counter = true;
            } else if (n > 0) {
                n = n - 1
                this.timer = n
                this.message2 = "You have " + n + "seconds until refresh page."
            } else {
                clearInterval(this.interval);
                this.counter = false;
                this.message2 = "Your time is up!";
                this.timer =  25;
                location.href ="../";
            }
        },
    },
   async asyncData(context){
      let currentUserId = context.store.state.currentUser._id;
      let allUserProf = await context.app.$axios.$post('/api/getRequestedListById',{ currentUserId : currentUserId});
      context.store.state.otherUserProfile = allUserProf.info.availableUser;
      context.store.state.requestedList = allUserProf.info.friendReq;
      context.store.state.myFriendList = allUserProf.info.friendList;

  },
     
}
</script>
