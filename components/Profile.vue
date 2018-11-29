<template>


  <div>
     <v-card>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout row wrap>    

    <v-flex xs12>
              <v-card color="purple" class="white--text">
                <v-layout row>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">{{$store.state.currentUser.line_displayName}}</div>
                      </div>
                    </v-card-title>
                  </v-flex>
                  <v-flex xs5>
                    <v-img
                      :src="$store.state.currentUser.line_pictureUrl"
                      height="125px"
                      contain
                    ></v-img>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-actions class="pa-3">
                  Popularity
                  <v-spacer></v-spacer>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>            
  </div>

<!--
  <div>

<br>      
displayName:
{{$store.state.currentUser.line_displayName}}
<br>
userId:
{{$store.state.currentUser.line_userId}}
<br>
PictureURL:
{{$store.state.currentUser.line_pictureUrl}}
<br>
statusMessage:
{{$store.state.currentUser.line_statusMessege}}
<br>
latitude:
{{$store.state.currentUser.latitude}}
<br>
longitude:
{{$store.state.currentUser.longitude}}
<br>
  
  </div>
-->
</template>

<script>
export default {
   
   

}
</script>