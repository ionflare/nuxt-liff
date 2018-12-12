<template>
  <div>
     <v-card>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout row wrap
          >    
       <v-flex xs12>
              <v-card color="cyan darken-2" class="white--text">
                <v-layout>
                  <v-flex xs5>
                    <v-img
                      :src="$store.state.currentUser.ext_pictureUrl"
                      height="125px"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">{{$store.state.currentUser.ext_displayName}}</div>
                        <div>statusMessage</div>
                        <div>{{$store.state.currentUser.ext_statusMessege}}</div>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-actions class="pa-3">
                  Gender
                  <v-spacer></v-spacer>
                  <v-flex xs5>
                   <v-select 
                      :items="gender_items"
                      :label="noticeGender"
                      v-model="selected_gender"
                      
                    ></v-select>
                    </v-flex>
                </v-card-actions>
                <v-divider light></v-divider>
                <v-card-actions class="pa-3">
                  Age
                  <v-spacer></v-spacer>
                   <v-flex xs5>
                   <v-select
                      :items="age_items"
                      :label="noticeAge"
                      v-model="selected_age"
                    ></v-select>
                   </v-flex>
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
<!--
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
-->

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
   noticeGender: function(){
     if(this.selected_gender == "" || this.selected_gender== null)
        return "Please fill your gender information";
    },
    noticeAge: function(){
     if(this.selected_age == "" || this.selected_age== null)
        return "Please fill your age information";
    },
  },
  methods: { 
     async saveProfile(){
      let data = await this.$axios.$post('/api/update_profile',
            {
                currentUser :
                {
                  '_id' : this.$store.state.currentUser._id,
                  'ext_displayName' : this.$store.state.currentUser.ext_displayName,
                  'ext_pictureUrl' : this.$store.state.currentUser.ext_pictureUrl,
                  'ext_statusMessege' : this.$store.state.currentUser.ext_statusMessege,
                  'latitude' : this.$store.state.currentUser.latitude,
                  'longitude' : this.$store.state.currentUser.longitude,
                  'gender' : this.selected_gender,
                  'age' : this.selected_age,
                } 
            });
      if(data.result == "successed")
      { 
        this.$store.state.currentUser.age = this.selected_age;
         this.$store.state.currentUser.gender = this.selected_gender;
        alert("succesfully saved"); 
      }
      else{
        alert("Error occured while saving profile");  }
      
    },
  },
  
}
</script>