<template>
  <v-app>
    <v-container fluid class="pa-0">
      
      <v-layout row wrap align-center>
        <v-flex xs12 sm6>
          <div class="text-xs-center">
            <div>
              GREETING / ANNOUNCEMENT 
              Location = {{$store.state.currentUser.latitude}} , {{$store.state.currentUser.longitude}}
              user : {{$store.state.currentUser.displayName }},
            </div>
            <div>
              <v-btn small color="primary" dark  @click="alertProfile()">
                 GO TO DATING APP 
                </v-btn>
                
            </div>
          </div>
        </v-flex>
      </v-layout>
      

    </v-container>
    <div>
      <div id="profileinfo">
        location = <div id="latitude"></div><div id="longitude"></div>
        <br>
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

    methods : {
        alertProfile(){
          //alert(document.getElementById('displaynamefield').textContent);
          //this.$store.state.current_user.user_id

          /*
           this.$store.state.currentUser.displayName = document.getElementById('displaynamefield').textContent;
           this.$store.state.currentUser.lineId = document.getElementById('useridprofilefield').textContent;
           this.$store.state.currentUser.pictureUrl = document.getElementById('profilepicturediv').src;
           this.$store.state.currentUser.statusMessege = document.getElementById('statusmessagefield').textContent;
           this.$store.state.currentUser.latitude = document.getElementById('latitude').textContent;
           this.$store.state.currentUser.longitude = document.getElementById('longitude').textContent;
            */
           this.$store.commit('init_user', '555xx');
            location.href = "./main";




          /*
          if((this.$store.state.currentUser.latitude != "") && (this.$store.state.currentUser.longitude != ""))
          {
            location.href = "./main";
            //alert("Please turn on your GPS");
          }
          else{
            alert("Please turn on your GPS");
          }
         */
        },
       
    }
}
</script>
