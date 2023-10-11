import { GetDollarValue } from "../services/APIDolar.js"; // Import of the API-consuming function.
import { DataAccess } from "../classes/DataAccess.js"; // Import of the DataAccess class, which interacts with the JSON file.
import { urlTarget } from "../config/config.js"; // Import of the config file.

let dataAccess = new DataAccess();
let searchButton;
let applyFilterButton;
let searchInput;
let searchCriteria;
let valorDolar;

// [ LOAD EVENT ]
document.addEventListener('DOMContentLoaded', async ()=>
{    
    searchButton = document.getElementById('searchButton');
    applyFilterButton = document.getElementById('applyFilter');
    searchInput = document.getElementById('searchInput');

    valorDolar = await GetDollarValue();
    SetPriceTag();

    // SEARCH BUTTON
    searchButton.addEventListener('click', ()=>
    {
        SetCriteria();        
        SearchGames();
    });

    // SEARCH INPUT (SEARCH BAR)
    searchInput.addEventListener('keydown', (e)=>
    {
        if(e.key === "Enter")
        {
            SetCriteria();
            SearchGames();
        }
    });

    // APPLY FILTER BUTTON
    applyFilterButton.addEventListener('click', ()=>
    {
        SetCriteria();
        SearchGames();
    });

    AutoSearchByReceivedParams();
});
// end of [ LOAD EVENT ]

// FUNCTIONS

/**
 * Retrieves all the games matching the filters and draws the HTML which will represent them dynamically.
 * If no game is found, it puts an image displaying the error in the corresponding container. 
 */
async function SearchGames()
{
    let displayContainer = document.getElementById('itemsDisplay');
    
    let games = await dataAccess.RetrieveGames(urlTarget, searchCriteria, valorDolar);
    displayContainer.innerHTML = '';
    if(games !== false)
    {
        games.forEach(game =>
        {
            DrawGameArticle(game, displayContainer);
        });
    }
    else
    {
        let imgError = document.createElement('img');
        displayContainer.appendChild(imgError);
        imgError.src = '../images/error.png';
    }
}

/** 
 * Gets the game data and the HTML container element and creates an object which represents the game, displaying the data, then inserting it in the container.
 * @param {Array} game An associative array representing the game and containing its data.
 * @param {*} displayContainer An HTML element.
 */
function DrawGameArticle(game, displayContainer)
{
    console.log(game.name);
    let wrapper = document.createElement('div');    
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

/**
 * Returns a string containing the name and SKU of the game. 
 * @param {Array} game An associative array representing the game and containing its data.
 * @return {string} 
 */
function GetURLParams(game)
{
    let gameData = 
    {
        "name": game.name,
        "SKU": game.SKU,
    };

    return encodeURIComponent(JSON.stringify(gameData));
}

/**
 * Sets the money tipe representation in the Price container and, if the API returned a value, sets the title of the 'help' image stating the current
 * date and parity. Else, sets the title saying the API didn't answer.
 */
function SetPriceTag()
{
    let priceTag = document.getElementById('priceTag');
    let dollarInfo = document.getElementById('dollarInfo');
    if(valorDolar != null)
    {
        let date = new Date();

        let options = { timeZone: 'America/Argentina/Buenos_Aires' };
        let formatter = new Intl.DateTimeFormat('en-US', options);

        formatter.format(date);

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        priceTag.textContent += ' (AR$) ';
        dollarInfo.title = `Paridad dolar al día ${day}/${month}/${year}: U$1 = AR$ ${valorDolar}`;
    }
    else
    {
        priceTag.textContent += ' (U$)';
        dollarInfo.title = `(!) No se pudo conectar con DolarAPI.`;
    }
}

/**
 * Intended to run after the page load. Checks for if there are any params in the page's URL for a game search and,
 * if there are, tries to search for the game. 
 */
function AutoSearchByReceivedParams()
{
    try
    {
        if(window.location.search.split('=')[1])
        {
            searchCriteria = window.location.search.split('=')[1];
            SearchGames();
        }        
    }
    catch(error)
    {
        console.log(error);
    }
}

/**
 * Retrieves the value of the search bar input and sets it as the search criteria.
 */
function SetCriteria()
{
    searchCriteria = searchInput.value;
    searchInput.blur();    
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