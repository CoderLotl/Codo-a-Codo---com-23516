import { ItemSearchFilters } from "./ItemSearchFilters.js";

/**
 * This class manages the data interactions with the JSON files and provides the necessary functions
 * for processing such data based on external HTML required elements. 
 * @export
 * @class DataAccess
 */
export class DataAccess
{
    constructor()
    {
        this.itemSearchFilters = new ItemSearchFilters();
    }        
        
    /**
     * Retrieves the whole data of the provided URL. Intended ONLY for .json or .txt files.
     * @param {string} url A string with the file's path.
     * @return {*} false | Array Returns false on failure, or an array on success.
     * @memberof DataAccess
     */
    async FetchData(url)
    {
        const response = await fetch(url);
        if(response.ok)
        {
            return await response.json();
        }
        else
        {
            return false;
        }
    }

    /**
     * Retrieves a whole array of games from a .json file based on the search criteria and a string with the file's path.
     * Returns an array of objects.
     * @param {string} urlTarget A string with the file's path.
     * @param {string} searchCriteria A string containing the name of the game to search for.
     * @param {string} valorDolar A string/int containing the current price of the (blue) American Dollar.
     * @memberof DataAccess
     */
    async RetrieveGames(urlTarget, searchCriteria, valorDolar)
    {
        try
        {
            const data = await this.FetchData(urlTarget);
        
            if(data !== false)
            {                
                let filters = this.itemSearchFilters.GetFilter(searchCriteria);
                filters.valorDolar = valorDolar;
                let filterFunction = this.FilterData(filters);
                let result = data.filter(filterFunction);
                
                if(result.length > 0)
                {                    
                    return result;
                }
                else
                {
                    return false;
                }
            }            
        }
        catch(error)
        {
            console.error(error);
            return false;
        }    
    }

    /**
     * A simple way to check for a game with no filters other than the name and SKU. Returns the first game that matches (which is also the only one, due to double param check), or false if no game matches.
     * @param {string} urlTarget A string with the file's path.
     * @param {Array} paramsArray A standard JS object with 2 pairs of key-value: name, and SKU.
     * @return {Array | false} 
     * @memberof DataAccess
     */
    async RetrieveGamesLite(urlTarget, paramsArray)
    {             
        try
        {
            const data = await this.FetchData(urlTarget);                               

            if(data !== false)
            {                
                for(let game of data)
                {                    
                    if(paramsArray.name == game.name && game.SKU == paramsArray.SKU) // We check for each game if the name and SKU of both the game and params match.
                    {                                                
                        return game; // We return the mach if there's any.
                    }
                }
            }            
            return false;
        }
        catch(error)
        {
            console.error(error);
        }
    }

    /**     
     * Provides a function to filter the games based on name, price, genre, and console.
     * @param {Array} params
     * @return {bool} 
     * @memberof DataAccess
     */
    FilterData(params)
    {    
        let funct = function(item)
        {
            for(const key in params)
            {
                if(key === 'name')  // WE CHECK IF THE NAME OF THE GAME PARTIALLY MATCHES WITH THE SEARCH STRING
                {
                    let searchValue = params[key].toLowerCase();
                    let itemValue = item[key] ? item[key].toString().toLowerCase() : '';
                    if(!itemValue.includes(searchValue))
                    {
                        return false; // IF IT DOESN'T, THE GAME IS NOT INCLUDED.
                    }
                }
                else if(key === 'price') // WE CHECK IF THERE'S A MIN AND MAX PRICE, AND IF THE GAME'S PRICE IS IN BETWEEN.
                {
                    let [priceMin, priceMax] = params[key];
                    let itemPrice;
                    if(params['valorDolar'] !== false)
                    {
                        itemPrice = item.price * params['valorDolar'];                        
                    }
                    else
                    {
                        itemPrice = item.price;
                    }
                    if( (priceMin && itemPrice < priceMin) || (priceMax && itemPrice > priceMax) )
                    {
                        return false; // IF IT'S NOT, THE GAME IS NOT INCLUDED.
                    }
                }
                else if(key === 'console') // WE CHECK FOR THE OTHER KEYS AND THEIR ARRAYS OF VALUES.
                {
                    let selectedConsole = params[key];
                    if(!selectedConsole.includes(item[key]))
                    {
                        return false; // IF A GAME DOESN'T MATCH WITH SOME OF THE VALUES, IT'S NOT INCLUDED.
                    }
                }
                else if(key === 'type')
                {
                    let selectedGenre = params[key];
                    if(!selectedGenre.includes(item[key]))
                    {
                        return false;
                    }
                }
            }
            return true;
        };
        return funct;
    }
}