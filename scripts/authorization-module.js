function validateEmail(email) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    if(password.length >= 8)
        return true
    return false
}

function setSession(id) {
    $.cookie('session', id, { expires: 7, path: '/' });
}

async function validateSession() {
    if(validSes)
    {
        return true;
    }

    let cachedSession = {
        sesID: $.cookie('session')
    }

    let url = apiLink + '/api/register?sesID=' + $.cookie('session')

    let response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
    });
      
    if (response.ok)
    {
        let result = await response.json();
        currentEmail = JSON.parse(JSON.stringify(result)).email;
        validSes = true;
        return true
    }

    currentEmail = "";
    return false;
}

async function sendRegReq(Email, Password) {
    let user = {
        email: Email,
        password: Password
    }

    let response = await fetch(apiLink + '/api/register', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });
      
    if (response.ok)
    {
        let result = await response.json();
        // alert(JSON.stringify(result));
        // alert(result["sesID"].stringify())
        var sesID = JSON.parse(JSON.stringify(result)).sesID;
        // alert(sesID);
        setSession(sesID);

        document.location.href = "/pages/login.html";
        return true
    }
    else if (response.status == 400)
    {
        alert("Пользователь с такой почтой уже существует!");
    }
}

async function sendAuthRec(Email, Password) {
    let url = apiLink + '/api/register/login?email=' + Email + '&password=' + Password;

    let response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
    });
      
    if (response.ok)
    {
        let result = await response.json();
        setSession(result.sesID);
        document.location.href = "/pages/login.html";
        return true
    }

    currentEmail = "";
    return false;
}

$(document).ready(function(){
    // defaultSesId(sesId);
    // действия, которые необходимо выполнить после загрузки документа...
    
});

var defaultSesId = "1231232";
var currentEmail = "";
var validSes = false;
var apiLink = "https://orangenal-home.xyz/recipes";