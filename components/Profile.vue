<template>


  <div>
     <v-card>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout row wrap>    

       <v-flex xs12>
              <v-card color="cyan darken-2" class="white--text">
                <v-layout>
                  <v-flex xs5>
                    <v-img
                      :src="$store.state.currentUser.line_pictureUrl"
                      height="125px"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">{{$store.state.currentUser.line_displayName}}</div>
                        <div>statusMessage</div>
                        <div>{{$store.state.currentUser.line_statusMessege}}</div>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-actions class="pa-3">
                  Gender
                  <v-spacer></v-spacer>
                   <v-select 
                      :items="gender_items"
                      label=""
                      v-model="selected_gender"
                      
                    ></v-select>
                </v-card-actions>
                <v-divider light></v-divider>
                <v-card-actions class="pa-3">
                  Age
                  <v-spacer></v-spacer>
                   <v-select
                      :items="age_items"
                      label=""
                      v-model="selected_age"
                    ></v-select>
                </v-card-actions>
                <v-divider light></v-divider>
                <v-card-actions class="pa-3">
                  <v-btn  color="success" dark  @click="saveProfile()">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>      
      <br>      

userId:
{{$store.state.currentUser.line_userId}}
<br>
latitude:
{{$store.state.currentUser.latitude}}
<br>
longitude:
{{$store.state.currentUser.longitude}}
age :
{{$store.state.currentUser.age}}


<br>      
  </div>

</template>

<script>
import _ from 'lodash';
export default {

   data() {
    return {
      gender_items: ['Male', 'Female'],
        age_items : _.range( 15, 99, 1),
        selected_gender:  this.$store.state.currentUser.gender, 
        selected_age: this.$store.state.currentUser.age, 
    };
  },
  computed: {
    getAge: function(){
        return this.$store.state.currentUser.age;
    },
   
  },
  methods: { 

     resetComponent()
     {
        this.selected_age = 66;
     },
     
     async saveProfile(){
      let data = await this.$axios.$post('/api/update_profile',
            {
                currentUser :
                {
                  'line_userId' : this.$store.state.currentUser.line_userId,
                  'line_displayName' : this.$store.state.currentUser.line_displayName,
                  'line_pictureUrl' : this.$store.state.currentUser.line_pictureUrl,
                  'line_statusMessege' : this.$store.state.currentUser.line_statusMessege,
                  'latitude' : this.$store.state.currentUser.latitude,
                  'longitude' : this.$store.state.currentUser.longitude,
                  'gender' : this.selected_gender,
                  'age' : this.selected_age,
                } 
            });
      if(data.result == "successed")
      { 
        this.$store.state.currentUser.age = this.selected_age;
        alert("succesfully saved"); 
      }
      else{
        alert("Error occured while saving profile");  }
      
    },
  },
  /*
  asyncData(context){
    return this.$axios.$get('/api/getCurrentUserInfo')
    .then(data =>{
        
       return   {
         selected_gender: data.info.user.gender,
         selected_age: data.info.user.age
        }
     
    }).catch(e => context.error(e));
  
  } 
  */
}
</script>