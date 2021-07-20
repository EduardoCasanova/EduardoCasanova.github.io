let boton = document.getElementById("boton_ejemplo_1");



const mostrar = () => {
    console.log(boton);

}

boton.addEventListener('click', console.log(boton));
// boton.addEventListener('click', mostrar(boton));