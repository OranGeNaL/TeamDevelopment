$(document).ready(function(){
    loadUserRecipes()
    //loadMyRecipes();
});

var userLogin = ""

async function loadUserRecipes(){
    if (await validateSession())
    {
      var params = new URLSearchParams(location.search)
      userLogin = params.get("id")
      
      if (userLogin == null)
        userLogin = currentEmail

      // Рецепты
      fetch(apiLink + '/api/recipe/author?email=' + userLogin).then(async rs => {
        if (rs.ok)
        {
          json = await rs.json()
          if (json.length != 0)
            $(".receipts-list").append(buildReceipts(json));
          else
            $(".recipes").append("<p>Вы ещё не добавили рецепты</p>")
        }

        // Информация о пользователе
        changeInfoContent(userLogin, json.length)

      })
      
  }
}

async function changeInfoContent(userLogin, countRecipes)
{
  $('.detail-info').append(`<h1>Пользователь ` + userLogin + `</h1>`);
  $('.detail-info').append(`<p class="coutRecipes">Добавлено рецептов: ` + String(countRecipes) + `</p>`);
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

function buildReceipts(responseContent)
{
  var receiptsStr = "";
  for (let i = 0; i < responseContent.length; i++) {
    const receipt = responseContent[i];
    receiptsStr += `<div class="receipt-container from-left-animated">  
          <div class="receipt-img">
  
          </div>
          <div class="receipt-description-container">
              <div class=receipt-description-container-text>
                  <a href="/pages/dish.html?id=` + receipt.id + `">` + receipt.name + `</a>
                  <p>` + receipt.description + `</p>
              </div>
              <div class="meta-description">
                  <div class="meta-description-views">` + receipt.views + ` просмотров</div>
                  <div class="meta-description-likes">` + receipt.likes + ` <i class="far fa-grin-hearts"></i></div>
                  <div class="meta-description-dislikes">` + receipt.dislikes + ` <i class="far fa-frown"></i></div>
                  <p> Автор: <a href="/pages/profile.html?id=` + receipt.author + `">` + receipt.author + `</a> </p>
              </div>
          </div>
      </div>
      `;
    }
  
      return receiptsStr;
  }