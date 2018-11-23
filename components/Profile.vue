<template>

  <div>
VUE FORM
<br>      
displayName:
{{$store.state.currentUser.displayName}}
<br>
userId:
{{$store.state.currentUser.lineId}}
<br>
PictureURL:
{{$store.state.currentUser.pictureUrl}}
<br>
statusMessage:
{{$store.state.currentUser.statusMessege}}
<br>
latitude:
{{$store.state.currentUser.latitude}}
<br>
longitude:
{{$store.state.currentUser.longitude}}
<br>
  
  </div>

</template>

<script>
export default {
   
   

}
</script>