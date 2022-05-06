vista1 = {
    // vista1: document.getElementById("vista1"),
    generada: false,
    mostrar: function () {
        console.log("mostrando vista 1");
        // si es la primera vez que se ingresa a la vista la genera, sino actualiza todos los datos
        if (!this.generada) {
            this.generar();
            this.generada = true;
        } else {
            this.actualizarTodo();
        }
        this.controlarEventos();
    },

    generar: () => {
        //genera la estructura HTML y muestra los primeros datos
        console.log("generando la vista 1");
        let contenido = document.querySelectorAll("#vista1 #contenido")[0];
        // si ya existe contenido no hace nada
        if (contenido.innerHTML == "") {
            let fragment = document.createDocumentFragment();
            let i = 0;
            let n = controladores1.cantidadDatos();
            while (i < n) {                                         //filas
                let fila = document.createElement("div");
                fila.classList.add("fila");
                for (j = 0; j < 2 && i + j < n; j++) {              //columnas
                    let dato = controladores1.leerDatos(i + j);
                    let cont = document.createElement("div");
                    cont.classList.add("cont");
                    let div = document.createElement("div");
                    div.classList.add("cont_dato");
                    div.id = "cont_dato" + (i + j);
                    let etiq = document.createElement("p");
                    etiq.classList.add("etiqueta");
                    etiq.textContent = dato.nombre;
                    div.appendChild(etiq);
                    let valor = document.createElement("p");
                    valor.classList.add("valor");
                    valor.id = "valor" + (i + j);
                    valor.innerHTML = `${dato.valor}<span class="unidad">${dato.unidad}</span>`;
                    div.appendChild(valor);
                    if (dato.minimo) {
                        let min = document.createElement("p");
                        min.classList.add("extremo");
                        min.textContent = "mín: " + dato.minimo;
                        div.appendChild(min);
                        if (dato.valor < dato.minimo) {
                            div.classList.add("alerta");
                        }
                    }
                    if (dato.maximo) {
                        let max = document.createElement("p");
                        max.classList.add("extremo");
                        div.appendChild(max);
                        max.textContent = "máx: " + dato.maximo;
                        if (dato.valor > dato.maximo) {
                            div.classList.add("alerta");
                        }
                    }
                    cont.appendChild(div);
                    // CONTROLES
                    let controles = document.createElement("div");
                    controles.classList.add("controles");
                    let controlSubir = document.createElement("div");
                    controlSubir.classList.add("controlSubir");
                    if (dato.control_subir == "true") {
                        controlSubir.classList.add("boton");
                        controlSubir.innerHTML = "<p>&#10506</p>";
                        controlSubir.dataset.parametro = i + j;
                    }
                    let controlBajar = document.createElement("div");
                    controlBajar.classList.add("controlBajar");
                    if (dato.control_bajar == "true") {
                        controlBajar.classList.add("boton");
                        controlBajar.innerHTML = "<p>&#10507</p>";
                        controlBajar.dataset.parametro = i + j;
                    }
                    controles.appendChild(controlSubir);
                    controles.appendChild(controlBajar);
                    cont.appendChild(controles);
                    fila.appendChild(cont);
                }
                i += 2;
                fragment.appendChild(fila);
            }
            contenido.appendChild(fragment);
        };
    },

    actualizar: (i, dato) => {
        // actualiza la vista del elemento "elem" 
        // cada vez que los controladores informan de un cambio en los datos del modelo.
        // controla que el valor esté en rango aceptable (entre el mínimo y el máximo)

        let id = "valor" + i;
        let valor = document.getElementById(id);
        valor.innerHTML = `${dato.valor}<span class="unidad">${dato.unidad}</span>`;
        if (dato.minimo && dato.valor < dato.minimo || dato.maximo && dato.valor > dato.maximo) {
            valor.parentElement.classList.add("alerta");
        } else {
            valor.parentElement.classList.remove("alerta");
        }
    },

    actualizarTodo: function () {
        for (let i = 0; i < controladores1.cantidadDatos(); i++) {
            this.actualizar(i, controladores1.leerDatos(i));
        }
    },

    controlarEventos: () => {
        let contenido = document.querySelectorAll("#vista1 #contenido")[0];
        contenido.addEventListener("click", (event) => {
            if (event.target.parentElement.dataset.parametro) {
                if (event.target.parentElement.classList.contains("controlSubir")){
                    controladores1.cambiar(event.target.parentElement.dataset.parametro, "subir")
                } else {
                    controladores1.cambiar(event.target.parentElement.dataset.parametro, "bajar")
                }
            }
        });
    }
}