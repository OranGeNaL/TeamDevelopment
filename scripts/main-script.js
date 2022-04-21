if (window.jQuery) {
    var verJquery = jQuery.fn.jquery;
    // выведем версию jQuery в консоль
    console.log(verJquery);
  }
else {
    console.log("nothing here");
}

$(document).ready(async function(){
    //loadAllRecipes();
    changeSelect($("#selector")[0])
});

function changeSelect(selector){
    if (selector.value == "Сортировать по дате публикации")
        fetch(apiLink + "/api/recipe/orderBy/date").then(async rs => {
            json = await rs.json();
            if (json.length != 0)
            {
                loadAllRecipes(json)
            }
        })
    else if ((selector.value == "Сортировать по числу лайков"))
        fetch(apiLink + "/api/recipe/orderBy/likes").then(async rs => {
            json = await rs.json();
            if (json.length != 0)
            {
                loadAllRecipes(json)
            }
        })
    else if ((selector.value == "Сортировать по числу просмотров"))
        fetch(apiLink + "/api/recipe/orderBy/views").then(async rs => {
            json = await rs.json();
            if (json.length != 0)
            {
                loadAllRecipes(json)
            }
        })
}

function loadAllRecipes(json)
{
    $(".receipts-list").children().remove()
    $(".receipts-list").append(buildReceipts(json));
}

function buildReceipts(responseContent)
{
    var receiptsStr = "";
    for (let i = 0; i < responseContent.length; i++) {
        const receipt = responseContent[i];
        receiptsStr += `<div class="receipt-container from-left-animated">  
        <img class="receipt-img" src="` + apiLink + responseContent[i].mainPhotosImagePath +  `">
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