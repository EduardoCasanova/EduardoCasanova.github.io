
// Elementos de la página
let entrada = document.getElementById("entrada");
let renderBtn = document.getElementById("renderBtn");
let borrarBtn = document.getElementById("borrarBtn");
let salida = document.getElementById("salida");
let ejemplosBtn = document.getElementById("ejemplosBtn");
let usoBtn = document.getElementById("usoBtn");
let copiarBtn = document.getElementById("copiarBtn");
let listaEjemplos = document.getElementById("listaEjemplos");
let uso = document.getElementById("uso");
let mensajes = document.getElementById("mensajes");
let descripcion = document.getElementById("descripcion");
let guardar = document.getElementById("guardarBtn");


// Variables globales
let ejemplos;

// Funciones
const graficar = () => {
    salida.innerHTML = "";
    var diagram = flowchart.parse(entrada.value);
    diagram.drawSVG('salida', {
        'yes-text': 'V',
        'no-text': 'F',
        'line-length': 50,
    });
};
const mostrarMensaje = (msg) => {
    mensajes.innerHTML = msg;

    mensajes.classList.remove("oculto");
    mensajes.classList.add("mostrar");
    setTimeout(() => { mensajes.classList.remove("mostrar") }, 500);
    setTimeout(() => {
        mensajes.classList.add("oculto")
        mensajes.innerHTML = "";
    }, 2000);
};

// Eventos
renderBtn.addEventListener('click', graficar);


borrarBtn.addEventListener('click', () => {
    entrada.value = "";
});

copiarBtn.addEventListener("click", function (event) {
    event.preventDefault();
    entrada.select();
    document.execCommand("copy");
    entrada.selectionEnd = entrada.selectionStart;
    mostrarMensaje("Copiado al portapapeles");
});

ejemplosBtn.addEventListener("click", () => {
    if (ejemplosBtn.classList.contains("boton-activo")) {
        ejemplosBtn.classList.remove("boton-activo");
        contEjemplos.classList.add("oculto");
    } else {
        descripcion.innerHTML = "";
        ejemplosBtn.classList.add("boton-activo");
        contEjemplos.classList.remove("oculto");
        if (usoBtn.classList.contains("boton-activo")) {
            usoBtn.classList.remove("boton-activo");
            uso.classList.add("oculto");
        }
    }
});
usoBtn.addEventListener("click", () => {
    if (usoBtn.classList.contains("boton-activo")) {
        usoBtn.classList.remove("boton-activo");
        uso.classList.add("oculto");
    } else {
        usoBtn.classList.add("boton-activo");
        uso.classList.remove("oculto");
        if (ejemplosBtn.classList.contains("boton-activo")) {
            ejemplosBtn.classList.remove("boton-activo");
            contEjemplos.classList.add("oculto");
        }
    }
});


listaEjemplos.addEventListener("mouseover", (event) => {
    if (event.target.dataset.ejemplo) {
        descripcion.innerHTML = ejemplos[event.target.dataset.ejemplo].descripcion;
        descripcion.classList.remove("oculto");
    }
});

listaEjemplos.addEventListener("mouseleave", () => {
    ejemplosBtn.classList.remove("boton-activo");
    contEjemplos.classList.add("oculto");
});

listaEjemplos.addEventListener('click', (event) => {
    if (event.target.dataset.ejemplo) {
        entrada.value = "";
        for (linea of ejemplos[event.target.dataset.ejemplo].codigo) {
            entrada.value += linea;
            entrada.value += '\n';
        }
        ejemplosBtn.classList.remove("boton-activo");
        contEjemplos.classList.add("oculto");
        // setTimeout(graficar(), 1000);
        // graficar();
        renderBtn.click();
    }
});

guardar.addEventListener("click", () =>{
    let blob = new Blob([entrada.value]);
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, "diagrama.txt");
    }
    else {
        var a = window.document.createElement("a");
        a.href = window.URL.createObjectURL(blob, {
            type: "text/plain"
        });
        a.download = "diagrama.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
})


// ------------------------------------------------------------------------------------------
const inicio = () => {
    listaEjemplos.innerHTML = "";
    for (let i = 0; i < ejemplos.length; i++) {
        listaEjemplos.innerHTML += `<p data-ejemplo="${i}">${ejemplos[i].nombre}</p>`;
    }
    graficar();
};

const fetchdata = () => {
    fetch("./recursos/ejemplos.json")
        .then(resp => resp.json())
        .then(json => {
            ejemplos = json;
            inicio()
        })
        .catch(err => {
            console.log(err);
            alert("No se pudieron cargar los ejemplos");
            inicio();
        });
};

fetchdata();