$(document).ready(function(){
    loadUserRecipes()
    //loadMyRecipes();
});

async function loadUserRecipes(){
    await validateSession()
    fetch(apiLink + '/api/recipe/author?email=' + currentEmail).then(async rs => {
      if (rs.ok)
      {
        json = await rs.json()
        $(".receipts-list").append(buildReceipts(json));
      }
  })
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  function buildReceipts(responseContent)
  {
    console.log(responseContent.length)
      var receiptsStr = "";
      for (let i = 0; i < responseContent.length; i++) {
          const receipt = responseContent[i];
          console.log(receipt.id)
          receiptsStr += `<div class="receipt-container from-left-animated">  
          <div class="receipt-img">
  
          </div>
          <div class="receipt-description-container">
              <a href="/pages/dish.html?id=` + receipt.id + `">` + receipt.name + `</a>
              <p>` + receipt.description + `</p>
          </div>
      </div>
      `;
      }
      return receiptsStr;
    }