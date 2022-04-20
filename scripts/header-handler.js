$(document).ready(function(){
    $('.logo').click(function () {
        document.location.href = "/index.html";
    });
    $(".profile-name").html("неавторизованный пользователь");
    
    $(".search-input").change(function() {

        if($(".search-input").val() != "")
        {
            searchRecipe($(".search-input").val());
        }
    });

    changeHeaderContent();

});

async function searchRecipe(name) {
    var response = await getReceiptsByName(name);
    
    $('.search-res-cont').html("");

    for (let i = 0; i < response.length; i++) {
        $('.search-res-cont').append(`<div class="result-cont">
        <div class="res-img"></div>
        <div class="res-a-cont"><a class="result" href="/pages/dish.html?id=` + response[i].id + `">` + response[i].name + `</a> </div>
    </div>`);
    }

    // alert(response[0].name);
}

async function changeHeaderContent() {
    if(await validateSession())
        {
            $("#logout-button").html(currentEmail);
            $('#profile-button').click(function () { 
                if(!menuToggle)
                {
                    $("#profile-button").append(`<div class="profile-menu">
                    <p id="pm-profile-button">Профиль</p>
                    <p id="pm-logout-button">Выйти</p>
                    </div>`);

                    $("#pm-profile-button").click(function (e) { 
                        document.location.href = "/pages/profile.html";
                    });

                    $("#pm-logout-button").click(function (e) { 
                        setSession("empty");
                        document.location.reload();
                    });

                    menuToggle = !menuToggle;
                }
                else
                {
                    $(".profile-menu").remove();
                    menuToggle = !menuToggle;
                }
            });
    
            $('#add-new-button').click(function () { 
                document.location.href = "/pages/add-receipt.html";
            });
    
            $('#add-new-button').css("display", "flex");
        }
    else
        { 
            $('#logout-button').html('Войти');
            $('#profile-button').click(function () { 
                document.location.href = "/pages/login.html";
            });
        }
}

menuToggle = false