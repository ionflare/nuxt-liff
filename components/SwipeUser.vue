<template>
    <div id="app">
        <v-app id="inspire">

             <v-btn  color="success" dark  @click="getOtherUserProfile()">Get Other User</v-btn>
            
            <v-stepper v-model="e1">
                <v-stepper-header v-show="false">
                    <v-stepper-step v-for="(item, index) in otherUserProfile" :key="item._id" :complete="e1 > index" :step="index"> {{item._id}}</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                    <v-stepper-content v-for="(item, index)  in otherUserProfile" :key="item._id" :step="index">
                        <center>
                        <v-img width=200 height=200 :src="item.line_pictureUrl"></v-img>
                        </center>
                        <br> 
                         <v-card
                            class="mb-5"
                            color="grey lighten-1"
                            height="100px"
                        >   
                        
                        <center>Name : {{item.line_displayName}} </center>
                        </v-card>
                        
                        <v-btn v-if="index < otherUserProfile.length -1"
                            color="primary"
                            @click="e1 = index + 1"
                        >
                        Next
                        </v-btn>
                         <v-btn v-else
                            color="primary"
                            @click="getOtherUserProfile()"
                        >
                        Find More
                        </v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
           
            
        </v-app>
    </div>



</template>
<script>

export default {
  //props: ['description', 'image', 'shopName', 'url', 'color', 'thumbnail']
  //prop: ['title', 'shopName', 'color']
  //props: ['e1'],

   data: () => ({
     e1:0,
    timer: 25,
    message2: "",
    counter: false,
    interval: null,
    otherUserProfile : ['']
     
  }),
  methods: {
        startTimer() {
            this.interval = setInterval(this.countDown, 1000);
        },
        countDown() {
          var n = this.timer
            if (!this.counter) {
                this.counter = true;
            } else if (n > 0) {
                n = n - 1
                this.timer = n
                this.message2 = "You have " + n + "seconds left."
            } else {
                clearInterval(this.interval);
                this.counter = false;
                this.message2 = "Your time is up!";
                this.timer =  25;
            }
        },
        async getOtherUserProfile(){
            let data = await this.$axios.$post('/api/getOtherUserInfo',{});
            if(data.result == "successed")
            { 
                this.otherUserProfile = data.info.alluser; 
                this.e1 =0;
         
            }
            else{
                alert("Error occured while getting other user profile");  }
        },

  }
    
}
</script>