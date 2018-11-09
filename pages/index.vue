<template>
    <div>
        <v-card height="700px" flat>
            <div class="headline text-xs-center pa-5">
                Active: {{ bottomNav }}
                <div v-if="bottomNav== 'recent' ">
                  <v-container><v-layer>
                         <Profile v-bind="getProp" />
                     </v-layer></v-container>
                </div>
                <div v-if="bottomNav== 'favorites' ">
                    2222
                </div>
                <div v-if="bottomNav== 'nearby' ">
                      <v-container><v-layer>
                         <SwipeUser v-bind="getProp" />
                     </v-layer></v-container>
                </div>



            </div>
            <v-bottom-nav
                :active.sync="bottomNav"
                :value="true"
                absolute
                color="transparent"
            >
                <v-btn
                color="teal"
                flat
                value="recent"
                >
                <span>Recent</span>
                <v-icon>history</v-icon>
                </v-btn>
        
                <v-btn
                color="teal"
                flat
                value="favorites"
                >
                <span>Favorites</span>
                <v-icon>favorite</v-icon>
                </v-btn>
        
                <v-btn
                color="teal"
                flat
                value="nearby"
                >
                <span>Nearby</span>
                <v-icon>place</v-icon>
                </v-btn>
            </v-bottom-nav>
        </v-card>
    </div>
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
    bottomNav: 'recent'
  }),
   components:{
        Profile,SwipeUser
  },
      computed:{
        getProp(){
           
            return {
               e1: 0
                
            }
        }
    },
}
</script>
