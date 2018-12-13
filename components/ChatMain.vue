<template>
  
        <v-tabs
          centered
          color="blue"
          dark
          icons-and-text>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab>
            List
            <v-icon>list</v-icon>
          </v-tab>
      
      
          <v-tab>
            Request
            <v-icon>notification_important</v-icon>
          </v-tab>
      
          
          <v-tab-item >
            <ChatRoom/>
          </v-tab-item>
         
          
          <v-tab-item  >
            <ChatRequest/>
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