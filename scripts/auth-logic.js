

// Validators
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password)
{
    return /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(password)
}

// Data operations
function writeToLocalStorage(data)
{
    localStorage.setItem("login", data.email.value)
    localStorage.setItem("password", data.password.value)
    localStorage.setItem("firstAndLastName", data.firstName.value + " " + data.lastName.value )
    //localStorage.setItem("lastName", data.lastName.value)
    var accessType = document.getElementById("profileType")
    localStorage.setItem("access", accessType.options[accessType.selectedIndex].text)
    localStorage.setItem("birthdate", data.birthdate.value)
}

function signOut() 
{
    sessionStorage.setItem("isLoggedIn", false)
    window.location.href = "index.html"
}

function clearUserLocalStorage()
{
    var hasPlayerConfirmed = confirm("Are you sure you want to delete your account? All your data will be lost.")
    if (!hasPlayerConfirmed)
    {
        return
    }
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = "index.html"
}

function displayDataFromLocalStorage()
{
    if (!(sessionStorage.getItem("isLoggedIn") == "true"))
    {
        window.location.href = "../utility/404.html"
    }
    var data = getUserLocalStorage()
    for (var key in data)
    {
        var element = data[key]
        var textField = document.getElementById(key)
        if (textField)
        {
            var fixedKey = key.replace(/([a-z])([A-Z])/g, '$1 $2');
            fixedKey = fixedKey.charAt(0).toUpperCase() + fixedKey.slice(1)
            textField.innerHTML = fixedKey + " : " + element
        }
    }
}

function getUserLocalStorage()
{
    var data = {
        "firstAndLastName" : localStorage.getItem("firstAndLastName"), 
        "email" : localStorage.getItem("login"),
        "password" : localStorage.getItem("password"),
        "access" : localStorage.getItem("access"),
        "birthdate" : localStorage.getItem("birthdate")
    }
    return data
}

function tryValidateRegisterData()
{
    var inputField = Array.from(document.getElementById("sign-up").getElementsByTagName("input"))
    var labels = []
    var data = []
    Array.from(document.getElementById("sign-up").getElementsByTagName("label")).forEach(element => {
        labels[element.htmlFor] = element
    });
    inputField.forEach(element => {
        data[element.name] = element
        data[element.name].style["backgroundColor"] = null
        if (labels[element.name])
        {
            labels[element.name].style.display = "none"
        }
    })
    var isValid = true
    if (!validateEmail(data.email.value) || data.email.value == localStorage.getItem("login"))
    {
        data.email.style["backgroundColor"] = "red"
        labels["email"].style.display = "flex"
        isValid = false
    } 
    if (!validatePassword(data.password.value))
    {
        data.password.style["backgroundColor"] = "red"
        labels["password"].style.display = "flex"
        isValid = false
    }

    return {"isValid" : isValid, "data" : data}
}

function tryValidateSignInData()
{
    var signInData = Array.from(document.getElementById("sign-in").getElementsByTagName("input"))
    var dataList = []
    signInData.forEach(element => {
        dataList[element.name] = element
    });
    var savedData = getUserLocalStorage()
    var isValid = savedData.email == dataList.email.value && savedData.password == dataList.password.value;
    if (!isValid)
    {
        document.getElementById("not-correct-pair-label").style.display = "flex"
        dataList.password.style.backgroundColor = "red"
        dataList.email.style.backgroundColor = "red"
    }
    return isValid
}

function trySignIn()
{
    var isValid = tryValidateSignInData()
    if (!isValid)
    {
        return
    }
    sessionStorage.setItem("isLoggedIn", true)
    window.location = "index.html"
}

function tryRegister() 
{
    var tuple = tryValidateRegisterData()
    if (tuple.isValid)
    {
        writeToLocalStorage(tuple.data)
        sessionStorage.setItem("isLoggedIn", true)
        window.location.replace("index.html")
        document.getElementById("sign-up").action = "index.html"
    }
}