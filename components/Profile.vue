<template>

  <div>
VUE FORM
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

</template>

<script>
export default {
   
   

}
</script>