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
        if(!ValidateFields())
        {
            errorMessageField.style.visibility = 'unset';
        }
        else
        {
            errorMessageField.style.visibility = 'hidden';
        }
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