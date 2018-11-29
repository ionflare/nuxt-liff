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
                      :src="$store.state.currentUser.line_displayName"
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
                  Rate Popularity
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

<!--
  <div>


  
  </div>
-->
</template>

<script>
export default {
   
   

}
</script>