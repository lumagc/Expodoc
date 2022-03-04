const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expressions = {
	username: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const inputsCorrect = {
	username: false,
    email: false,
	password: false,
}

const validateForm = (ev) => {
    //Selecciona dependiendo al name del input que ha seleccionado
    switch (ev.target.name) {
        case "username":
            validateInput(expressions.username, ev.target, ev.target.name);
        break;
        case "email":
            validateInput(expressions.email, ev.target, ev.target.name);
        break;
        case "password":
            validateInput(expressions.password, ev.target, ev.target.name)
        break;
        case "passwordrep":
            validatePasswordrep();
        break;
    }
}

const validateInput = (expression, input, nameInput) => {
    //Si se cumple la expresion regular, cambiamos el icono, añadimos el color rojo, y el texto de aviso
    if (expression.test(input.value)) {
        document.querySelector(`#group__${nameInput} i`).style.display = 'inline-block';
        document.getElementById(`group__${nameInput}`).classList.remove('group__incorrect');
        document.getElementById(`group__${nameInput}`).classList.add('group__correct');
        document.querySelector(`#group__${nameInput} i`).classList.add('fa-check-circle');
        document.querySelector(`#group__${nameInput} i`).classList.remove('fa-times-circle');
        document.querySelector(`#group__${nameInput} .message__error`).style.display = 'none'
        //Si el campo esta correctamente rellenado
        inputsCorrect[nameInput]=true;
    } else {
        document.querySelector(`#group__${nameInput} i`).style.display = 'inline-block';
        document.getElementById(`group__${nameInput}`).classList.add('group__incorrect');
        document.getElementById(`group__${nameInput}`).classList.remove('group__correct');
        document.querySelector(`#group__${nameInput} i`).classList.add('fa-times-circle');
        document.querySelector(`#group__${nameInput} i`).classList.remove('fa-check-circle');
        document.querySelector(`#group__${nameInput} .message__error`).style.display = 'block';
        //Si el campo no esta correctamente rellenado
        inputsCorrect[nameInput]=false;
    }
}
//Comparamos que ls contraseñas coincidan
const validatePasswordrep = () => {
    const inputPass = document.getElementById('password');
    const inputPassrep = document.getElementById('passwordrep');
    if (inputPass.value !== inputPassrep.value) {
        document.querySelector('#group__passwordrep i').style.display = 'inline-block';
        document.getElementById('group__passwordrep').classList.add('group__incorrect');
        document.getElementById('group__passwordrep').classList.remove('group__correct');
        document.querySelector('#group__passwordrep i').classList.add('fa-times-circle');
        document.querySelector('#group__passwordrep i').classList.remove('fa-check-circle');
        document.querySelector('#group__passwordrep .message__error').style.display = 'block';
        inputsCorrect['password'] = false;
    } else {
        document.querySelector('#group__passwordrep i').style.display = 'inline-block';
        document.getElementById('group__passwordrep').classList.remove('group__incorrect');
        document.getElementById('group__passwordrep').classList.add('group__correct');
        document.querySelector('#group__passwordrep i').classList.remove('fa-times-circle');
        document.querySelector('#group__passwordrep i').classList.add('fa-check-circle');
        document.querySelector('#group__passwordrep .message__error').style.display = 'none';
        inputsCorrect['password'] = true;
    }
}

//Recorremos los inputs
inputs.forEach((input) => {
    //Cuando se suelte la tecla
    input.addEventListener('keyup', validateForm);
    //Cuando el usuario presione fuera del input llamara a la funcion validacion
    input.addEventListener('blur', validateForm);
})
form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const terms = document.getElementById('terms');
    if (inputsCorrect.username && inputsCorrect.email && inputsCorrect.password && terms.checked) {
        //Limpiamos los campos elimianndo los iconos tambien
        form.reset();
        document.querySelectorAll('i').forEach(icon => icon.style.display = 'none');
        //Mandamos mensaje de todo OK
        document.querySelector('.message__submit-good').style.display = "block";
        setTimeout(()=>{
            document.querySelector('.message__submit-good').style.display = "none";
        }, 3000);
    
    } else {
        //Mandamos mensaje de que el formulario no fue enviado correctamente
        document.querySelector('.message__submit-bad').style.display = "block";
        setTimeout(()=>{
            document.querySelector('.message__submit-bad').style.display = "none";
        }, 3000);
    }
})

