<template>
  <v-app>
    <v-container fluid class="pa-0">
      
      <v-layout row wrap align-center>
        <v-flex xs12 sm6>
          <div class="text-xs-center">
            <div>
              GREETING / ANNOUNCEMENT 
            </div>
            <div>
              <v-btn small color="primary" dark  @click="alertProfile()">
                 GO TO DATING APP {{$store.state.current_user}}
                </v-btn>
                 <v-btn small color="primary" dark  @click="alertLocation()">
                 Location {{$store.state.user_latitude}} , {{$store.state.user_longitude}}
                </v-btn>
            </div>
          </div>
        </v-flex>
      </v-layout>
      

    </v-container>
    <div>
      <div id="profileinfo">
      
        <h2>Profile (HTML FORM)</h2>
        <div id="profilepicturediv" >
        </div>
        <table border="1">
            
            <tr>
                <th>testVar</th>
                <td id="testVar"></td>
            </tr>
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
                <td id="statusmessagefield"></td>
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
    </div>
  </v-app>
</template>

<script>

export default {
  head: {
    script: [
   
      {  src: '/liff-starter.js'},
      //{  src: '/geoip.js'},
    ]
  },
  
  data: () => ({  
  
  }),

  
  
  computed:{
    },
    methods : {
        alertProfile(){
          //alert(document.getElementById('displaynamefield').textContent);
          //this.$store.state.current_user.user_id
          this.$store.state.current_user = document.getElementById('displaynamefield').textContent;
        },
        alertLocation(){
           //alert(document.getElementById('displaynamefield').textContent);
            if (navigator.geolocation) {
              navigator.geolocation.watchPosition(this.showPosition);
              
            } 
            
        },
        showPosition(position) {
          /*
          document.getElementById("demo").textContent = "Latitude: " + position.coords.latitude + 
        ", Longitude: " + position.coords.longitude; 
        */
        this.$store.state.user_latitude = position.coords.latitude;
        this.$store.state.user_longitude = position.coords.longitude;
      }
    }
}
</script>
