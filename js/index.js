let lis = document.querySelector('#navs li');
lis.style.backgroundColor = '#8F6B36';

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () =>{
    navMenu.classList.toggle("nav-menu_visible");
    
});

