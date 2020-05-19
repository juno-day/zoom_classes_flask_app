const socket = io()

function submit_text() {
    socket.emit("send_data", { "data": document.getElementById("text").value })
}


socket.on("user_data_back", function(data) {
    if (data["classes"].length == 0) {
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

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    profile.id_token = id_token
    console.log("ID Token: " + id_token);
    after_login()
}

function after_login() {
    socket.emit("get_user_data", { "user": profile.id_token, "image_url": profile.getImageUrl() })
}