<template>

  <div>
displayName:
{{getDisplayName}}
<br>
userId:
{{getID}}
<br>
PictureURL:
{{GetPictureURL}}
<br>
statusMessage:
{{GetstatusMessage}}
<br>
language:
{{Getlanguage}}

    <v-btn @click="alertProfile()" label="test" />    
        
      <div class="buttongroup">
        <div class="buttonrow">
            <v-btn id="openwindowbutton">Open Window</v-btn>
            <v-btn id="closewindowbutton">Close Window</v-btn>
        </div>
        <div class="buttonrow">
            <v-btn id="getprofilebutton">Get Profile</v-btn>
            <v-btn id="sendmessagebutton">Send Message</v-btn>
        </div>
        </div>
        
    

    <div id="profileinfo">
      
        {{$store.current_user}} 
        <h2>Profile</h2>
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

</template>

<script>
export default {
   
    data: {
     waw: 'xxxx'
    },

    methods :{
        getExternalVar(){
            if(typeof LiffVar !== 'undefined')
            {
                return LiffVar;
                
            }
        },
         alertProfile(){
            alert(document.getElementById('displaynamefield').textContent);
        },
       
            
    },
    computed: {
        
         getID: function(){
             
            //var element =  document.getElementById('displaynamefield');
            /*
            if (typeof userId !== 'undefined' && userId != null)
            {
                return userId.textContent;
            }
            */
            
            if (typeof userId !== 'undefined' && userId != null)
            {
                //this.waw = document.getElementById('useridfield').textContent;
                return  this.waw;
            }
        },
        
        getDisplayName: function(){
            if(typeof displayName !== 'undefined')
            { return displayName; }
            
        },
        GetPictureURL: function(){
            if(typeof pictureUrl !== 'undefined')
            { return pictureUrl; }
        },
        GetstatusMessage: function(){
            if(typeof statusMessage !== 'undefined')
            { return statusMessage; }
        },
        Getlanguage: function(){
            if(typeof language !== 'undefined')
            { return language; }
        }
        
    }
    

    
    
    
}
</script>