<template>

    <v-container fluid=true>
        <v-layer>
            <v-frame>
                <v-card height="700px" flat>
                    <div class="headline text-xs-center pa-5">
                        Active: {{ bottomNav }}
                        <div v-if="bottomNav== 'profile' ">
                            <!--
                             <v-container><v-layer>
                                <Profile v-bind="getProp" />
                            </v-layer></v-container>
                            -->
                            
                            <v-container>
                                <v-layer>
                                    <v-flex sm6 md6>
                                        <div id='profilepicturediv'></div>
                                    </v-flex>
                                </v-layer>
                                <v-layer>
                                    <v-flex sm6 md6>
                                        <v-text id="useridfield"></v-text>
                                    </v-flex>
                                </v-layer>
                                <v-layer>
                                    <v-flex sm6 md6>
                                        <v-text id="displaynamefield"></v-text>
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
            </v-frame>
        </v-layer>
    </v-container>
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
    bottomNav: 'profile',
    userid: '',
    displayname: '',
    thumbnailSrc: '',
    latitude:'',
    longitude:'',

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
