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
                                <!--
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
                                -->
                                 <div id="profileinfo">
                                    <h2>Profile</h2>
                                    <div id="profilepicturediv">
                                    </div>
                                    <table border="1">
                                        <tr>
                                            <th>userId</th>
                                            <td id="useridprofilefield"></td>
                                        </tr>
                                        <tr>
                                            <th>displayName</th>
                                            <td id="displaynamefield"></td>
                                        </tr>
                                        <tr>
                                            <th>statusMessage</th>
                                            <td id="displaynamefield"></td>
                                        </tr>
                                    </table>
                                </div>

                                <div id="liffdata">
                                    <h2>LIFF Data</h2>
                                    <table border="1">
                                        <tr>
                                            <th>language</th>
                                            <td id="languagefield"></td>
                                        </tr>
                                        <tr>
                                            <th>context.viewType</th>
                                            <td id="viewtypefield"></td>
                                        </tr>
                                        <tr>
                                            <th>context.userId</th>
                                            <td id="useridfield"></td>
                                        </tr>
                                        <tr>
                                            <th>context.utouId</th>
                                            <td id="utouidfield"></td>
                                        </tr>
                                        <tr>
                                            <th>context.roomId</th>
                                            <td id="roomidfield"></td>
                                        </tr>
                                        <tr>
                                            <th>context.groupId</th>
                                            <td id="groupidfield"></td>
                                        </tr>
                                    </table>
                                </div>

                                
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
