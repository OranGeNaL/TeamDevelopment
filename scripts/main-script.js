if (window.jQuery) {
    var verJquery = jQuery.fn.jquery;
    // выведем версию jQuery в консоль
    console.log(verJquery);
  }
else {
    console.log("nothing here");
}

$(document).ready(function(){
    loadAllRecipes();
});

async function loadAllRecipes()
{
    var result = await getAllRecipes();

    if(result != null)
    {
        $(".receipts-list").append(buildReceipts(result));
    }
    else
    {
        document.location.href = "/pages/not-found.html";
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
            <a href="/pages/dish.html?id=` + receipt.id + `">` + receipt.name + `</a>
            <p>` + receipt.description + `</p>
        </div>
    </div>
    `;
    }

    return receiptsStr;
}