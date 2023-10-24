
//#region [ EVENT LISTENER ]
document.addEventListener('DOMContentLoaded', () =>
{
    AssignSearch();
    AssignConsolesRedirection();
});
//#endregion [ EVENT LISTENER ]

//#region [ FUNCTIONS ]
/**
 * Single use function intended to run at load. Gets all the images inside the element 'juegos1' and assigns an event on click,
 * which will redirect the user to the page detalles.html with the uri component that the page is going to be listening for.
 * This will make the page display the data of that particular game. 
 */
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

/**
 * Single use hardcoded function intended to run at load. Assigns events to the different spans with the images of consoles
 * in order to redirect the client to the explorarConsola.html page and show the games of that console.
 */
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
//#endregion [ FUNCTIONS ]