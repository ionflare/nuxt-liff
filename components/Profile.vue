<template>

  <div>
      

        
        <!--
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
