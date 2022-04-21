stepsCount = 1;

$(document).ready(function(){

    $('#add-step').click(function () { 
        $('.receipt-steps-cont').append('<input type="file" name="receipt-step-image-i" class="receipt-step-image-i from-left-animated">');
        $('.receipt-steps-cont').append('<textarea name="" class="receipt-step-i from-left-animated" id="receipt-description-i"></textarea>');
        stepsCount += 1;
    });

    $('#rem-step').click(function () { 
        if(stepsCount > 1)
        {
            $('.receipt-steps-cont').children().last().remove();
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


        if(recDesc.length > 220){
            alert("Описание не может превышать 220 символов.");
            return;
        }
        var mainPhotoFormData = new FormData();
        var stepsPhotoFormData = new FormData();

        const fileField = document.querySelector('#receipt-main-image-i');
        const stepFilesField = document.querySelectorAll(".receipt-step-image-i");

        mainPhotoFormData.append("mainPhoto", fileField.files[0])
        for (let i = 0; i < stepFilesField.length; i++) {
            stepsPhotoFormData.append("stepsPhoto", stepFilesField[i].files[0]);

        }

        // alert(recIngr)

        var jqS = $('.receipt-step-i')
        var steps = [];
        var stepPics = [];
        for (let i = 0; i < jqS.length; i++) {
            steps.push(jqS.eq(i).val());
            stepPics.push('empty');
        }

        //console.log(stepPics)

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

        let imgs = 0;
        for (let i = 0; i < stepFilesField.length; i++) {
            imgs += stepFilesField[i].files.length;
        }

        if (fileField.files.length > 0 && imgs == stepFilesField.length)
            handlePush(rec, mainPhotoFormData, stepsPhotoFormData)
        else
        {
            alert("Необходимо выбрать главное фото рецепта и фото для всех шагов")
        }
    });
});


async function handlePush(rec, mainFormData, stepsPhotoFormData)
{
    response = await pushReceipt(rec);
    
    if (response.ok)
    {
        let result = await response.json();
        let id = result.id;

        let mainPhotoUploadRes = await pushRecipeMainPic(mainFormData, id);
        let stepPhotosUploadRes;

        if(mainPhotoUploadRes.ok)
        {
            stepPhotosUploadRes = await pushRecipeStepsPics(stepsPhotoFormData, id);
        }
        //console.log(mainPhotoUploadRes);

        // stepPhotosUploadRes = await pushRecipeStepsPics(stepsPhotoFormData, id);
        //console.log(stepPhotosUploadRes);

        if(mainPhotoUploadRes.ok && stepPhotosUploadRes.ok)
        {
            console.log("posted")
            document.location.href = "/pages/dish.html?id=" + id;
        }
    }
    else
    {
        alert("Ошибка");
    }
}

