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
        Setting
        <v-icon>settings</v-icon>
      </v-tab>
  
      <v-tab href="#tab-3" >
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
           <v-layout row wrap>
        <v-flex xs12 sm6 md4>
           <v-slider
            v-model="slider"
            always-dirty
            
            label= "Max Distance"
            persistent-hint
            thumb-label="always"
          ></v-slider>
          </v-flex>
    </v-layout>
    <v-layout row>
          <v-flex
            shrink
            style="width: 60px"
          >
            <v-text-field
              v-model="range[0]"
              class="mt-0"
              hide-details
              single-line
              type="number"
            ></v-text-field>
          </v-flex>
          <v-flex class="px-3">
            <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
            ></v-range-slider>
          </v-flex>
          <v-flex
            shrink
            style="width: 60px"
          >
            <v-text-field
              v-model="range[1]"
              class="mt-0"
              hide-details
              single-line
              type="number"
            ></v-text-field>
          </v-flex>
        </v-layout>
        </v-card>
      </v-tab-item>


        <v-tab-item  id="tab-3"
        key="3">
        <!--
         <v-card flat>
            Choose Your Soul Mate
                <v-container><v-layer>
                    <SwipeUser v-bind="getProp" />
                </v-layer></v-container>
        </v-card>
        -->
      </v-tab-item>






    </v-tabs>



</template>

<script>
//import Profile from '~/components/Profile.vue';
//import SwipeUser from '~/components/SwipeUser.vue';
//import Settings from '~/components/Settings.vue';
export default {
  head: {
    script: [
      //{  src: '/external.js'},
      //{  src: '/external2.js'},
      //{  src: 'https://d.line-scdn.net/liff/1.0/sdk.js'},
      {  src: '/liff-starter.js'},
      //{  src: '/geoip.js'},
    ]
  },
  
  data: () => ({
    t_var : '',
    bottomNav: 'profile',
     min: -50,
      max: 90,
      slider: 40,
      range: [-20, 70]
  }),
  


 /*
  data: {
    t_var : 'kuy',
    bottomNav: 'profile'
  },
  
   components:{
        Profile,SwipeUser,Settings
  },
  */
  computed:{
        getProp(){
           
            return {
               e1: 1
                
            }
        },
        updateVar (){
           
             return {
               t_var: 1
                
            }
        },
    },
    methods : {
       get_var(){
         //alert(document.getElementById('testVar').textContent);
           //this.t_var = document.getElementById('displaynamefield').textContent
           alert(LiffVar);
           //alert(document.getElementById('testVar').textContent);
           /*
            return {
                t_var : document.getElementById('displaynamefield').textContent
                
            }
            */
        }
    },
    asyncData(context){
   
    return { 
        t_var : 'LiffVar'
      }
  
  }
}
</script>
