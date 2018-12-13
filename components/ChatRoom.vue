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
              >
                <v-list-tile-avatar>
                  <img :src="item.ext_pictureUrl">
                </v-list-tile-avatar>
  
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.ext_displayName"></v-list-tile-title>
                  <!--<v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>-->
                </v-list-tile-content>
                 
                 
              </v-list-tile>
              <v-divider  :key="index" :divider="true" :inset="true"></v-divider>
            </template>
          </v-list>
          
        </v-card>
      </v-flex>
     
    </v-layout>
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
  
    }
  },
  computed :{
    
    genFriendList : function(){
        /*
       let currentUserId = this.$store.state.currentUser._id;
       return _.filter(this.$store.state.requestedList, function(x){
         return x._id != currentUserId;
       });
       */
      return this.$store.state.myFriendList;
       
      //return this.$store.state.requestedList;
      //return _.orderBy(this.$store.state.requestedList, function(o) { return new moment(o.date).format('YYYYMMDD'); }, ['desc']);
      //return _.orderBy(this.$store.state.requestedList, ['reqDate']); 
    }
  },
}
</script>