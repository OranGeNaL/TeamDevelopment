$(document).ready(function(){
    //setSession(sesId);
    // действия, которые необходимо выполнить после загрузки документа...
    var currentLocation = window.location;
    var currentReceipt = new URL(currentLocation).searchParams.get("id");

    if(currentReceipt != null)
    {
        fillReceiptPage(currentReceipt);
        
    }
    else
    {
        document.location.href = "/pages/not-found.html";
    }
    
    
});

async function fillReceiptPage(currentReceipt)
{
    var responseObject = await getReceiptById(currentReceipt);
    if(responseObject != null)
    {
        $("main").append(buildReceiptHeader(responseObject));
        $("main").append(buildReceiptDescription(responseObject));
        $("main").append(buildReceiptSteps(responseObject.directions));

        $('.remove-receipt').click(function () {
            removeReceipt(currentReceipt)
        });
    }

    else
    {
        document.location.href = "/pages/not-found.html";
    }
}

function buildReceiptHeader(receiptContent)
{
    var headerString =`<div class="receipt-header from-left-animated"><div class="receipt-header-top">
    <h1>` + receiptContent.name + `</h1>` + checkAuthor(receiptContent.author) + `</div>
    <h2>` + receiptContent.description + `</h2>
</div>`;
    return headerString;
}

function checkAuthor(author)
{
    if (author == currentEmail)
    {
        return '<a class="remove-receipt" href="#">удалить</a>';
    }
    else
    {
        return "";
    }
}

function buildReceiptDescription(receiptContent)
{
    var descriptionString = `<div class="receipt-description">
    <div class="receipt-img from-top-animated"></div>

    <div class="receipt-parameters">
        ` + countDuratuon(receiptContent.cookingDuration) +`
        <div class="receipt-portions from-top-animated">
            <p>` + receiptContent.portionNumber +` порции(й)</p>
        </div>
    </div>

    <div class="receipt-ingridients">
        ` + buildReceiptIngredients(receiptContent.ingredients) + `
    </div>
</div>`;

    return descriptionString;
}

function countDuratuon(duration)
{
    var dClass = "";
    var content = "";
    if(duration <= 60)
    {
        dClass = "fast"
        var min = duration - 15;
        var max = duration + 15;
        content = min + "-" + max + " минут";
    }
    else if(duration < 180)
    {
        dClass = "medium";
        var min = Math.floor(duration / 60);
        var max = min + 1;
        content = min + "-" + max + " часа";
    }
    else{
        dClass = "long";
        var min = Math.floor(duration / 60);
        var max = min + 1;
        content = min + "-" + max + " часа";
    }

    return `<div class="receipt-duration from-top-animated ` + dClass +`">
    <p>` + content +`</p>
</div>`;
}

function buildReceiptIngredients(ingredients)
{
    var result = "";
    for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        result += `<div class="receipt-ingridient from-top-animated">
        <p>` + ingredient + `</p>
    </div>
    `;
    }
    return result;
}

function buildReceiptSteps(steps)
{
    var stepsStr = "";
    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        stepsStr += `<div class="receipt-step from-left-animated">
        <h3>` + (i + 1) + `.</h3>
        <p>` + step + `</p>
    </div>
    `;
    }

    return `<div class="receipt-steps">
    ` + stepsStr + `
</div>`;
}