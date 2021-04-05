let controladores1 = {
    cantidadDatos: () => {
        return datos.getCantidad();
    },
    leerDatos: (i) => {
        return datos.getItem(i)
    },
    cambio: (i) => {
        vista1.actualizar(i, datos.getItem(i));
    },
    cambiar: (i, sentido) => {
        if (sentido == "subir") {
            datos.subir(i);
        } else {
            datos.bajar(i);
        }
    }
};





