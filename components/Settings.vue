<template>
<v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-subheader class="pl-0">Max Distance(KM)</v-subheader>
          <v-slider
            v-model="slider"
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
            <v-range-slider
              thumb-label="always"
              v-model="range"
              :max="max"
              :min="min"
            ></v-range-slider>
          </v-flex>
         
        </v-layout>

        
        <v-layout row >
        <v-flex xs12 sm4>
          <v-subheader class="pl-0">Looking For</v-subheader>
         <v-select
            :items="items"
            label="Gender"
          ></v-select>
         
        </v-flex>
        </v-layout>

        <v-layout row >
        <v-flex xs12 sm4 >
            <v-btn color="success">
             Save
            </v-btn>
         
        </v-flex>
        </v-layout>


  </v-container>
</template>
<script>
export default {
    data: () => ({
     min: 15,
      max: 80,
      slider: 40,
      range: [18, 50],
      items: ['Male', 'Female', 'All']
  }),
}
</script>
