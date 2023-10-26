let nombre;
let email;
let mensaje;
let errorMessageField;

//#region [ EVENT LISTENER ]
document.addEventListener('DOMContentLoaded', ()=>
{
    errorMessageField = document.getElementById('errorMessage');
    document.getElementById('formContacto').addEventListener('submit', (e)=>
    {
        const dialog = document.getElementById('dialog');
        const btnBuyItem = document.getElementById('buyItem');
        const btnClose = document.getElementById('btnClose');
    
        btnClose.addEventListener('click', function()
        {
            dialog.style.display = '';
            dialog.close();        
        });
        
        nombre = document.getElementById('name').value;
        email = document.getElementById('email').value;
        mensaje = document.getElementById('message').value;
        if(!ValidateFields())
        {
            errorMessageField.style.visibility = 'unset';
        }
        else
        {
            errorMessageField.style.visibility = 'hidden';
            dialog.open = true;        
            document.getElementById('dialog').style.display = 'flex';
        }
        e.preventDefault();
    });
});
//#endregion [ EVENT LISTENER ]

//#region [ FUNCTIONS ]
/**
 * Uses a regular expresion to test the value of the variable 'nombre'.
 * Returns true if passes, false if not.
 * @return {bool} 
 */
function ValidateName()
{
    return /^[A-Za-z]+$/.test(nombre);
}

/**
 * Uses a regular expresion to test the value of the variable 'email', using the standard structure of an email address.
 * Returns true if passes, false if not.
 * @return {bool} 
 */
function ValidateEmail()
{
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

/**
 * Trims the content of the variable 'mensaje' and checks if the content is blank.
 * Returns true if it's not blank, false if it is.
 * @return {bool} 
 */
function ValidateMessage()
{
    return mensaje.trim() === '' ? false : true;
}

/**
 * Runs the validation on every field and collects the amount of errors. Clears any previous error message content and fills it again
 * with the messages of the current errors.
 * Returns true if there are no errors, and false if there's an error at any of the fields.
 * @return {bool} 
 */
function ValidateFields()
{
    let errors = [];
    errors.push(ValidateName());
    errors.push(ValidateEmail());
    errors.push(ValidateMessage());

    errorMessageField.innerHTML = '';
    let errorList = document.createElement('ul');
    errorMessageField.appendChild(errorList);

    if(errors[0] === false)
    {
        errorList.appendChild(document.createElement('li')).textContent = 'Error: debe ingresar un nombre válido.';
    }
    if(errors[1] === false)
    {
        errorList.appendChild(document.createElement('li')).textContent = 'Error: debe ingresar un mail válido.';
    }
    if(errors[2] === false)
    {
        errorList.appendChild(document.createElement('li')).textContent = 'Error: debe ingresar algún mensaje.';
    }

    return errors.every(error => error);
}
//#endregion [ FUNCTIONS ]