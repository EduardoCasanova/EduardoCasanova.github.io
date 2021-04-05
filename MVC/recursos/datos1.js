let datos = {
    "data": [
        {
            "nombre": "presión 1",
            "valor": "7",
            "unidad": "atm",
            "minimo": "3",
            "maximo": "8",
            "inicio": "1",
            "fin": "10",
            "control_subir": "true",
            "control_bajar": "true",
            "descripcion": "",
        },
        {
            "nombre": "temperatura 1",
            "valor": "305",
            "unidad": "°C",
            "minimo": "250",
            "maximo": "450",
            "inicio": "200",
            "fin": "500",
            "control_subir": "true",
            "control_bajar": "false",
            "descripcion": "",
        },
        {
            "nombre": "presión 2",
            "valor": "16",
            "unidad": "atm",
            "minimo": "5",
            "maximo": "15",
            "inicio": "2",
            "fin": "20",
            "control_subir": "true",
            "control_bajar": "true",
            "descripcion": "",
        },
        {
            "nombre": "temperatura 2",
            "valor": "415",
            "unidad": "°C",
            "minimo": "300",
            "maximo": "600",
            "inicio": "200",
            "fin": "700",
            "control_subir": "false",
            "control_bajar": "true",
            "descripcion": "",
        },
        {
            "nombre": "caudal de salida",
            "valor": "300",
            "unidad": "l/h",
            "inicio": "5",
            "fin": "500",
            "descripcion": "",
        },
    ],
    cambiando: false,
    verificar: function (n, valor) {
        // controla que el dato esté dentro de un rango de validez (no es el mismo que mínimo..máximo)
        // si es válido devuelve el nuevo valor, si no retorna el valor extremo
        let dato = this.data[n];
        if (parseInt(valor) < parseInt (dato.inicio)) { valor = dato.inicio } else {
            if (parseInt(valor) > parseInt(dato.fin)) { valor = dato.fin }
        }
        return valor;
    },
    getCantidad: function () {
        return this.data.length;
    },
    getItem: function (n) {
        return this.data[n];
    },
    setItem: function (n, valor) {
        //cambia el dato recibido si es válido y avisa a los controladores que cambió un valor
        valor = this.verificar(n, valor);
        this.data[n].valor = valor;
        controladores.cambio(n);
    },
    subir: function (n) {
        this.setItem(n, parseInt(this.getItem(n).valor) + 1);
    },
    bajar: function (n) {
        this.setItem(n, parseInt(this.getItem(n).valor) - 1);
    },
    // ----------------------------------
    // SIMULACION DE INGRESO DE DATOS
    // en un caso real los datos pueden provenir de la lectura de una base de datos,
    // del ingreso por parte de los usuarios (tener en cuenta que en un determinado momento puede haber varios
    // usuarios escibiendo y/o leyendo), o como en este caso de la lectura de sensores
    // ----------------------------------
    cambiarValores: () => {
        let valor;
        let n = Math.floor(Math.random() * 5);
        switch (n) {
            case 0:
                valor = parseInt(datos.data[n].valor) + Math.floor(Math.random() * 3 - 1);
                break;
            case 1:
                valor = parseInt(datos.data[n].valor) + Math.floor(Math.random() * 11 - 1);
                break;
            case 2:
                valor = parseInt(datos.data[n].valor) + Math.floor(Math.random() * 5 - 2);
                break;
            case 3:
                valor = parseInt(datos.data[n].valor) + Math.floor(Math.random() * 11 - 1);
                break;
            case 4:
                valor = parseInt(datos.data[n].valor) + Math.floor(Math.random() * 21 - 10);
                break;
        }
        datos.setItem(n, valor);
    }
}