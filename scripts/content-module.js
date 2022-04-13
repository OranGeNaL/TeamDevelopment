async function getReceiptById(receiptID)
{
    let url = apiLink + '/api/recipe/' + receiptID;

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
      
    if (response.ok)
    {
        let result = await response.json();
        let id = JSON.parse(JSON.stringify(result)).id;
        document.location.href = "/pages/dish.html?id=" + id;
        return true
    }
    else if (response.status == 400)
    {
        alert("Ошибка");
    }
}