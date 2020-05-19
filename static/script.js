const socket = io()

// ON startup

socket.emit("get_all_classes")

var clases = {}
    // Funtions

function submit_text() {
    socket.emit("send_data", { "data": document.getElementById("text").value })
}

function after_login() {
    socket.emit("get_user_data", { "user": profile.id_token, "name": profile.getName(), "image_url": profile.getImageUrl() })
    document.getElementById("sign_in_section").hidden = true
    document.getElementById("pick_teacher_or_student").hidden = false
}
//Socket receivers

socket.on("all_classes_back", function(data) { classes = data["classes"] })

socket.on("user_data_back", function(data) {
    info = data["data"]
    if (info["classes"].length == 0) {
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