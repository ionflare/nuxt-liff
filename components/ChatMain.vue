<template>
  
        <v-tabs
          centered
          color="blue"
          dark
          icons-and-text>
          <v-tabs-slider color="yellow"></v-tabs-slider>
      
          <v-tab>
            Request
            <v-icon>account_box</v-icon>
          </v-tab>
      
          <v-tab>
            Chatbox
            <v-icon>settings</v-icon>
          </v-tab>
      
         
          
          <v-tab-item  >
            <ChatRequest/>
          </v-tab-item>

          <v-tab-item >
            <ChatRoom/>
          </v-tab-item>
         

        </v-tabs>

      
     
</template>
<script>
import ChatRoom from '~/components/ChatRoom.vue';
import ChatRequest from '~/components/ChatRequest.vue';
export default {
  components:{
      ChatRequest, ChatRoom
  },

}
</script>