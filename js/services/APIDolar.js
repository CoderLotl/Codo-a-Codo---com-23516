/**
 * Does a GET fetch() to the API DolarAPI [ 'https://dolarapi.com/v1/dolares' ].
 * Returns the value of the Blue Dollar on success, false on failure. 
 * @export
 * @return {string | false} 
 */
export async function GetDollarValue()
{
    const response = await fetch( 'https://dolarapi.com/v1/dolares',
    {
        method: 'GET',
        headers:
        {
            'Accept': 'application/json',
        }
    });
    if(response.ok)
    {
        const data = await response.json();    
        return data[1]['venta'];
    }
    else
    {
        return false;
    }
}