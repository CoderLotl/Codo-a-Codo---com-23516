document.addEventListener('DOMContentLoaded', () =>
{
    AssignSearch();
    AssignConsolesRedirection();
});

function AssignSearch()
{
    let images = document.getElementById('juegos1').getElementsByTagName('img');
    
    for(let i = 0; i < images.length; i++)
    {        
        let gameData = 
        {
            "name": images[i].name,
            "SKU": images[i].getAttribute("data-sku"),
        };

        let uriComponent = encodeURIComponent(JSON.stringify(gameData));
        
        images[i].addEventListener('click', ()=>
        {
            window.location.href = `./html/detalles.html?data=${uriComponent}`;
        });
    }
}

function AssignConsolesRedirection()
{
    let url = "./html/explorarConsola.html?data=";
    document.getElementById('consola1-span').addEventListener('click', ()=>
    {
        window.location.href = url+"PS5";
    });

    document.getElementById('consola2-span').addEventListener('click', ()=>
    {
        window.location.href = url+"XBOX";
    });
    
    document.getElementById('consola3-span').addEventListener('click', ()=>
    {
        window.location.href = url+"SWITCH";
    });
    
    document.getElementById('consola4-span').addEventListener('click', ()=>
    {
        window.location.href = url+"PC";
    });
}