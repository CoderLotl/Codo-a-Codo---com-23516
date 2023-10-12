import { GetDollarValue } from "../services/APIDolar.js"; // Import of the API-consuming function.
import { DataAccess } from "../classes/DataAccess.js";
import { urlTarget } from "../config/config.js"; // Import of the config file.
let dataAccess;
let valorDolar;

document.addEventListener('DOMContentLoaded', async ()=>
{
    let gamesContainer = document.getElementById('gamesContainer');
    valorDolar = await GetDollarValue();
    try
    {
        dataAccess = new DataAccess();
        let games = await AutoSearchByReceivedParams();
        if(games !== false)
        {
            console.log(games);
            games.forEach(game =>
            {
                DrawGameArticle(game, gamesContainer);
            });
        }
    }
    catch(error)
    {
        console.error(error);
    }
});

async function AutoSearchByReceivedParams()
{
    try
    {
        if(window.location.search.split('=')[1])
        {
            let searchCriteria = window.location.search.split('=')[1];
            let games = await dataAccess.RetrieveGamesByConsole(urlTarget, searchCriteria);
            return games;
        }        
    }
    catch(error)
    {
        console.log(error);
        return false;
    }
}

function DrawGameArticle(game, displayContainer)
{
    console.log(game.name);
    let wrapper = document.createElement('article');    
    displayContainer.appendChild(wrapper);
    wrapper.classList = 'gameWrapper';
    
    let itemImgDiv = document.createElement('div');
    wrapper.appendChild(itemImgDiv);
    itemImgDiv.classList = 'itemImgDiv';
    let itemBrief = document.createElement('div');
    wrapper.appendChild(itemBrief);
    itemBrief.classList = 'itemBrief';

    let itemImg = document.createElement('img');
    itemImgDiv.appendChild(itemImg);
    itemImg.classList = 'itemImg';
    itemImg.src = `../Data/consoles/${game.console}/${game.folder}/${game.folder}1Principal.jpg`;

    let itemTitle = document.createElement('p');
    itemBrief.appendChild(itemTitle);
    let titleContent = document.createElement('a');
    itemTitle.appendChild(titleContent);
    titleContent.textContent = game.name;
    titleContent.classList = 'titleContent';
    let titleParams = GetURLParams(game);
    titleContent.href = `detalles.html?data=${titleParams}`;

    let itemConsole = document.createElement('p');
    itemBrief.appendChild(itemConsole);
    let gameType = TranslateGenre(game.type);
    itemConsole.innerHTML = "Consola: " + game.console + "<br><br>Género: " + gameType;

    let itemPrice = document.createElement('h2');
    itemBrief.appendChild(itemPrice);
    itemPrice.classList = 'itemPrice';
    if(valorDolar !== false)
    {
        let arsPrice = game.price * valorDolar;
        itemPrice.textContent = `(AR$) ${arsPrice}`;
    }
    else
    {
        itemPrice.textContent = `(U$) ${game.price}`;
    }
}

function GetURLParams(game)
{
    let gameData = 
    {
        "name": game.name,
        "SKU": game.SKU,
    };

    return encodeURIComponent(JSON.stringify(gameData));
}

function TranslateGenre(genre)
{
    switch(genre)
    {
        case 'sim':
            return "Simulación";
        case 'racing':
            return "Carreras";
        case 'platforms':
            return "Plataformas";
        case 'stealth':
            return "Sigilo";
        case 'sports':
            return "Deportes";
        case 'action':
            return "Acción";
        case 'strategy':
            return "Estrategia";
        case 'shooter':
            return "Disparos";
        case 'adventure':
            return "Aventura";
        default:
            return genre.charAt(0).toUpperCase() + genre.slice(1);
    }
}