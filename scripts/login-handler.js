$(document).ready(function(){
    //setSession(sesId);
    // действия, которые необходимо выполнить после загрузки документа...
    changeLoginContent();

    $('#register-button').click(function () { 
        var Email = $('#register-email').val();
        var Password = $('#register-password').val();

        if(validateEmail(Email) && validatePassword(Password))
        {
            // alert("email: " + Email + "\npassword: " + Password);
            sendRegReq(Email, Password);
        }
        else
        {
            alert("Неподходящий email или пароль!");
        }
    });

    $('#login-button').click(function () { 
        var Email = $('#login-email').val();
        var Password = $('#login-password').val();

        if(validateEmail(Email) && validatePassword(Password))
        {
            // alert("email: " + Email + "\npassword: " + Password);
            sendAuthRec(Email, Password);
        }
        else
        {
            alert("Неподходящий email или пароль!");
        }
    });


    //Валидация почты и пароля на уровне формы
    $("#login-email").change(function() {
        $("#login-email").removeClass("invalid-value");
        $("#login-email").removeClass("valid-value");
        
        if(validateEmail($("#login-email").val()))
        {
            $("#login-email").addClass("valid-value");
        }
        else
        {
            $("#login-email").addClass("invalid-value");
        }

      });

    $("#register-email").change(function() {
        $("#register-email").removeClass("invalid-value");
        $("#register-email").removeClass("valid-value");
        
        if(validateEmail($("#register-email").val()))
        {
            $("#register-email").addClass("valid-value");
        }
        else
        {
            $("#register-email").addClass("invalid-value");
        }
      });

    $("#register-password").change(function() {
        $("#register-password").removeClass("invalid-value");
        $("#register-password").removeClass("valid-value");
        
        if(validatePassword($("#register-password").val()))
        {
            $("#register-password").addClass("valid-value");
        }
        else
        {
            $("#register-password").addClass("invalid-value");
        }
      });
});

async function changeLoginContent() {
    if(await validateSession())
    {
        $("main>h1").remove();
        $("main>.authorization-container").remove();

        $("main").append("<h1>Вы уже авторизованы!</h1>");
    }
    else
    { 
        $(".profile-name").html("неавторизованный пользователь");
        $('#logout-button').html('войти');
        $('#logout-button').attr('href', "/pages/login.html");
    }
}