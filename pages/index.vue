<template>
  <v-app>
    <v-container fluid class="pa-0">
      
        <v-layout justify-center>
        <v-flex xs12 sm6>
          <div class="text-xs-center">
            
            
          
            <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">GREETING / PROMOTION / ANNOUCEMENT</h3>
            
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
          <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
            </fb:login-button>
            <div id="status"></div>
          <div id="fb-root"></div>
            
              <br>
            <v-btn  color="green" dark  @click="onWebLogin()">  Login using Line Account  </v-btn>
            <br>
            If you cannot open button above, scan Qr code below then Select Dating App (nuxt-liff).
            <br>
            <v-img src="https://www.picz.in.th/images/2018/10/11/kupKlb.png"  height="100px" width="100px"></v-img>
            <br>
            Test Zone
             <br>
            
            <v-btn  color="green" dark  @click="DummyLogin(0)">(Test) Dummy 1 Login</v-btn>
            <v-btn  color="green" dark  @click="DummyLogin(1)">(Test) Dummy 2 Login</v-btn>
            <v-btn  color="green" dark  @click="DummyLogin(2)">(Test) Dummy 3 Login</v-btn>
            <v-btn  color="green" dark  @click="DummyLogin(3)">(Test) Dummy 4 Login</v-btn>
            <br>
            <v-btn  color="red" dark  @click="ClearAllReq()">(Test) Clear All Friend Req</v-btn>
        
        
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
      {  src: '/facebookSDK.js'},
    ]
  },
  
  data: () => ({  
      
  }),
    mounted () {
        // we can implement any method here like
      
    },
    
    methods : {
        FBLogin(){
            
        },
        async ClearAllReq(){
            let data = await this.$axios.$post('/api/clearAllReq');
            alert(data.result);
        },
         async onWebLogin(context){
          //if(document.getElementById('latitude').textContent != "" && document.getElementById('longitude').textContent != ""
          //&& document.getElementById('useridprofilefield').textContent != "")
          //if(document.getElementById('latitude').textContent != "" && document.getElementById('longitude').textContent != "")
          if(document.getElementById('useridprofilefield').textContent != "")
          {
            try{

                var loginMethod = "";
                var ext_userId =  document.getElementById('useridprofilefield').textContent;
                var ext_displayName = "";
                var ext_pictureUrl = "";
                var ext_statusMessege = "";
                var alertMsg ="";
                
                if(ext_userId != "" && loginMethod != 'testMehod')
                { 
                    loginMethod = 'line'; 
                    ext_displayName = document.getElementById('displaynamefield').textContent;
                    ext_pictureUrl = document.getElementById('profilepicturediv').firstElementChild.src;
                    ext_statusMessege = document.getElementById('statusmessagefield').textContent;
                
                }
                var latitude = document.getElementById('latitude').textContent;
                var longitude = document.getElementById('longitude').textContent;
                
                if(latitude == "" || longitude == "")
                {
                    latitude = 13.908593;
                    longitude = 100.501541;
                    alertMsg += "Your Location Info did not set properly Please check your gps!!"; 
                }

                //alert(ext_pictureUrl);
                
                let data = await this.$axios.$post('/api/app_login',
                {   
                    currentUser :
                    {
                    'loginMethod' : loginMethod,    
                    'ext_userId' : ext_userId,
                    'ext_displayName' :ext_displayName,
                    'ext_pictureUrl' : ext_pictureUrl,
                    'ext_statusMessege' : ext_statusMessege,
                    'latitude' : latitude,
                    'longitude' : longitude,
                    } 
                });
                    if(data == "succesfully saved")
                    {
                
                    //this.$store.commit('set_current_user', data.data);
                    if(alertMsg != "")
                    {
                        alert("Welcome Tester");
                    }
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
                alert("ERROR : This function can be run only in line application!!")
            }
        },
        async DummyLogin(dummyAcc){
       
           try{

                var loginMethod = "";
                var ext_userId = "";
                var ext_displayName = "";
                var ext_pictureUrl = "";
                var ext_statusMessege = "";
                var alertMsg ="";
                
                var AllDummy = [
                    {
                        loginMethod : 'testMehod',
                        ext_userId : "TestUser1",
                        ext_displayName : "TestUser1",
                        ext_pictureUrl : "https://d3icht40s6fxmd.cloudfront.net/sites/default/files/test-product-test.png",
                        ext_statusMessege : "Hello Tester",
                        alertMsg : "Welcome Tester",
                    },
                    {
                        loginMethod : 'testMehod',
                        ext_userId : "TestUser2",
                        ext_displayName : "TestUser2",
                        ext_pictureUrl : "http://66.media.tumblr.com/8ade1f2d6f9ba47980ca4a82febc089a/tumblr_mezcrofyv61rfnwv0o1_400.jpg",
                        ext_statusMessege : "Hello Tester",
                        alertMsg : "Welcome Tester",
                    },
                    {
                        ext_userId : "TestUser3",
                        loginMethod : "testMehod",
                        ext_displayName : "TestUser3",
                        ext_pictureUrl : "http://66.media.tumblr.com/d0aa042ae2efc069c9d9ee5e4f49cfb4/tumblr_mezcrofyv61rfnwv0o4_500.jpg",
                        ext_statusMessege : "Hello Tester",
                        alertMsg : "Welcome Tester",
                    },
                    {
                        ext_userId : "TestUser4",
                        loginMethod : "testMehod",
                        ext_displayName : "TestUser4",
                        ext_pictureUrl : "http://25.media.tumblr.com/a3d4499d69f2863ee2e834d5c52eb4c0/tumblr_mezcrofyv61rfnwv0o2_400.jpg",
                        ext_statusMessege : "Hello Tester",
                        alertMsg : "Welcome Tester",
                    }
                ]
                var latitude = document.getElementById('latitude').textContent;
                var longitude = document.getElementById('longitude').textContent;
                
                if(latitude == "" || longitude == "")
                {
                    latitude = 13.908593;
                    longitude = 100.501541;
                    alertMsg += "Your Location Info did not set properly Please check your gps!!"; 
                }

                //alert(ext_pictureUrl);
                
                let data = await this.$axios.$post('/api/app_login',
                {   
                    currentUser :
                    {
                    'loginMethod' : AllDummy[dummyAcc].loginMethod,    
                    'ext_userId' : AllDummy[dummyAcc].ext_userId,
                    'ext_displayName' :AllDummy[dummyAcc].ext_displayName,
                    'ext_pictureUrl' : AllDummy[dummyAcc].ext_pictureUrl,
                    'ext_statusMessege' : AllDummy[dummyAcc].ext_statusMessege,
                    'latitude' : latitude,
                    'longitude' : longitude,
                    } 
                });
                    if(data == "succesfully saved")
                    {
                
                    //this.$store.commit('set_current_user', data.data);
                    if(alertMsg != "")
                    {
                        alert("Welcome Tester");
                    }
                    location.href = "./main";
                   
                    }
                    else{
                        alert(data.msg);
                    }
                    
            }catch(e){
                console.log(e);
            }
        }
    }
}
</script>
