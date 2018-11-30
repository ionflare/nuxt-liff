<template>
  <v-app id="inspire">
    <v-container>  
      <v-layout row>
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
            Setting
            <v-icon>settings</v-icon>
          </v-tab>
      
          <v-tab href="#tab-3" @click="setTab(3)" >
            Test Swipe
            <v-icon>favorite</v-icon>
          </v-tab>

           <v-tab href="#tab-4" @click="setTab(4)" >
            Friends
            <v-icon>location_on</v-icon>
          </v-tab>
          
          <v-tab-item  id="tab-1"
            key="1">
          
              <Profile   v-if="currentTab==1"/>
         
          
          </v-tab-item>

          <v-tab-item  id="tab-2"
            key="2">
            
              <Settings />
                
          </v-tab-item>


            <v-tab-item  id="tab-3"
            key="3">
              <SwipeUser />
          </v-tab-item>

            <v-tab-item  id="tab-4"
            key="4">
             <Mailbox />
          </v-tab-item>

      </v-tabs>

      </v-layout>
      

    </v-container>
  </v-app>
</template>

<script>
import Profile from '~/components/Profile.vue';
import SwipeUser from '~/components/SwipeUser.vue';
import Settings from '~/components/Settings.vue';
import Mailbox from '~/components/Mailbox.vue';
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
  
  data: () => ({
    t_var : '',
    bottomNav: 'profile',
    currentTab : 1
  }),
  


 /*
  data: {
    t_var : 'kuy',
    bottomNav: 'profile'
  },
  */
   components:{
      Profile, SwipeUser, Settings, Mailbox
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
      }
    },

 
  
}
</script>
