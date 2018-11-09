<template>
    <div>
        <v-card height="700px" flat>
            <div class="headline text-xs-center pa-5">
                Active: {{ bottomNav }}
                <div v-if="bottomNav== 'profile' ">

                    <v-container>
                        <v-layer>
                            <v-flex sm6 md6>
                                <v-btn id='getprofilebutton' onclick="getprofile()">Show Profile Info</v-btn>
                            </v-flex>
                        </v-layer>
                        <v-layer>
                            <v-flex sm6 md6>
                                <v-img id='profilepicturediv' width=100 height=100></v-img>
                            </v-flex>
                        </v-layer>
                        <v-layer>
                            <v-flex sm6 md6>
                                 <div id="useridfield"></div>
                            </v-flex>
                        </v-layer>
                        <v-layer>
                            <v-flex sm6 md6>
                                 <div id="displaynamefield"></div>
                            </v-flex>
                        </v-layer>
                        
                    </v-container>
                     



                </div>
                <div v-if="bottomNav== 'favorites' ">
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
                </div>
                <div v-if="bottomNav== 'nearby' ">
                    Choose Your Soul Mate
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
                value="profile"
                >
                <span>Profile</span>
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
//import Profile from '~/components/Profile.vue';
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
        SwipeUser
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
