// Elementos de la página
let opciones = document.getElementById("opciones");
let procedimiento = document.getElementById("procedimiento");
let secBiseccion = document.getElementById("biseccion");
let secNewton = document.getElementById("newton");
let secPuntoFijo = document.getElementById("puntoFijo");
let secSecante = document.getElementById("secante");
let bisResultado = document.getElementById("bisResultado");

// CANVAS
let ancho = 400;            // medidas internas del canvas (px)
let alto = 400;
let escala = 50;            // pixeles por unidad 
let pasoGrilla = 1;         // unidades entre líneas
let paso = 0.1;             // variación de x para el gráfico de la función
let origenX = (ancho / 2);  // posiciones del centro de coordenadas respecto al marco (px)
let origenY = (alto / 2);

let a, b, m, fa, fb, fm, errorCalculado, errorPedido, x_0, x_1;                  // valores para los métodos 
let maxIter = 10;

let xm = ancho / escala;      //dimensiones logicas del marco
let ym = alto / escala;
let x0 = origenX / escala;
let y0 = origenY / escala;

let funcion = "Math.exp(-x)-Math.log(x)";
let derivada = "- Math.exp(-x) - 1 / x";
let metodo = "";

const crearContexto = (canvas) => {
    let cv = document.getElementById(canvas);
    cv.width = ancho;
    cv.height = alto;
    let ctx = canvas1.getContext("2d");
    // ajusto el centro y la escala del canvas
    ctx.translate(origenX, origenY);
    ctx.scale(escala, -escala);
    return ctx;
}

const limpiarCanvas = (ctx) => {
    ctx.clearRect(-x0, -y0, xm, ym);
}

const dibujarEjes = (ctx) => {
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 1 / escala;
    ctx.beginPath();
    ctx.moveTo(0, y0);
    ctx.lineTo(0, y0 - ym);
    ctx.moveTo(-x0, 0);
    ctx.lineTo(xm - x0, 0);
    ctx.closePath();
    ctx.stroke();
}

const dibujarRejilla = (ctx) => {
    ctx.strokeStyle = "#EEE";
    ctx.lineWidth = 1 / escala;
    ctx.beginPath();
    for (let i = - Math.floor(x0); i < xm; i++) {
        ctx.moveTo(-x0 + i, y0);
        ctx.lineTo(-x0 + i, y0 - ym);
    }
    for (let i = - Math.floor(y0); i < ym; i++) {
        ctx.moveTo(-x0, y0 - i);
        ctx.lineTo(xm - x0, y0 - i);
    }
    ctx.closePath();
    ctx.stroke();
}

const dibujarFuncion = (funcion, ctx, color) => {
    limpiarCanvas(ctx);
    dibujarEjes(ctx);
    dibujarRejilla(ctx);
    ctx.strokeStyle = color;
    let x = -x0;
    ctx.beginPath();
    ctx.moveTo(x, eval(funcion));
    for (x = -x0; x < xm; x += paso) {
        ctx.lineTo(x, eval(funcion));
    }

    ctx.stroke();
    ctx.closePath();
    return;
}

const numerarEjes = (ctx) => {

    ctx.save();
    ctx.font = "6pt sans-serif";
    ctx.scale(1 / escala, -1 / escala);
    ctx.fillStyle = "#444";
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.lineWidth = 3 / escala;
    ctx.fillText("-10", -10 * escala, 5);
    ctx.fillText("-10", 10 * escala, 5);
    ctx.beginPath();
    ctx.moveTo(-10 * escala, -0.2 * escala);
    ctx.lineTo(-10 * escala, 0.2 * escala);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
    return;
}

const activarEventos = () => {
    opciones.addEventListener("click", opcionesClick, false);
}

const opcionesClick = (event) => {
    if (event.target.tagName == "INPUT") {
        if (event.target.name == "funcion") {
            funcion = event.target.value;
            derivada = event.target.dataset.der;
            // console.log(funcion);
            dibujarFuncion(funcion, ctx1, "blue");
        } else {
            if (event.target.name = "metodo") {
                metodo = event.target.value;
                // console.log("metodo  ", metodo);
                switch (metodo) {
                    case "biseccion":
                        biseccion();
                        break;
                    case "newton":
                        newton();
                        break;
                    case "puntoFijo":
                        puntoFijo();
                        break;
                    case "secante":
                        secante();
                        break;
                }
            }
        }
    }
}

const bis0 = () => {
    //controla la validez del intervalo
    let bis0 = document.getElementById("bis0");
    bis0.classList.remove("oculto");
    let bis_a = document.getElementById("bis_a");
    let bis_b = document.getElementById("bis_b");
    document.getElementById("bis_error").value = 5;
    let continuar = document.getElementById("bisCont0");
    // continuar.classList.remove("oculto");
    bis_a.value = "";
    bis_b.value = "";

    let sigue_a = false;
    let sigue_b = false;
    continuar.addEventListener("click", () => {
        bisResultado.innerHTML = "<p><strong>Cálculos</strong></p>";

        if (bis_a.value != "" && !isNaN(bis_a.value)) {
            a = parseFloat(bis_a.value);
            sigue_a = true;
        } else {
            sigue_a = false;
        }
        if (bis_b.value != "" && !isNaN(bis_b.value)) {
            b = parseFloat(bis_b.value);
            sigue_b = true;
        } else {
            sigue_b = false;
        }
        if (!sigue_a || !sigue_b) {
            alert("los valores del intervalo deben ser numéricos");
        } else {
            x = a;
            fa = eval(funcion);
            x = b;
            fb = eval(funcion);
            // console.log("fa = ", fa, " ; fb = ", fb);
            // document.getElementById("bisFiniciales").innerHTML = `f(a)=${fa}; &nbsp; f(b)=${fb}`;
            if (fa * fb == 0) {
                if (fa == 0) {
                    salida.innerHTML = `Se encontró una solución exacta para a = ${a}`;
                    bis0.appendChild(salida);
                }
                if (fb == 0) {
                    salida.innerHTML = `Se encontró una solución exacta para a = ${b}`;
                    bis0.appendChild(salida);
                }
            } else {
                if (fa * fb < 0) {
                    // continuar.classList.add("oculto");
                    bis1();
                } else {
                    alert("La función tiene el mismo signo en los dos extremos del intervalo\nCambie los valores");
                }
            }
        }
    });
}
const bis1 = () => {
    //repite hasta error < E o número de repeticiones = máximo
    let i = 1;                                                  //iteración
    errorPedido = document.getElementById("bis_error").value;
    errorCalculado = 200;                                         //valor inicial para el while

    bisResultado.classList.remove("oculto");
    while (i <= maxIter && errorCalculado > errorPedido) {
        let p0 = document.createElement("p");
        p0.innerHTML = `iteración ${i}`;
        m = (a + b) / 2;
        x = m;
        let p1 = document.createElement("p");
        p1.innerHTML = `m=(a + b)/2 = (${a} + ${b})/2 = ${m}`
        fm = eval(funcion);
        let fa_red = Math.round(fa * 10000) / 10000;
        let fb_red = Math.round(fb * 10000) / 10000;
        let fm_red = Math.round(fm * 10000) / 10000;

        let p2 = document.createElement("p");
        p2.innerHTML = `f(m)=${fm_red};&nbsp;f(a)=${fa_red};&nbsp;f(b)=${fb_red}`;
        let p3 = document.createElement("p");
        if (fa * fm < 0) {
            b = m;
            errorCalculado = Math.round(Math.abs((m - a) / m) * 100000) / 1000;
            p3.innerHTML = "b = m <br>";
            p3.innerHTML += `errorCalculado =|(m - a) * 100 / m | = <br><span class="margen3"> = (${m} - ${a}) *100 /${m} =`;

        } else {
            a = m;
            errorCalculado = Math.round(Math.abs((m - b) / m) * 100000) / 1000;
            p3.innerHTML = "a = m <br>";
            p3.innerHTML += `errorCalculado =|(m - b) * 100 / m | = <br><span class="margen3"> = (${m} - ${b}) *100 /${m} =`;
        }
        let errorCalc_red = Math.round(errorCalculado * 100000) / 100000;
        if (errorCalculado <= errorPedido) {
            p3.innerHTML += `<span class="resaltado">${errorCalc_red} %</span></span><br>`;
            p3.innerHTML += `<span class="margen3 resaltado">raiz = ${m}</span><br><hr>`
        } else {
            p3.innerHTML += `${errorCalc_red} %</span><br><hr>`;
        }
        bisResultado.appendChild(p0);
        bisResultado.appendChild(p1);
        bisResultado.appendChild(p2);
        bisResultado.appendChild(p3);
        i++;
    }
}

const biseccion = () => {
    secNewton.classList.add("oculto");
    secSecante.classList.add("oculto");
    secPuntoFijo.classList.add("oculto");
    secBiseccion.classList.remove("oculto");

    if (funcion == "") {
        alert("Debe elegir una función");
    } else {
        bis0();
    }
}

const newton0 = () => {
    //controla el ingreso de valores
    let new0 = document.getElementById("new0");
    new0.classList.remove("oculto");
    let new_x0 = document.getElementById("new_x0");
    document.getElementById("new_error").value = 5;
    let continuar = document.getElementById("newCont0");
    new_x0.value = "";

    let sigue = false;
    continuar.addEventListener("click", () => {
        newResultado.innerHTML = "<p><strong>Cálculos</strong></p>";

        if (new_x0.value != "" && !isNaN(new_x0.value)) {
            x_0 = parseFloat(new_x0.value);
            newton1();
        } else {
            alert("los valores ingresados deben ser numéricos");
        }
    });
}

const newton1 = () => {
    //repite hasta error < E o número de repeticiones = máximo
    let i = 0;                                                  //iteración
    let f, d;
    errorPedido = document.getElementById("new_error").value;
    errorCalculado = 200;                                         //valor inicial para el while

    newResultado.classList.remove("oculto");
    while (i <= maxIter && errorCalculado > errorPedido) {
        let p0 = document.createElement("p");
        p0.innerHTML = `iteración ${i}`;
        x = x_0;
        f = eval(funcion);
        d = eval(derivada);
        x_1 = x - f / d;
        let f_red = Math.round(f * 10000) / 10000;
        let d_red = Math.round(d * 10000) / 10000;
        let x_0_red = Math.round(x_0 * 10000) / 10000;
        let x_1_red = Math.round(x_1 * 10000) / 10000;

        let p1 = document.createElement("p");
        p1.innerHTML = `x<sub>${i + 1}</sub>  = x<sub>${i}</sub> - f(x<sub>${i}</sub>) / f'(x<sub>${i}</sub>) = ${x_0_red} - ${f_red} / ${d_red} = ${x_1_red}`;

        let p2 = document.createElement("p");

        errorCalculado = Math.abs((x_1 - x_0) / x_1) * 100;
        let errorCalc_red = Math.round(errorCalculado * 100000) / 100000;
        p2.innerHTML += `errorCalculado =|(x<sub>${i + 1}</sub> - x<sub>${i}</sub>) * 100 / x<sub>${i + 1}</sub> | = <br><span class="margen3"> = (${x_1_red} - ${x_0_red}) *100 /${x_1_red} =`;
        if (errorCalculado <= errorPedido) {
            p2.innerHTML += `<span class="resaltado">${errorCalc_red} %</span></span><br>`;
            p2.innerHTML += `<span class="margen3 resaltado">raiz = ${x_1}</span><br><hr>`
        } else {
            p2.innerHTML += `${errorCalc_red} %</span><br><hr>`;
        }
        newResultado.appendChild(p0);
        newResultado.appendChild(p1);
        newResultado.appendChild(p2);

        x_0 = x_1;
        i++;
    }
}

const newton = () => {
    secBiseccion.classList.add("oculto");
    secSecante.classList.add("oculto");
    secPuntoFijo.classList.add("oculto");
    secNewton.classList.remove("oculto");
    if (funcion == "") {
        alert("Debe elegir una función");
    } else {
        newton0();
    }
}

const puntoFijo0 = () =>{
    return;
}

const puntoFijo = () => {
    secBiseccion.classList.add("oculto");
    secNewton.classList.add("oculto");
    secSecante.classList.add("oculto");
    secPuntoFijo.classList.remove("oculto");
    if (funcion == "") {
        alert("Debe elegir una función");
    } else {
        puntoFijo0();
    }


}

const secante = () => {
    secBiseccion.classList.add("oculto");
    secNewton.classList.add("oculto");
    secPuntoFijo.classList.add("oculto");
    secSecante.classList.remove("oculto");

}
const iniciar = () => {
    // let inputFuncion = document.getElementsByName("funcion");
    // for (let i of inputFuncion) { i.checked = false }
    document.getElementById("f1").checked = true;
    let inputMetodo = document.getElementsByName("metodo");
    for (let i of inputMetodo) { i.checked = false }



    dibujarEjes(ctx1);
    dibujarRejilla(ctx1);
    // numerarEjes(ctx1);
    dibujarFuncion(funcion, ctx1, "darkblue");

    activarEventos();
}

let ctx1 = crearContexto("canvas1");

iniciar();



















// dibujarFuncion("2*x**2+1", ctx1, "green");
// dibujarFuncion("2*x^3+1", ctx1, "red");     //CUIDADO CON ESTO  ^ = XOR 
// dibujarFuncion("2*Math.sin(x)+1", ctx1, "blue");
// dibujarFuncion("x*Math.sin(x)", ctx1, "red");
// dibujarFuncion("Math.exp(-x)-Math.log(x)", ctx1, "blue");


