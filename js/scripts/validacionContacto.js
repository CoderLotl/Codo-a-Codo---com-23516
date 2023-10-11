let nombre;
let email;
let mensaje;
let errorMessageField;

document.addEventListener('DOMContentLoaded', ()=>
{
    errorMessageField = document.getElementById('errorMessage');
    document.getElementById('formContacto').addEventListener('submit', (e)=>
    {        
        nombre = document.getElementById('name').value;
        email = document.getElementById('email').value;
        mensaje = document.getElementById('message').value;
        ValidateFields();        
        e.preventDefault();
    });
});

function ValidateName()
{
    return /^[A-Za-z]+$/.test(nombre);
}

function ValidateEmail()
{
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function ValidateMessage()
{
    return mensaje.trim() === '' ? false : true;
}

function ValidateFields()
{
    let errors = [];
    errors.push(ValidateName());
    errors.push(ValidateEmail());
    errors.push(ValidateMessage());

    errorMessageField.innerHTML = '';

    if(errors[0] === false)
    {
        errorMessageField.innerHTML += `<li>Error: debe ingresar un nombre valido.</li>`;        
    }    

    return errors.every(error => error);
}