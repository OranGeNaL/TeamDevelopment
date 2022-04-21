$(document).ready(function(){
    loadUserRecipes();
})

async function loadUserRecipes(){
    // if (await validateSession())
    // {
      var params = new URLSearchParams(location.search)
      var userLogin = params.get("id")
      
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
      
  // }
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
        <img class="receipt-img" src="` + apiLink + responseContent[i].mainPhotosImagePath +  `">
        <div class="receipt-description-container">
            
                <a href="/pages/dish.html?id=` + receipt.id + `">` + receipt.name + `</a>
                <p>` + receipt.description + `</p>
            
                <div class="meta-description">
                    <a href="/pages/profile.html?id=` + receipt.author + `">` + receipt.author + `</a>
                    <div class="meta-description-stats">
                        <p class="meta-description-likes">` + receipt.likes + ` <i class="far fa-grin-hearts"></i></p>
                        <p class="meta-description-dislikes">` + receipt.dislikes + ` <i class="far fa-frown"></i></p>
                        <p class="meta-description-views">` + receipt.views + ` просмотров</p>
                    </div>
                </div>
            
        </div>
    </div>
    `;
    }
  
  return receiptsStr;
}