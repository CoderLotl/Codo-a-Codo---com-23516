import { GetDollarValue } from "../services/APIDolar.js"; // Import of the API-consuming function.
import { DataAccess } from "../classes/DataAccess.js";
import { urlTarget } from "../config/config.js";

let dataAccess = new DataAccess();
let gameParams;
let gameDetails = false;
let valorDolar;
let searchButton;
let searchInput;
let searchCriteria;

//#region [ EVENT LISTENER ]
document.addEventListener('DOMContentLoaded', async ()=>
{
    searchInput = document.getElementById('searchInput');
    searchButton = document.getElementById('searchButton');

    valorDolar = await GetDollarValue();
    
    gameParams = GetParamsData();
    if(gameParams !== false)
    {
        gameDetails = await GetGameDetails();    
        if(gameDetails !== false)
        {
            DrawDetails();
        }
    }

    // SEARCH BUTTON
    searchButton.addEventListener('click', ()=>
    {
        SetCriteria();        
        window.location.href = `explorar.html?search=${searchCriteria}`;
    });

    // SEARCH INPUT (SEARCH BAR)
    searchInput.addEventListener('keydown', (e)=>
    {
        if(e.key === "Enter")
        {
            SetCriteria();
            window.location.href = `explorar.html?search=${searchCriteria}`;
        }
    });
});
//#endregion [ EVENT LISTENER ]

//#region [ FUNCTIONS ]
/**
 * Single use function intended to run at load. Gets the params from the URL and returns a std object.
 * @return {false|object} 
 */
function GetParamsData()
{
    try
    {
        let results = window.location.search.split('=')[1];
        let params = decodeURIComponent(results.replace(/\+/g, " "));
    
        if(params !== false)
        {
            return JSON.parse(params);
        }
    }
    catch(error)
    {
        console.log(error);
        return false;
    }
}

/**
 * Retrieves the whole list of games using a lite function, passing down the var gameParams.
 * Returns a game on success or false on failure.
 * @return {false|array} 
 */
async function GetGameDetails()
{
    let game = await dataAccess.RetrieveGamesLite(urlTarget, gameParams);
    if(game !== false)
    {
        return game;
    }
    return false;
}

/**
 * Draws the front, setting the details of the game in the respective HTML elements, effectively displaying the game
 * and replacing the placeholder data. 
 */
function DrawDetails()
{
    let gameImg = document.getElementById('gamePicture');
    gameImg.src = `../Data/consoles/${gameDetails.console}/${gameDetails.folder}/${gameDetails.folder}1Principal.jpg`;

    document.getElementById('gameTitle').textContent = gameDetails.name;    
    if(valorDolar !== false)
    {
        let arsPrice = gameDetails.price * valorDolar;
        document.getElementById('gamePrice').textContent = `(AR$) ${arsPrice}`;
    }
    else
    {
        document.getElementById('gamePrice').textContent = `(U$) ${gameDetails.price}`
    }

    document.getElementById('console').textContent = `Consola: ${gameDetails.console}`;
    document.getElementById('type').textContent = `Género: ${gameDetails.type}`;
    document.getElementById('age').textContent = `Edad: ${gameDetails.age}`;

    let details = document.getElementById('details');
    let descriptionTitle = document.createElement('h3');
    details.appendChild(descriptionTitle);
    descriptionTitle.textContent = 'Descripción';
    let description = document.createElement('p');
    details.appendChild(description);
    description.id = 'gameDescription';
    description.textContent = gameDetails.description;

    let videoFrame = document.createElement('div');
    details.appendChild(videoFrame);
    videoFrame.id = 'videoFrame';

    let videoIframe = document.createElement('iframe');
    videoFrame.appendChild(videoIframe);    
    videoIframe.src = `https://www.youtube.com/embed/${gameDetails.yt.split('v=')[1]}`;
    videoIframe.id = 'gameVideo';
    videoIframe.setAttribute('allow', "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
    videoIframe.setAttribute('frameborder', 0);    
}

/**
 * Sets the content of the searchInput input as the value of the variable searchCriteria. 
 */
function SetCriteria()
{
    searchCriteria = searchInput.value;    
}
//#endregion [ FUNCTIONS ]