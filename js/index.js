document.addEventListener("DOMContentLoaded", LoadPSGames);

async function LoadPSGames()
{
    const games = document.getElementById('games');

    try
    {
        const response = await fetch("./playstation.txt");

        if(!response.ok)
        {
            console.log('ERROR');
        }
        else
        {
            console.log('file read');            
        }

        content = await response.text();
        console.log(content);

        for(let i = 0; i < 3; i++)
        {
            const article = document.createElement("article");
            article.textContent = content;
            article.setAttribute('class', 'game-article');
            games.appendChild(article);
        }
    }
    catch
    {
        console.error("Error:", error);
    }
}