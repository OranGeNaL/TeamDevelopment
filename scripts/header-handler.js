$(document).ready(function(){
    $('.logo').click(function () {
        document.location.href = "/index.html";
    });
    $(".profile-name").html("неавторизованный пользователь");
    $('#logout-button').html('войти');
    $('#logout-button').attr('href', "/pages/login.html");
    
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
            $("#profile-link").attr("href", "/pages/profile.html");
            $(".profile-name").html(currentEmail);
            $('#logout-button').attr('href', "");
            $('#logout-button').html('выйти');
    
            $('#logout-button').click(function() {
                setSession("1231231");
            })
    
            $('#add-new-button').click(function () { 
                document.location.href = "/pages/add-receipt.html";
            });
    
            $('#add-new-button').css("display", "flex");
        }
    else
        { 
            $(".profile-name").html("неавторизованный пользователь");
            $('#logout-button').html('войти');
            $('#logout-button').attr('href', "/pages/login.html");
        }
}