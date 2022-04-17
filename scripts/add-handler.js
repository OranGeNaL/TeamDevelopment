stepsCount = 1;

$(document).ready(function(){
    // var classes = ["light", "", "heavy", "extraheavy"];
    // var i = 1;
    // $("#toggleweight").click(function () {
    // $(".btn").removeClass(classes[i]);
    // i++;
    // if (i >= classes.length) {
    //     i = 0;
    // }
    // $(".btn").addClass(classes[i]);
    // });

    $('#add-step').click(function () { 
        $('.receipt-steps-cont').append('<textarea name="" class="receipt-step-i from-left-animated" id="receipt-description-i"></textarea>');
        stepsCount += 1;
    });

    $('#rem-step').click(function () { 
        if(stepsCount > 1)
        {
            $('.receipt-steps-cont').children().last().remove();
            stepsCount -= 1;
        }
    });

    $('#push-receipt-button').click(function () { 
        var recName = $('#receipt-header-i').val();
        var recDesc = $('#receipt-description-i').val();
        var portions = parseInt($('#receipt-portions-i').val(), 10);
        var duration = parseInt($('#receipt-duration-i').val(), 10);
        var recIngr = $('#receipt-ingridients-i').val().split(';');

        // alert(recIngr)

        var jqS = $('.receipt-step-i')
        var steps = [];
        var stepPics = [];
        for (let i = 0; i < jqS.length; i++) {
            steps.push(jqS.eq(i).val());
            stepPics.push('empty');
        }

        console.log(stepPics)

        var rec = {
            name: recName,
            category: "bebra",
            description: recDesc,
            mainPicture: "empty",
            cookingDuration: duration,
            portionNumber: portions,
            ingredients: recIngr,
            directions: steps,
            stepsPicture: stepPics,
            author: $.cookie('session'),
            views: 0,
            likes: 0,
            dislikes: 0
        };

        handlePush(rec)
    });
});


async function handlePush(rec)
{
    if(await pushReceipt(rec))
    {
        
    }
    else
    {

    }
}

