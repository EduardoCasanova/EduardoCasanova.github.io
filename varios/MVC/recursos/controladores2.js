let controladores2 = {
    cantidadDatos: () => {
        return datos.getCantidad();
    },
    leerDatos: (i) => {
        return datos.getItem(i)
    },
    cambio: (i) => {
        vista2.dibujar(i);
    },
    cambiar: (i, sentido) => {
        if (sentido == "subir") {
            datos.subir(i);
        } else {
            datos.bajar(i);
        }
    }
};





