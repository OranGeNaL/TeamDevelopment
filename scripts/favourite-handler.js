$(document).ready(function(){
    loadFavRecipes();
})

async function loadFavRecipes(){
    if (await validateSession())
    {
    
      fetch(apiLink + '/api/favorites?sesID=' + $.cookie('session')).then(async rs => {
        if (rs.ok)
        {
          json = await rs.json()
          if (json.status != 404)
            $(".receipts-list").append(buildReceipts(json));
        }
        else
            $(".recipes").append("<p>Вы ещё не добавили рецепты</p>")

      })
      
  }
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