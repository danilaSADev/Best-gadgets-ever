sessionStorage.setItem("isLoggedIn", false)

function writeToLocalStorage(data)
{
    localStorage.setItem("login", data.email)
    localStorage.setItem("password", data.password)
}

function checkWithLocalStorage(data)
{
    var isVerified = true
    if (data.email)

    return false
}

function deleteUserData()
{
    localStorage.clear()
}

function getUserData()
{
    var data = [localStorage.getItem("login"),  localStorage.getItem("password")]
    return data
}

function checkUserInput()
{
    
}

function checkLogIn(signInData)
{
    var savedData = getUserData()
    console.log(savedData[0])
    return savedData[0] == signInData.email && savedData[1] == signInData.password
}

function getRegistrationData() 
{
    var inputField = Array.from(document.getElementById("sign-up").getElementsByTagName("input"))
    var dataList = []
    inputField.forEach(element => {
        dataList[element.name] = element.value
    });
    writeToLocalStorage(dataList)
    console.log(getUserData())
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
        alert("Incorrect login and password pair!")
        return;
    }
    window.location.href = "index.html"
    sessionStorage.setItem("isLoggedIn", true)
}
