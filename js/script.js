
// Uso condicional de funciones según la página

let body = document.getElementsByTagName('body')[0];

if (body.id == 'inicio') {
// lo que sigue se usa en todas las páginas menos la inicial
    // navbar

    const menu = document.getElementById("menu");
    const Bmenuppal = document.getElementById("Bmenu");
    const b_ham = document.getElementById("b-ham");
    const b_cruz = document.getElementById("b-cruz");

    Bmenuppal.addEventListener('click', () => {
        b_ham.classList.toggle('hidden');
        b_cruz.classList.toggle('hidden');
        // menu.classList.toggle('hidden');
        menu.classList.toggle('-translate-y-96');
        menu.classList.toggle('translate-x-96');
    })

    //irArriba

    const arriba = document.getElementById("irArriba");

    document.addEventListener("scroll", () => {
        //console.log(window.scrollY);
        if (window.scrollY > window.innerHeight / 2) {
            arriba.classList.remove('hidden');
            arriba.classList.add('flex');
        } else {
            arriba.
                // Menú Dark mode
                classList.remove('flex');
            arriba.classList.add('hidden');
        }
    });
}

// Menú Dark mode

const Bdianoche = document.getElementById("Bdianoche");
const Mdianoche = document.getElementById("Mdianoche");

Bdianoche.addEventListener("click", () => {
    console.log("Bdianoche click");
    Mdianoche.classList.toggle("scale-0");
    Mdianoche.classList.toggle("scale-1");
});

Mdianoche.addEventListener("click", (event) => {
    switch (event.target.dataset.dark) {
        case "sistema":
            localStorage.removeItem('theme');
            pagina[0].classList.remove('dark');
            break;
        case "dia":
            localStorage.theme = 'light';
            pagina[0].classList.remove('dark');
            break;
        case "noche":
            localStorage.theme = 'dark';
            pagina[0].classList.add('dark');
            break;
    }
    Mdianoche.classList.remove("scale-1");
    Mdianoche.classList.add("scale-0");
});

Mdianoche.addEventListener("mouseleave", () => {
    Mdianoche.classList.remove("scale-1");
    Mdianoche.classList.add("scale-0");
});
