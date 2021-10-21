$(function(){
    $("header").load("../../templates/utility/header.html"); 
    $("footer").load("../utility/footer.html"); 
});

function checkIfLoggedIn()
{
    console.log(sessionStorage.getItem("isLoggedIn"))
    document.getElementById("profile-button").hidden = sessionStorage.getItem("isLoggedIn")
    document.getElementById("auth-buttons").hidden = !sessionStorage.getItem("isLoggedIn")
}