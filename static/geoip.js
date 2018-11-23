var xxx = "tttt";
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    /*
    document.getElementById("demo").textContent = "Latitude: " + position.coords.latitude + 
    ", Longitude: " + position.coords.longitude; 
    */
   document.getElementById("latitude").textContent =  position.coords.latitude;
   document.getElementById("longitude").textContent =  position.coords.longitude;

}


window.onload = function (e) {
    getLocation();
 
};