<template>
  <v-app>
    <v-container fluid class="pa-0">
      
        <v-layout justify-center>
        <v-flex xs12 sm6>
          <div class="text-xs-center">
            
            
          
            <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">GREETING / PROMOTION / ANNOUCMENT</h3>
            
            </div>
          </v-card-title>
            <v-card>
                <v-img
                     src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"

                      height="300px"
                ></v-img>
            </v-card>
            
            <v-card-title primary-title>
           
                <div>bla bla bla <br>Some advertisment here</div>
           
          </v-card-title>
            <v-btn  color="primary" dark  @click="onWebLogin()">GO TO DATING APP</v-btn>
        
        
        
          </div>
        </v-flex>
         
      </v-layout>
      

    </v-container>
    <div style="display: none;">
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
           //this.$store.commit('init_user', '555xx');
           //location.href = "./main";




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
         async onWebLogin(context){
          //if(document.getElementById('latitude').textContent != "" && document.getElementById('longitude').textContent != ""
          //&& document.getElementById('useridprofilefield').textContent != "")
          //if(document.getElementById('latitude').textContent != "" && document.getElementById('longitude').textContent != "")
          if(1)
          {
            try{
            var pictureUrl = ""; 
            if(document.getElementById('profilepicturediv').childElementCount > 0)
            { pictureUrl = document.getElementById('profilepicturediv').firstElementChild.src; }
            else{
                 pictureUrl = "https://d3icht40s6fxmd.cloudfront.net/sites/default/files/test-product-test.png";
            }

            let data = await this.$axios.$post('/api/app_login',
            {
                currentUser :
                {
                'line_userId' : document.getElementById('useridprofilefield').textContent,
                'line_displayName' : document.getElementById('displaynamefield').textContent,
                'line_pictureUrl' : pictureUrl,
                'line_statusMessege' : document.getElementById('statusmessagefield').textContent,
                'latitude' : document.getElementById('latitude').textContent,
                'longitude' : document.getElementById('longitude').textContent,
                } 
                
               /*  
               {
                'line_userId' : 'testline',
                'line_displayName' : 'testName',
                'line_pictureUrl' : 'testSrc',
                'line_statusMessege' :'testMSG',
                'latitude' :  document.getElementById('latitude').textContent,
                'longitude' :  document.getElementById('longitude').textContent,
                }
                */
            });
                if(data == "succesfully saved")
                {
             
                //this.$store.commit('set_current_user', data.data);
                
                location.href = "./main";
                //var userinfo = jwt.sign(payload, this.privateKeyJWT, { expiresIn:  2*60*60, });
                 
                }
                else{
                    alert(data.msg);
                }
            }catch(e){
                console.log(e);
            }
        
            }
            else{
                alert("ERROR : Please check your GPS or line account!!")
            }
        }

         
       
    }
}
</script>
