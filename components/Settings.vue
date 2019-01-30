<template>
<v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-subheader class="pl-0">Max Distance in KM (100 = regardless of distance)</v-subheader>
          <v-slider v-if="IsSetSearchDistance"
            v-model="search_distance_max"
            thumb-color="teal"
            thumb-label="always"
          ></v-slider>
          <v-slider v-else
            v-model="predefineSearchDistance"
            thumb-color="teal"
            thumb-label="always"
          ></v-slider>
        </v-flex>
    </v-layout>
    <v-layout row wrap>
        <v-flex xs12>
          <v-subheader class="pl-0">Age Range(Year)</v-subheader>
        </v-flex>
    </v-layout>
    <v-layout row wrap>
        
          <v-flex class="px-3">
            <v-range-slider v-if="IsSetSearchAge"
              thumb-label="always"
              v-model="searchAgeRange"
              :max="max"
              :min="min"
            ></v-range-slider>
            <v-range-slider v-else
              thumb-label="always"
              v-model="predefineSearchAge"
              :max="max"
              :min="min"
            ></v-range-slider>
          </v-flex>
         
        </v-layout>

        
        <v-layout row >
        <v-flex xs12 sm4>
          <v-subheader class="pl-0">Looking For</v-subheader>
         <v-select v-if="IsSetSearchGender"
            :items="gender_items"
            label="Gender"
            v-model="selected_search_gender"
          ></v-select>
           <v-select v-else
            :items="gender_items"
            label="Gender"
            v-model="predefineSearchGender"
          ></v-select>
         
        </v-flex>
        </v-layout>

        <v-layout row >
        <v-flex xs12 sm4 >
            <v-btn @click="saveSettings()" color="success">
             Save
            </v-btn>
         
        </v-flex>
        </v-layout>


  </v-container>
</template>
<script>
export default {
  data() {
    return {
      gender_items: ['Male', 'Female', 'All'],
      min: 15,
      max: 80,
      
      predefineSearchDistance : 100,
      predefineSearchAge : [18,50],
      predefineSearchGender : "All",
      search_distance_max : this.$store.state.currentUser.search_distance_max,
      searchAgeRange: [this.$store.state.currentUser.search_age_min, this.$store.state.currentUser.search_age_max],
      selected_search_gender :  this.$store.state.currentUser.search_gender,
    };
  },


  computed: {
    IsSetSearchDistance(){
      if(this.$store.state.currentUser.search_distance_max == null)
      { return false;} else {return true;}
    },
    IsSetSearchAge(){
        if(this.$store.state.currentUser.search_age_min == null
        || this.$store.state.currentUser.search_age_max == null)
      { return false;} else {return true;}
    },
    IsSetSearchGender(){
        if(this.$store.state.currentUser.search_gender == null)
      { return false;} else {return true;}
    },
   },
   methods: { 
 
     async saveSettings(){

        let currentUser = 
        {'_id' : this.$store.state.currentUser._id }

        if(this.$store.state.currentUser.search_distance_max == null)
        { currentUser.search_distance_max = this.predefineSearchDistance; }
        else{ currentUser.search_distance_max = this.search_distance_max;}
        
        if(this.$store.state.currentUser.search_gender == null)
        { currentUser.search_gender = this.predefineSearchGender; }
        else{ currentUser.search_gender = this.selected_search_gender;}

        if(this.$store.state.currentUser.search_age_min == null
        || this.$store.state.currentUser.search_age_max == null)
        { currentUser.search_age_min = this.predefineSearchAge[0];
          currentUser.search_age_max = this.predefineSearchAge[1];
        }
        else{ 
          currentUser.search_age_min = this.searchAgeRange[0];
          currentUser.search_age_max = this.searchAgeRange[1];
        }

      let data = await this.$axios.$post('/api/update_settings',
            {currentUser });
      if(data.result == "successed")
      { 
        this.$store.state.currentUser.search_distance_max = currentUser.search_distance_max;
        this.$store.state.currentUser.search_age_min = currentUser.search_age_min;
        this.$store.state.currentUser.search_age_max = currentUser.search_age_max;
        this.$store.state.currentUser.search_gender = currentUser.search_gender;
        alert("succesfully saved"); 
      }
      else{
        alert("Error occured while saving settings");  }
      
    },
  },
  
}
</script>
