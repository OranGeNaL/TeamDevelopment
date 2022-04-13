$(document).ready(function(){
    //setSession(sesId);
    // действия, которые необходимо выполнить после загрузки документа...
    
    changeProfileContent();
});

async function changeProfileContent()
{
    if(await validateSession())
    {
        $('main').append(`<p class="profile-email">Ваша почта: ` + currentEmail + `</p>`);
    }
}