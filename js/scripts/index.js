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
    document.getElementById('consola1-span').addEventListener('click', ()=>
    {
        window.location.href = `./html/explorarConsola.html`;
    });
}