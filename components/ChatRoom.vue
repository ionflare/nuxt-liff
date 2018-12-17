<template>
    <v-layout row>
      <v-flex xs12 sm12 >
        
          
          <v-toolbar color="cyan" dark>
           
            <v-toolbar-title>Search</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
          </v-toolbar>
          
           <div v-if="genFriendList.length != 0">
      <v-layout 
          row  
           style="max-height: 400px"
        class="scroll-y">
   
      <v-flex xs12 sm12 >
        <v-card>
          
         
      <v-list two-line>
            <template v-for="(item, index) in genFriendList" 
               >
              <v-list-tile  
                avatar  :key="index"
                @click="openChatBox(item)"
              >
                <v-list-tile-avatar>
                  <img :src="item.ext_pictureUrl">
                </v-list-tile-avatar>
  
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.ext_displayName"></v-list-tile-title>
                  <!--<v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>-->
                </v-list-tile-content>
                 
                 
              </v-list-tile>
              <v-divider></v-divider>
            </template>
          </v-list>
          
        </v-card>
      </v-flex>
     
    </v-layout>

    <!-- Dialog Region-->
    <v-layout row>
      <v-dialog v-model="dialog" persistent scrollable :max-width="calSizeChatDialog.x" :max-height="calSizeChatDialog.y">
        <!--
        <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
        -->
        <v-card>
          <v-card-title>Contact with {{contactUser.ext_displayName}}
            <v-avatar
                                      :tile="false"
                                      :size="40"
                                      color="grey lighten-4"
                                    >
                                <img :src="contactUser.ext_pictureUrl" alt="avatar">
            </v-avatar>


          </v-card-title>
          <v-divider></v-divider>
          <v-card-text :style="calSizeChatDialog.txtY" >
            <v-container grid-list-md text-xs-center>
              <div v-for="(msg, indexMsg) in dialogMsg" :key="indexMsg">
                   <v-layout v-if="msg.from_UserId == $store.state.currentUser._id"  align-end justify-end row >
                    {{convertTime(msg.lastupdate)}}
                    <v-flex md6>
                        <v-card dark color="green">
                          <v-card-text class="text-md-right">{{msg.text}}</v-card-text>
                        </v-card>
                   
                    </v-flex>
                   
                    
                  </v-layout>
         
                <v-layout v-else align-end justify-start row >
                  <v-flex md1>
                    <v-avatar
                                      :tile="false"
                                      :size="40"
                                      color="grey lighten-4"
                                    >
                                <img :src="contactUser.ext_pictureUrl" alt="avatar">
                      </v-avatar>
                    </v-flex>
                     <v-flex md6>
                        <v-card  dark color="blue">
                          <v-card-text   class="text-md-left">{{msg.text}}</v-card-text>
                        </v-card>
                   
                    </v-flex>
                    {{convertTime(msg.lastupdate) }}
                </v-layout>
            </div>
            </v-container>    
          </v-card-text>
           <v-divider></v-divider>
           <v-card-text style="height:100px" >
              <v-text-field v-model="myMsg"  label=""></v-text-field>
          </v-card-text>
          
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="sendMsg(contactUser)">Send</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
   <!-- END Dialog Region-->




  </div>
  <div v-else> No Friend? Make some request to others.
    </div>
        
      </v-flex>
    </v-layout>
</template>
<script>
export default
{
   data(){
    return {
         dialogm1: '',
         dialogMsg : '',
        dialog: false,
        contactUser :'',
        myMsg: ''
    }
  },
  computed :{
    
    calSizeChatDialog: function(){
      let dialogSize = {x: 640, y : 700, txtY :'height:500px'};
      if(this.$store.state.windowSize.x < 640 )
      { dialogSize.x = this.$store.state.windowSize.x; }
      if(this.$store.state.windowSize.y < 500 )
      { 
        dialogSize.y = this.$store.state.windowSize.y;
        dialogSize.txtY = "height:"+(this.$store.state.windowSize.y -150).toString()+"px";
      }

      return dialogSize;

    },

    genFriendList : function(){
  
      return this.$store.state.myFriendList;
    }
  },
  methods:{

    convertTime(time){
      let dmy = time.split("T")[0];
      let hms = (time.split("T")[1]).split(".")[0];
      return hms+ " / " +dmy;
    },

    async openChatBox(item){
      
      
      this.contactUser = item;
      let data = await this.$axios.$post('/api/getMeseage',{
                user_1 : this.$store.state.currentUser._id,
                user_2 : item._id,
      });
      if(data.result == "successed" )
      {
           this.dialogMsg = data.info;
      }
     

      //this.contactUser = item;
      this.dialog = true;
      //alert(item.ext_displayName);
    },
    async sendMsg(item){
      //let currentUserId =  this.$store.state.currentUser._id;
      this.contactUser = item;
      let data = await this.$axios.$post('/api/sendMessage',{
                from_UserId : this.$store.state.currentUser._id,
                to_UserId : item._id,
                type : "text",
                text : this.myMsg,
      });
      //this.dialogMsg = data.info;
      this.dialog = false;
      this.myMsg = '';
    },

  }
}
</script>