async function getReceiptById(receiptID, sesID)
{
    let url = apiLink + '/api/recipe/' + receiptID + '?sesID=' + sesID;

    let response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
    });
      
    if (response.ok)
    {
        let result = await response.json();
        return result;
    }

    return null;
}

async function getReceiptsByName(name)
{
    let url = apiLink + '/api/recipe/search?name=' + name;

    let response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
    });
      
    if (response.ok)
    {
        let result = await response.json();
        return result;
    }

    return null;
}

async function getAllRecipes()
{
    let url = apiLink + '/api/recipe/all';

    let response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
    });
      
    if (response.ok)
    {
        let result = await response.json();
        return result;
    }

    return null;
}

async function removeReceipt(id)
{
    let url = apiLink + '/api/recipe/' + id;

    let response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
    });
      
    if (response.ok)
    {
        //let result = await response.json();
        document.location.href = "/index.html";
        return true;
    }

    return null;
}

async function pushReceipt(receipt)
{
    // alert(JSON.stringify(receipt));
    // console.log(JSON.stringify(receipt));
    let response = await fetch(apiLink + '/api/recipe/new', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(receipt)
    });
      
    
    return response;
    // else if (response.status == 400)
    // {
    //     alert("Ошибка");
    // }
}

async function pushRecipeMainPic(formData, idRecipe)
{
    let response = await fetch(apiLink + "/api/recipe/new/mainPhoto?idRecipe=" + idRecipe, {
        method: 'POST',
        mode: 'cors',
        body: formData
    })
    
    return response;
    
}

async function pushRecipeStepsPics(formData, idRecipe)
{
    let response = await fetch(apiLink + "/api/recipe/new/stepsPhoto?idRecipe=" + idRecipe, {
        method: 'POST',
        mode: 'cors',
        body: formData
    })
    return response;
    
}