

isNavVisible = false

function onToggle() 
{
    const navMenu = document.getElementById('nav-menu-list')
    if (isNavVisible) {
        navMenu.classList.add("hide-menu");
        isNavVisible = false;
    } else {
        navMenu.classList.remove("hide-menu");
        isNavVisible = true
    }
}