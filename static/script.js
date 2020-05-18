const socket = io()

function submit_text() {
    socket.emit("send_data", { "data": document.getElementById("text").value })
}


socket.on("user_data_back", function(data) {
    if (!(data["classes"])) {
        alert("You are not signed up for any classes yet.")
    }
})

// GOOGLE STUFF

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
}
var profile;

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log("test")
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    after_login()
}

function after_login() {
    socket.emit("get_user_data", { "user": profile.getEmail() })
}