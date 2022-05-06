vista2 = {
    // vista1: document.getElementById("vista1"),
    generada: false,
    ctx: [],

    mostrar: function () {
        console.log("mostrando vista 2");
        // si es la primera vez que se ingresa a la vista la genera, sino actualiza todos los datos
        if (!this.generada) {
            this.generar();
            this.generada = true;
        } else {
            this.actualizarTodo();
        }
        // this.controlarEventos();
    },

    generar: function () {
        let contenido = document.querySelectorAll("#vista2 #contenido")[0];
        if (contenido.innerHTML == "") {
            let fragment = document.createDocumentFragment();
            let n = controladores2.cantidadDatos();
            let canvas = [];
            for (let i = 0; i < n; i++) {
                canvas[i] = document.createElement("canvas");
                contenido.appendChild(canvas[i]);
                canvas[i].id = "canvas" + i;
                canvas[i].width = 250;
                canvas[i].height = 200;
                this.ctx[i] = canvas[i].getContext("2d");
                this.dibujar(i);
            }
        }
    },

    dibujar: function (i) {
        let dato = controladores2.leerDatos(i);
        let rango = dato.fin - dato.inicio;
        let ang_ini = 2.36;
        let ang_fin = 7.07;
        let rango_ang = ang_fin - ang_ini;
        let ang_val = ang_ini + (dato.valor - dato.inicio) * (rango_ang) / rango;
        let ang_min = ang_ini + (dato.minimo - dato.inicio) * (rango_ang) / rango;
        let ang_max = ang_ini + (dato.maximo - dato.inicio) * (rango_ang) / rango;

        with (this.ctx[i]) {

            clearRect(0, 0, 250, 200);
            strokeStyle = "black";
            lineWidth = 1;
            beginPath();
            arc(100, 100, 90, ang_ini, ang_fin);
            arc(100, 100, 80, ang_fin, ang_ini, true);
            closePath();
            stroke();

            if (!Number.isNaN(ang_max)) {
                strokeStyle = "red";
                lineWidth = 8;
                beginPath();
                arc(100, 100, 85, ang_max, ang_fin);
                stroke();
                closePath();
            }

            if (!Number.isNaN(ang_min)) {
                strokeStyle = "red";
                lineWidth = 8;
                beginPath();
                arc(100, 100, 85, ang_ini, ang_min);
                stroke();
                closePath();
            }

            // AGUJA
            strokeStyle = "blue";
            lineWidth = 4;
            lineCap = "round";
            beginPath();
            moveTo(100, 100);
            arc(100, 100, 5, 0, 6.28);
            moveTo(100, 100);
            arc(100, 100, 95, ang_val, ang_val);
            stroke();
            closePath();

            // Marco valor
            strokeStyle = "black";
            lineWidth = 1;
            beginPath();
            moveTo(70, 40);
            lineTo(130, 40);
            arc(130, 60, 20, 4.71, 1.57);
            lineTo(70, 80);
            arc(70, 60, 20, 1.57, 4.71);
            closePath();
            stroke();

            // Valor
            textAlign = "center";
            fillStyle = "black";
            font = "small-caps bold 30px Helvetica, Arial, sans-serif";
            // fillText(String text, float x, float y,float max)
            fillText(dato.valor, 100, 70);

            // Etiquetas
            font = "bold 20px Helvetica, Arial, sans-serif";
            fillText(dato.nombre, 100, 140, 120);
            fillText(dato.unidad, 100, 160, 120);
        }
    },

    actualizarTodo: function () {
        for (let i = 0; i < controladores2.cantidadDatos(); i++) {
            this.dibujar(i);
        }
    },

}