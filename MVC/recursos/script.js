// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
//      ELEMENTOS DE LA PAGINA
// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
let menuPrincipal = document.getElementById("menu_principal");
let menuPrincipalItems = document.querySelectorAll("#menu_principal p");
let seccionesItems = [];
seccionesItems.push(document.getElementById("teoria"));
seccionesItems.push(document.getElementById("ejemplo1"));
seccionesItems.push(document.getElementById("ejemplo2"));
seccionesItems.push(document.getElementById("analisis"));
seccionesItems.push(document.getElementById("ejercicios"));
let data_over = document.getElementsByClassName("data-over");
let mensaje = document.getElementById("mensaje");
let menuVistas = document.getElementById("menu_vistas");
let menuVistasItems = document.querySelectorAll("#menu_vistas p");
let vistasItems = [];
vistasItems.push(document.getElementById("vistasDescripcion"));
vistasItems.push(document.getElementById("vista1"));
vistasItems.push(document.getElementById("vista2"));

// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
//      EVENTOS   
// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
const eventos = () => {
    menuPrincipal.addEventListener('click', menuPrincipal_click);
    menuVistas.addEventListener('click', menuVistas_click);
    for (let i = 0; i < data_over.length; i++) {
        data_over[i].addEventListener("mouseover", mensaje_over);
        data_over[i].addEventListener("mouseleave", mensaje_leave);
    }
}
const menuPrincipal_click = (event) => {
    if (event.target.dataset.item) {
        if (event.target.classList.contains("boton_activo")) {
            event.target.classList.remove("boton_activo");
            seccionesItems[event.target.dataset.item].classList.add("oculto");
        } else {
            let i = 0;
            for (let item of menuPrincipalItems) {
                item.classList.remove("boton_activo");
                seccionesItems[i++].classList.add("oculto");
            }
            event.target.classList.add("boton_activo");
            seccionesItems[event.target.dataset.item].classList.remove("oculto");
        }
    }
};
const mensaje_over = (event) => {
    mensaje.style.setProperty("top", event.clientY + "px");
    mensaje.style.setProperty("left", event.clientX + "px");
    mensaje.innerHTML = `<p>${event.target.dataset.over}</p>`;
    mensaje.classList.remove("oculto");
};
const mensaje_leave = () => {
    mensaje.classList.add("oculto");
};
const menuVistas_click = (event) => {
    if (event.target.dataset.item) {
        if (event.target.classList.contains("boton_activo")) {
            // si presiono el botón activo lo desactivo junto a la vista correspondiente
            event.target.classList.remove("boton_activo");
            vistasItems[event.target.dataset.item].classList.add("oculto");
        } else {
            let i = 0;
            for (let item of menuVistasItems) {
                item.classList.remove("boton_activo");
                vistasItems[i++].classList.add("oculto");
            }
            event.target.classList.add("boton_activo");
            vistasItems[event.target.dataset.item].classList.remove("oculto");
        }
        switch (event.target.dataset.item) {
            case "0":
                break;
            case "1":
                controladores = Object.assign({}, controladores1);
                console.log("elegida vista 1");
                vista1.mostrar();
                break;
            case "2":
                controladores = Object.assign({}, controladores2);
                console.log("elegida vista 2");
                vista2.mostrar();  
                break;
        }
        if (event.target.dataset.item != 0) {
            // la primera vez que ingreso a una vista comienza la simulación de captura de datos
            if (!datos.cambiando) {
                let intervalId = setInterval(datos.cambiarValores, 2000);
                datos.cambiando = true;
            }
        }
    }
};

eventos();

