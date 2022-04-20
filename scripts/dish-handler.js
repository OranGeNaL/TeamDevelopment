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
    var responseObject = await getReceiptById(currentReceipt, $.cookie('session'));
    //var responseObject = await getReceiptById(currentReceipt, "");
    if(responseObject != null)
    {
        $("main").append(buildReceiptHeader(responseObject));
        $("main").append(buildReceiptDescription(responseObject));
        $("main").append(buildReceiptSteps(responseObject.directions, responseObject));
        $("main").append(buildRatingButtons(responseObject.likes, responseObject.dislikes, responseObject.like, responseObject.dislike));

        var mem_likes = responseObject.likes;
        var mem_dislikes = responseObject.dislikes;
        var is_liked = responseObject.like;
        var is_disliked = responseObject.dislike;

        $('.remove-receipt').click(function () {
            removeReceipt(currentReceipt);
        });

        $('#receipt-like-button').click(function (){
            likeHandler(currentReceipt, is_liked, mem_likes);
            is_liked = !is_liked;
            if(is_liked){
                mem_likes += 1;
            }else{
                mem_likes -= 1;
            }

            if(is_disliked){
                is_disliked = false;
                fillDislikes(is_disliked, mem_dislikes);
                mem_dislikes -= 1;
            }
        });

        $('#receipt-dislike-button').click(function (){
            dislikeHandler(currentReceipt, is_disliked, mem_dislikes);
            is_disliked = !is_disliked;
            if(is_disliked){
                mem_dislikes += 1;
            }else{
                mem_dislikes -= 1;
            }

            if(is_liked){
                is_liked = false;
                fillLikes(is_liked, mem_likes);
                mem_likes -= 1;
            }
        });
    }

    else
    {
        document.location.href = "/pages/not-found.html";
    }
}

async function likeHandler(currentReceipt, is_liked, likes_am){
    let response = await fetch(apiLink + '/api/like?idRecipe=' + currentReceipt + '&sesID=' + $.cookie('session'), {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
    });

    if(response.ok){
        //console.log("like is ok", is_liked);
        is_liked = !is_liked;
        fillLikes(is_liked, likes_am);
    }else{
        //console.log("like not ok");
    }
}

function fillLikes(is_liked, likes_am){
    var smile = '<div class="smile"><i class="';
    var obj = `<div class="receipt-likes-count">`;
    
    if(is_liked){
        smile += 'fas';
        likes_am += 1;
    } else{
        smile += 'far';
        likes_am -= 1;
    }

    smile += ' fa-grin-hearts fa-2x"></i></div><div>&emsp;&emsp;</div>';
    obj += likes_am + `&emsp;</div>`;
    $('.smile').replaceWith(smile);
    $('.receipt-likes-count').replaceWith(obj);
}

async function dislikeHandler(currentReceipt, is_disliked, mem_dislikes){
    let response = await fetch(apiLink + '/api/dislike?idRecipe=' + currentReceipt + '&sesID=' + $.cookie('session'), {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
    });

    if(response.ok){    
        is_disliked = !is_disliked;
        fillDislikes(is_disliked, mem_dislikes);
    }else{

    }
}

function fillDislikes(is_disliked, mem_dislikes){
    var not_smile = '<div class="not_smile"><i class="';
    var obj = `<div class="receipt-dislikes-count">&emsp;`;
    
    if(is_disliked){
        not_smile += 'fas';
        mem_dislikes += 1;
    } else{
        not_smile += 'far';
        mem_dislikes -= 1;
    }

    not_smile += ' fa-frown fa-2x"></i></div>';
    obj += mem_dislikes + `</div>`;
    $('.not_smile').replaceWith(not_smile);
    $('.receipt-dislikes-count').replaceWith(obj);
}

function buildReceiptHeader(receiptContent)
{
    var headerString =`<div class="receipt-header from-left-animated"><div class="receipt-header-top">
    <h1>` + receiptContent.name + `</h1>` + checkAuthor(receiptContent.author) + 
    `<div class = "receipt-views">` + receiptContent.views + ` просмотров</div>` + `</div>
    <h2>` + receiptContent.description + `</h2></div>`;
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
    <img class="receipt-img from-top-animated" src="` + apiLink + receiptContent.mainPhotosImagePath + `">

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

function buildReceiptSteps(steps, receiptContent)
{
    var stepsStr = "";
    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        stepsStr += `<div class="receipt-step from-left-animated">
        <h3>` + (i + 1) + `.</h3>
        <img src="` + apiLink + receiptContent.stepsPhotosImagePath[i] + `">
        <p>` + step + `</p>
    </div>
    `;
    }

    return `<div class="receipt-steps">
    ` + stepsStr + `
</div>`;
}

function buildRatingButtons(likes, dislikes, is_liked, is_disliked){
    var like_obj = is_liked ? "fas" : "far";
    var dislike_obj = is_disliked ? "fas" : "far";
    return `<div class="receipt-likes">
                <div class="receipt-likes-count">` + likes +`&emsp;</div>
                <div id="receipt-like-button">
                    <div class=smile><i class=" ` + like_obj + ` fa-grin-hearts fa-2x"></i></div>
                </div>
                <div>&emsp;&emsp;</div>
                <div id="receipt-dislike-button">
                    <div class=not_smile><i class="` + dislike_obj + ` fa-frown fa-2x"></i></div>
                </div>
                <div class="receipt-dislikes-count">&emsp;` + dislikes + `</div>
            </div>`;
}