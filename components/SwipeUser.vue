<template>
    <div id="app">
        <v-app id="inspire">
             <div v-if="$store.state.currentUser.gender == null || $store.state.currentUser.age == null 
              || $store.state.currentUser.search_gender == null || $store.state.currentUser.search_distance_max == null 
              || $store.state.currentUser.search_age_max == null || $store.state.currentUser.search_age_min == null ">
                 Please fill your profile information and config setting in order to use this feature. 
            </div>
            <div v-else>
            <div v-if="FilterFromSetting.length == 0">
                No available user in this area. Why not try to change Setting.
                </div>   
            <div v-if="FilterFromSetting.length == 1">

                <br>
                <center>
                    Found 1 Result
                    <v-img width=200 height=200 :src="FilterFromSetting[0].ext_pictureUrl"></v-img>
                    </center>
                    <br>
                    <v-card
                                class="mb-5"
                                color="grey lighten-1"
                                height="100px"
                            >   
                            <center>
                                Index : 1
                                <br>Name : {{FilterFromSetting[0].ext_displayName}} 
                                <br>Gender : {{FilterFromSetting[0].gender}} 
                                <br>Age : {{FilterFromSetting[0].age}} 
                                <br>Distance : {{FilterFromSetting[0].dist}} KM.
                                
                            </center>
                            
                            </v-card>
                            <v-btn
                                        color="green"
                                        @click="makeFriendReqLastIdx(FilterFromSetting[0]._id, true)"
                                    >
                                    Like
                                    </v-btn>
                                      <v-btn
                                        color="blue"
                                        @click="PassUserLastIdx(index)"
                                    >
                                    Decide Later
                                    </v-btn>
                                    <v-btn 
                                        color="red"
                                        @click="makeFriendReqLastIdx(FilterFromSetting[0]._id, false)"
                                    >
                                    Nope
                            </v-btn>
                </div>   
                <div v-if="FilterFromSetting.length > 1">
                    Found {{FilterFromSetting.length}} Results 
                    <!--*****[ Step header work malfunction when use index = 0
                    ,in v-for index start at 0 so it need to be modified a little bit
                    ]*********-->
                <v-stepper v-model="$store.state.SwipeIdx">
                    <v-stepper-header v-show="false">
                        <v-stepper-step v-for="(item, index) in FilterFromSetting"  :key="item._id" :step="index+1"> {{item._id}}</v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                        <v-stepper-content v-for="(item, index)  in FilterFromSetting" :key="item._id" :step="index+1">
                            <center>
                            <v-img width=200 height=200 :src="item.ext_pictureUrl"></v-img>
                            </center>
                            <br> 
                            <v-card
                                class="mb-5"
                                color="grey lighten-1"
                                height="100px"
                            >   
                            
                            <center>
                                
                                Index : {{index+1}} 
                                <br>Name : {{item.ext_displayName}} 
                                <br>Gender : {{item.gender}} 
                                <br>Age : {{item.age}} 
                                <br>Distance : {{item.dist}} KM.
                                
                            </center>
                            </v-card>
                            <v-layout>
                                <!-- @click="e1 = index + 2"-->
                                <v-flex v-if="index + 1 < FilterFromSetting.length">
                                    <v-btn
                                        color="green"
                                        @click="makeFriendReq(item._id, index, true)"
                                    >
                                    Like
                                    </v-btn>
                                     <v-btn
                                        color="blue"
                                        @click="PassUser(index)"
                                    >
                                    Decide Later
                                    </v-btn>
                                    <v-btn
                                        color="red"
                                        @click="makeFriendReq(item._id, index, false)"
                                    >
                                    Nope
                                    </v-btn>
                                </v-flex>
                                <v-flex v-else>
                                    <v-btn
                                        color="green"
                                        @click="makeFriendReqLastIdx(item._id, true)"
                                    >
                                    Like
                                    </v-btn>
                                     <v-btn
                                        color="blue"
                                        @click="PassUserLastIdx(index)"
                                    >
                                    Decide Later
                                    </v-btn>

                                    <v-btn 
                                        color="red"
                                        @click="makeFriendReqLastIdx(item._id, false)"
                                    >
                                    Nope
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-stepper-content>
                    </v-stepper-items>
                    
                </v-stepper>
                </div>
            </div>
            
        </v-app>
    </div>
    


</template>
<script>
import _ from 'lodash';
export default {
 data(){
     return {
        e1:1,
       
        filteredOtherUser : [''],
     }
 },
  methods: {
     
        async getOtherUserProfile(){
            let currentUserId = this.$store.state.currentUser._id;
            let allUserProf = await this.$axios.$post('/api/getRequestedListById',{ currentUserId : currentUserId});
          
            if(allUserProf.result == "successed")
            {  
                 this.$store.state.otherUserProfile = [];
                 this.$store.state.otherUserProfile = allUserProf.info.availableUser;
                this.$store.state.requestedList = allUserProf.info.friendReq;
                //this.e1 =1;
                this.$store.state.SwipeIdx = 1;
            }
            else{
                alert("Error occured while getting other user profile");  }
        },
        
         getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
            var R = 6371; // Radius of the earth in km
            var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
            var dLon = this.deg2rad(lon2-lon1); 
            var a = 
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; // Distance in km

            return d.toFixed(2);
        },
        deg2rad(deg) {
            return deg * (Math.PI/180)
        },
        async makeFriendReqLastIdx(otherUserId,isInterested)
        {
            let data = await this.$axios.$post('/api/makeFriendReq',{
                reqFromId : this.$store.state.currentUser._id,
                reqToId : otherUserId,
                isInterested : isInterested
            });
            if(data.result == "successed")
            {   
                let currentUserId = this.$store.state.currentUser._id;
                let allUserProf = await this.$axios.$post('/api/getRequestedListById',{ currentUserId : currentUserId});
          
                if(allUserProf.result == "successed")
                {  
                    this.$store.state.otherUserProfile = [];
                    this.$store.state.otherUserProfile = allUserProf.info.availableUser;
                    this.$store.state.requestedList = allUserProf.info.friendReq;
                
                    this.$store.state.SwipeIdx = 1;
                }
            }
            else{
                alert("Error occured while getting other user profile");  }

        },
        async makeFriendReq(otherUserId,SweptIdx,isInterested) {

            let data = await this.$axios.$post('/api/makeFriendReq',{
                reqFromId : this.$store.state.currentUser._id,
                reqToId : otherUserId,
                isInterested : isInterested
            });
            if(data.result == "successed")
            {   
                this.$store.state.SwipeIdx = SweptIdx + 2;
            }
            else{
                alert("Error occured while getting other user profile");  }
            
        },
        PassUser(SweptIdx) {

            this.$store.state.SwipeIdx = SweptIdx + 2;
        },
        PassUserLastIdx(SweptIdx) {

            this.$store.state.SwipeIdx = 1;
        }


  },
  computed : {
      FilterFromSetting: function(){
            //Filter Gender
            let res_filterGender;
            let search_con = this.$store.state.currentUser.search_gender;
            if (this.$store.state.currentUser.search_gender == "Male" || this.$store.state.currentUser.search_gender == "Female")
            {
                 res_filterGender = _.filter(this.$store.state.otherUserProfile, 
                 //res_filterGender = _.filter(this.$store.state.res_RequestedList, 
                 function(o) { return o.gender == search_con;});
            }
            else
            { 
                res_filterGender = this.$store.state.otherUserProfile;
            }

            //Filter Age
            let res_filterAge;
            let search_con1 = this.$store.state.currentUser.search_age_max;
            let search_con2 = this.$store.state.currentUser.search_age_min;
           res_filterAge = _.filter(res_filterGender, function(o) 
            { return (o.age <= search_con1) && (o.age >= search_con2)});
        
            //Filter Distance
            let res_filterDist = [];
            let max_dist = this.$store.state.currentUser.search_distance_max;
            if(this.$store.state.currentUser.search_distance_max == 100)
            { max_dist = 99999; }  
            for(let i =0; i < res_filterAge.length; i++)
            {
               let dist = this.getDistanceFromLatLonInKm(
                this.$store.state.currentUser.latitude,this.$store.state.currentUser.longitude
                , res_filterAge[i].latitude,res_filterAge[i].longitude);
                 if(dist <= max_dist)
                {
                    let filteredUser = res_filterAge[i];
                    filteredUser.dist = dist;
                     res_filterDist.push(filteredUser);
                }
            }
            
            return res_filterDist;
        },
       
  }
}
</script>