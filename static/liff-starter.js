
var language = '';
var viewType = '';
var utouId = '';
var roomId = '';

//var userId = document.getElementById('useridfield');
var userId = '';
var displayName = '';
var pictureUrl = '';
var statusMessage = 'sss';
var LiffVar = 'dsfds';


window.onload = function (e) {
    //document.getElementById('testVar').textContent = "waw555";
    getLocation();
    liff.init(function (data) {
        initializeApp(data);
    });
    
    //alert("----test external javascript---");
 
};

function initializeApp(data) {

    
    //language = data.language;
    document.getElementById('languagefield').textContent = data.language;
    document.getElementById('viewtypefield').textContent = data.context.viewType;
    document.getElementById('useridfield').textContent = data.context.userId;
    document.getElementById('utouidfield').textContent = data.context.utouId;
    document.getElementById('roomidfield').textContent = data.context.roomId;
    document.getElementById('groupidfield').textContent = data.context.groupId;
    //userId = document.getElementById('useridfield').textContent;
    //userId = "sdadsadsdsad";
    liff.getProfile().then(function (profile) {

        document.getElementById('useridprofilefield').textContent = profile.userId;
        document.getElementById('displaynamefield').textContent = profile.displayName;
        document.getElementById('statusmessagefield').textContent = profile.statusMessage;
        
           var profilePictureDiv = document.getElementById('profilepicturediv');
            if (profilePictureDiv.firstElementChild) {
                profilePictureDiv.removeChild(profilePictureDiv.firstElementChild);
            }
            var img = document.createElement('img');
            img.src = profile.pictureUrl;
            img.alt = "Profile Picture";
            profilePictureDiv.appendChild(img);



        //userId = profile.userId;
        //displayName = "sdfdsfd";
        statusMessage = profile.statusMessage;
        pictureUrl =  profile.pictureUrl;
           
    });


}
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

