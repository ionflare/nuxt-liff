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
                  <!--<v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>-->
                </v-list-tile-content>
                 <v-btn color="green" 
                 fab small dark
                 @click="acceptReq(item.ext_displayName)">
                    <v-icon>check</v-icon>
                </v-btn>
                <v-btn color="red" 
                fab small dark
                @click="rejectReq(item.ext_displayName)">
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
       let friendReqList = [];
       return _.filter(this.$store.state.requestedList, function(x){
         return x._id != currentUserId;
       });
       
      //return this.$store.state.requestedList;
      //return _.orderBy(this.$store.state.requestedList, function(o) { return new moment(o.date).format('YYYYMMDD'); }, ['desc']);
      //return _.orderBy(this.$store.state.requestedList, ['reqDate']); 
    }
  },
  methods:{
      acceptReq: (otherUserID)=> {
           alert("Accept Friend Req from "+ otherUserID);
      },
      rejectReq: (otherUserID)=> {
           alert("Reject Friend Req from "+ otherUserID);
      },
      
  }
}
</script>