sessionStorage.setItem("isLoggedIn", false)

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
    localStorage.setItem("login", data.email)
    localStorage.setItem("password", data.password)
}

function clearUserLocalStorage()
{
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = "index.html"
}

function getUserLocalStorage()
{
    var data = [localStorage.getItem("login"),  localStorage.getItem("password")]
    return data
}

function checkLogIn(signInData)
{
    var savedData = getUserLocalStorage()
    return savedData[0] == signInData.email && savedData[1] == signInData.password
}

function trySignIn()
{
    var signInData = Array.from(document.getElementById("sign-in").getElementsByTagName("input"))
    var dataList = []
    signInData.forEach(element => {
        dataList[element.name] = element.value
    });

    if (!checkLogIn(dataList))
    {
        alert("Incorrect data!")
        return
    }

    sessionStorage.setItem("isLoggedIn", true)
    window.location.href = "index.html"
}

function tryRegister() 
{
    var inputField = Array.from(document.getElementById("sign-up").getElementsByTagName("input"))
    var dataList = []
    inputField.forEach(element => {
        dataList[element.name] = element.value
    })
    if (!validateEmail(dataList.email))
    {
        alert("Incorrect email!")
        location.reload()
        return
    }
    if (!validatePassword(dataList.password))
    {
        alert("Incorrect password!")
        location.reload()
        return
    }
    sessionStorage.setItem("isLoggedIn", true)
    writeToLocalStorage(dataList)
    window.location.href = "index.html"
}