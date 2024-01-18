
//CARRITO
const productos = [
    { id: 1, nombre: "coca cola", precio: 1300, img: "./coca.png" },
    { id: 2, nombre: "seven up", precio: 1300, img: "./seven.png"},
    { id: 3, nombre: "hamburguesa", precio: 1600, img: "./hamburguesa.png"},
    { id: 4, nombre: "pizza", precio: 1600, img: "./pizza.png"},
    { id: 5, nombre: "pancho", precio: 1600, img: "./pancho.png"},
    { id: 6, nombre: "papas fritas", precio: 1600, img: "./papas.avif"},
    { id: 7, nombre: "sandwich", precio: 1600, img: "./sandwich.png"},
    { id: 8, nombre: "fanta", precio: 1300, img: "./fanta.png"}
]


const CARRITO = []

function renderizarProductos() {
    const carritoElementos = document.getElementById("carrito")
    carritoElementos.innerHTML = ``;

    productos.forEach(producto => {
        const card = document.createElement("div")
        card.classList.add("card")
        
        card.innerHTML = `
                        <div class="productos">
                            <img src="${producto.img}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">$${producto.precio.toFixed(2)}</p>
                                <button onclick = "agregarAlCarrito(${producto.id})" class="btn btn-primary">Agregar al carrito</button>
                            </div>
                        </div>
        
        `;

        carritoElementos.appendChild(card)
    })

}

function agregarAlCarrito(idProducto) {
    const productosSeleccionados = productos.find(producto => producto.id === idProducto)


    if (productosSeleccionados) {
        CARRITO.push(productosSeleccionados)
        sumarTotal()
    }
}



function sumarTotal() {
    const totalElementos = document.getElementById("total");
    const total = CARRITO.reduce((acc, producto) => acc + producto.precio, 0)
    totalElementos.innerHTML = `
                            <p>total carrito: $${total}</p>
                            <button onclick = "pagoRealizado()"> realizar pago</button>
    `
    
}

function pagoRealizado(){
    Swal.fire({
        title: "¿estas seguro que deseas realizar la compra?",
        showDenyButton: true,
        confirmButtonText: "si",
        denyButtonText: `cancelar`
      }).then((result) => {

        if (result.isConfirmed) {
          Swal.fire("pago realizado con exito!");
        } else if (result.isDenied) {
          Swal.fire("compra cancelada");
        }
      });
}



renderizarProductos();




//BOTON MODO

const botonModo = document.getElementById("botonModo")

botonModo.addEventListener("click", ()=>{
    document.body.classList.toggle("modoOscuro")
    document.body.classList.contains("modoOscuro")
        ?localStorage.setItem("modo","oscuro")
        :localStorage.setItem("modo","claro")
})

const modo = localStorage.getItem("modo")

modo === "oscuro"
    ?document.body.classList.add("modoOscuro")
    :document.body.classList.remove("modoOscuro")



//BUSCADOR
const buscador = document.getElementById("buscador")

buscador.addEventListener("keyup", e=>{

    if (e.target.matches("#buscador")){
  
        if (e.key ==="Escape")e.target.value = ""
        console.log(e.target.value)
        document.querySelectorAll(".productos").forEach(articulo =>{
  
            articulo.textContent.toLowerCase().includes(e.target.value.toLowerCase())
              ?articulo.classList.remove("filtro")
              :articulo.classList.add("filtro")
        })
  
    }
  
  
})


//INICIAR SESION

class registrarse{
    constructor(nombreRegistro, apellidoRegistro, mailRegistro){
        this.nombreRegistro = nombreRegistro
        this.apellidoRegistro = apellidoRegistro
        this.mailRegistro = mailRegistro
    }

}

let arrayRegistro = []

const formulario = document.getElementById("formulario")

formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    const nombreRegistro = document.getElementById("nombreRegistro")
    const apellidoRegistro = document.getElementById("apellidoRegistro")
    const mailRegistro = document.getElementById("mailRegistro") 
    const clienteRegistro = new registrarse(nombreRegistro.value, apellidoRegistro.value, mailRegistro.value)
    arrayRegistro.push(clienteRegistro)
    let jsonArrayRegistro = JSON.stringify(arrayRegistro)
    localStorage.setItem("registro", jsonArrayRegistro)
    enviarFormulario();
    formulario.reset();
    
})

localStorage.getItem("registro")

function enviarFormulario(){
    Swal.fire({
        position: "top-center",
        icon: "success",
        title: "tu cuenta ha sido registrada con éxito",
        showConfirmButton: false,
        timer: 1500
      });
}
