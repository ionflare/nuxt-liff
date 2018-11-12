<template>
     <v-tabs
      centered
      color="cyan"
      dark
      icons-and-text
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>
  
      <v-tab href="#tab-1">
        Profile
        <v-icon>account_box</v-icon>
      </v-tab>
  
      <v-tab href="#tab-2">
        Test Location
        <v-icon>location_on</v-icon>
      </v-tab>
  
      <v-tab href="#tab-3">
        Test Swipe
        <v-icon>favorite</v-icon>
      </v-tab>
      
      <v-tab-item  id="tab-1"
        key="1">
         <v-card flat>
          <v-container><v-layer>
                <Profile />
         </v-layer></v-container>
        </v-card>
      </v-tab-item>

      <v-tab-item  id="tab-2"
        key="2">
         <v-card flat>
           <v-container>
                                <v-layer>
                                    <v-flex sm6 md6>
                                        Show Your Current Position
                                    </v-flex>
                                    <v-flex sm6 md6>
                                        <v-btn onclick="getLocation()">Try GEOIP</v-btn>
                                    </v-flex>
                                    <v-flex sm6 md6>
                                        <v-text id="demo"></v-text>
                                    </v-flex>
                                </v-layer>
                            </v-container>
        </v-card>
      </v-tab-item>


        <v-tab-item  id="tab-3"
        key="3">
         <v-card flat>
            Choose Your Soul Mate
                <v-container><v-layer>
                    <SwipeUser v-bind="getProp" />
                </v-layer></v-container>
        </v-card>
      </v-tab-item>






    </v-tabs>



</template>

<script>
import Profile from '~/components/Profile.vue';
import SwipeUser from '~/components/SwipeUser.vue';

export default {
  head: {
    script: [
      //{  src: '/external.js'},
      //{  src: '/external2.js'},
      //{  src: 'https://d.line-scdn.net/liff/1.0/sdk.js'},
      {  src: '/liff-starter.js'},
      {  src: '/geoip.js'},
    ]
  },
  data: () => ({
    bottomNav: 'profile'
  }),
   components:{
        Profile,SwipeUser
  },
      computed:{
        getProp(){
           
            return {
               e1: 1
                
            }
        }
    },
}
</script>
