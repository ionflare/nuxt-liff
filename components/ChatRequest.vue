<template>

  <div v-if="genReqList.length != 0">
      <v-layout 
          row  
           style="max-height: 400px"
        class="scroll-y">
   
      <v-flex xs12 sm12 >
        <v-card>
          
         
      <v-list two-line>
            <template v-for="(item, index) in genReqList" 
               >
              <v-list-tile  
                avatar  :key="index"
              >
                <v-list-tile-avatar>
                  <img :src="item.ext_pictureUrl">
                </v-list-tile-avatar>
  
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.ext_displayName"></v-list-tile-title>
                </v-list-tile-content>
                 <v-btn color="green" 
                 fab small dark
                 @click="acceptReq(item)">
                    <v-icon>check</v-icon>
                </v-btn>
                <v-btn color="red" 
                fab small dark
                @click="rejectReq(item)">
                    <v-icon>close</v-icon>
                </v-btn>
                 
              </v-list-tile>
              <v-divider  :key="index" :divider="true" :inset="true"></v-divider>
            </template>
          </v-list>
          
        </v-card>
      </v-flex>
    </v-layout>
  </div>
  <div v-else> You have no friends' request.
    </div>
</template>
<script>
export default
{
  data(){
    return {
  
    }
  },
  computed :{
    
    genReqList : function(){
      
       let currentUserId = this.$store.state.currentUser._id;
       return _.filter(this.$store.state.requestedList, function(x){
         return x._id != currentUserId;
       });
    
    }
  },
  methods:{
      async acceptReq(otherUser){
           
            let data = await this.$axios.$post('/api/creFriend',{
                reqFromId : this.$store.state.currentUser._id,
                reqToId : otherUser._id,
                isInterested : true
            });
            if(data.result == "successed")
            {   
                this.$store.state.requestedList = _.filter(this.$store.state.requestedList, function(x){
                return x._id != otherUser._id;});
                this.$store.state.myFriendList.push(otherUser);
            }
            else{
                alert("Error occured while getting other user profile");  
            }
      },
      async rejectReq(otherUser){
            let data = await this.$axios.$post('/api/makeFriendReq',{
                reqFromId : this.$store.state.currentUser._id,
                reqToId : otherUser._id,
                isInterested : false
            });
            if(data.result == "successed")
            {   
                this.$store.state.requestedList = _.filter(this.$store.state.requestedList, function(x){
                return x._id != otherUser._id;});
                
            }
            else{
                alert("Error occured while getting other user profile");  
            }
      },
      
  }
}
</script>