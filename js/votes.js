let lis = document.querySelectorAll('#navs li');
lis[1].style.backgroundColor = '#8F6B36';

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () =>{
    navMenu.classList.toggle("nav-menu_visible");
    
});
/*<---------------Llamada a la API-------------->*/
//Controla errores
const handleError = response => {
    if (!response.ok) {
        throw Error(response.status);
    } else {
        return response;
    }
}

function muestra_imagen(img){
    let imagen = document.querySelector('.img-perro');
    imagen.setAttribute("src", img["url"]);
}

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
    //guardamos el id que referencia a la imagen
    let id_imagen = breed["reference_image_id"];
    console.log(id_imagen);
    //Verificamos si el perro tiene una imagen asociada y sino le ponemos una por defecto
    if(id_imagen === undefined){
        let imagen = document.querySelector('.img-perro');
        imagen.setAttribute("src", "img/imagenes/perroSinImagen.jpg")
    }else{
        obtenerImagenes(id_imagen);
    }
}

//Llamada a la api para obtener razas por id
const obtenerRazasporId = (num) => {
    fetch(`https://api.thedogapi.com/v1/breeds/${num}`)
    .then(handleError)
    .then(response => response.json())
    .then(response=>{
        console.log(response);
        obtenerRaza(response)
    })
    .catch(error=>{
        console.log(error)
    })
    .finally(()=>{
        console.log("Fin")
    })
}
//Generamos un numero aleatorio entre las razas
function generarIdAleatorio(){
    return Math.floor(Math.random() * (172 - 1)) + 1;
} 

//Seleccionamos botones de like y dislike
let botones = document.querySelector('.voting__buttons');
let botonLikeDislike = botones.querySelectorAll('button');

//Haciendo click en like o dislike se mostrara otra raza aleatoria
botonLikeDislike[0].addEventListener("click", () => {
    let id_aleatorio = generarIdAleatorio();
    obtenerRazasporId(id_aleatorio);
});
botonLikeDislike[1].addEventListener("click", () => {
    let id_aleatorio = generarIdAleatorio();
    obtenerRazasporId(id_aleatorio);
});

//Iniciamos el programa con la raza 114
obtenerRazasporId(114);
