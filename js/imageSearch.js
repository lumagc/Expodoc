let lis = document.querySelectorAll('#navs li');
lis[3].style.backgroundColor = '#8F6B36';

let div = document.querySelectorAll('.breed-container')
let box = document.querySelector('.votes-content');


div.forEach(element => {
    element.addEventListener("mouseover", () => {
        element.querySelector('.dog-likes-dislikes').style.display = "flex";
    })
    element.addEventListener("mouseout", () => {
        element.querySelector('.dog-likes-dislikes').style.display = "none";
    })
});

//<--------Llamada a la API--------->

const handleError = response => {
    if (!response.ok) {
        throw Error(response.status);
    } else {
        return response;
    }
}

const obtenerImagen = (img, posicion) =>{
    const imagen = document.querySelectorAll('.dog-image');
    imagen[posicion].setAttribute("src", img["url"])
}

//llamada para obtener imagenes
const llamadaImagenes = (id_img, posicion) =>{
    fetch(`https://api.thedogapi.com/v1/images/${id_img}`)
    .then(handleError)
    .then(response => response.json())
      .then(response=>{
        obtenerImagen(response, posicion);
      })
      .catch(error=>{
          console.log(error) 
      })
      .finally(()=>{
          console.log("algoooo")
      })
}  

const obtenerRazaAleatoria = (breed, posicion) =>{
    //Guardar id de la imagen asociada a la raza
    let id_imagen = breed["reference_image_id"];
    if(id_imagen === undefined){
        console.log("no tiene imagen");
        const imagen = document.querySelectorAll('.dog-image');
        imagen[posicion].setAttribute("src", "img/imagenes/perroSinImagen.jpg")
    }else{
        llamadaImagenes(id_imagen, posicion);
    }

    const nameBreed = document.querySelectorAll('.dog-name');
    nameBreed[posicion].textContent = breed["name"];
}

//llamada a la API para obtener razas (172 razas)
const llamadaRazas = (num, index) => {
    fetch(`https://api.thedogapi.com/v1/breeds/${num}`)
    .then(handleError)
    .then(response => response.json())
    .then(response=>{
        //console.log(response);
        obtenerRazaAleatoria(response, index)
    })
    .catch(error=>{
        console.log(error) 
    })
    .finally(()=>{
        console.log("Fin")
    })
}


let num=0;

function imprimeRazas(){
    for (let i=0; i<9; i++) {
        num++;  
        llamadaRazas(num, i);
    }  
}

let botonNext = document.querySelector('.next');
botonNext.addEventListener("click", imprimeRazas)

let botonPrev = document.querySelector('.prev');
botonPrev.addEventListener("click", funcion = () =>{
    num = num-(9+9);
    imprimeRazas();
})

//Comienza programa
imprimeRazas();




