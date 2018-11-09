//var x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        document.getElementById("demo").textContent = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    document.getElementById("demo").textContent = "Latitude: " + position.coords.latitude + 
    ", Longitude: " + position.coords.longitude; 
}