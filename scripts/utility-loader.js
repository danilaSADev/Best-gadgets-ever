function tryChangeColorOnLoad()
{
    var possibleColor = localStorage.getItem("theme-color")
    if (possibleColor != null)
    {
        document.documentElement.style.setProperty('--my-new-var', possibleColor)
        document.documentElement.style.setProperty('--grad-var', possibleColor + "41")
    }
}

$(function(){
    $("header").load("../../templates/utility/header.html"); 
    $("footer").load("../utility/footer.html"); 
});

