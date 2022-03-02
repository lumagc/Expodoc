"use strict";
let lis = document.querySelectorAll('#navs li');
lis[2].style.backgroundColor = '#8F6B36';

function ver() {
    document.getElementById("subseccion").style.display="block"
}

function verdiv() {
    document.getElementById("subseccion").style.display="block"
}

function ocultardiv() {
    document.getElementById("subseccion").style.display="none"
}
/*--------------Llamadas a la API----------- */
//Controla errores
const handleError = response => {
    if (!response.ok) {
        throw Error(response.status);
    } else {
        return response;
    }
}

const datosLista = (breed) => {
    let listaDesplegable = document.getElementById("subseccion");
    for (const key in breed) {
        console.log(breed[key]["name"]);
        let elementoLista = document.createElement("p");
        elementoLista.textContent = breed[key]["name"];
        listaDesplegable.appendChild(elementoLista)
    }
}

//Llamada a la api para obtener toda las razas
const obtenerNombreRazas = () => {
    fetch(`https://api.thedogapi.com/v1/breeds`)
    .then(handleError)
    .then(response => response.json())
    .then(breeds=>{
        console.log(breeds);
        datosLista(breeds)
    })
    .catch(error=>{
        console.log(error) 
    })
    .finally(()=>{
        console.log("Fin")
    })
}

function muestra_imagen(img){
    let imagen = document.querySelector('.breed-img');
    imagen.setAttribute("src", img["url"]);
}

//llamada para obtener imagenes
const obtenerImagenes = (id_img) =>{
    fetch(`https://api.thedogapi.com/v1/images/${id_img}`)
    .then(handleError)
    .then(response => response.json())
      .then(response=>{
        muestra_imagen(response);
      })
      .catch(error=>{
          console.log(error) 
      })
      .finally(()=>{
          console.log("algoooo")
      })
}  

function obtenerRaza(breed){
    //Selecciona nombre
    let nombre = document.querySelector('.breed-name');
    nombre.textContent = breed["name"];
    //Selecciona detalles
    const caracteristicas = document.querySelector('.breed-details');
    const apartados = caracteristicas.querySelectorAll('p');
    apartados[0].textContent = breed['temperament'];
    apartados[1].textContent = breed['weight']['metric']+" kg.";
    apartados[2].textContent = breed['weight']['imperial']+" cm at the withers.";
    apartados[3].textContent = breed['life_span']+" average life span.";

    //guardamos el id que referencia a la imagen
    let id_imagen = breed["reference_image_id"];
    //Llamamos a la funcion que hara la respectiva llamada a la api para obtener la imagen asociada al perro
    obtenerImagenes(id_imagen);
}


//Llamada a la api para obtener razas por id
const obtenerRazasporId = (num) => {
    fetch(`https://api.thedogapi.com/v1/breeds/${num}`)
    .then(handleError)
    .then(response => response.json())
    .then(response=>{
        obtenerRaza(response)
    })
    .catch(error=>{
        console.log(error)
    })
    .finally(()=>{
        console.log("Fin")
    })
}

let id = 2;
let botonNext = document.querySelector('.breed-img-next');
botonNext.addEventListener("click", () => {
    obtenerRazasporId(id);
    id++;
})

let botonPrev = document.querySelector('.breed-img-prev');
botonPrev.addEventListener("click", () => {
    id--;
    obtenerRazasporId(id);
})

//Inicia programa
obtenerNombreRazas();
obtenerRazasporId(1)

