let productosEnCarrito = localStorage.getItem("productos-en-carrito")

productosEnCarrito = JSON.parse(productosEnCarrito)


const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar") ;
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
  if (productosEnCarrito && productosEnCarrito.length > 0) {

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";
  
    productosEnCarrito.forEach(producto => {

      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
          <img class="carrito-producto-imagen" src="${producto.imagen}"alt="${producto.titulo}">
          <div class="carrito-producto-titulo">
              <small>Titulo</small>
              <h3>${producto.titulo}</h3>
          </div>
          <div class="carrito-producto-cantidad">
              <small>Cantidad</small>
              <p>${producto.cantidad}</p>
          </div>
          <div class="carrito-producto-precio">
              <small>Precio</small>
              <p>${producto.precio}</p>
          </div>
          <div class="carrito-producto-subtotal">
              <small>Subtotal</small>
              <p>${producto.precio * producto.cantidad}</p>
          </div>
          <button class="carrito-producto-eliminar" id="${producto.id}"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>
          </button>`;
  
            contenedorCarritoProductos.append(div);
    });

  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
  }

  actualizarBotonesEliminar();
  actualizarTotal();

}
cargarProductosCarrito();

function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

  botonesEliminar.forEach(boton => 
    { boton.addEventListener("click", eliminarDelCarrito);
  });
};

function eliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id;
  const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

  productosEnCarrito.splice(index, 1);

  cargarProductosCarrito();

  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))

}

 botonVaciar.addEventListener("click", vaciarCarrito)


function vaciarCarrito(){

  Swal.fire({
    title: "¿Estás seguro?",
    icon: "info",
    iconColor: "red",
    html: `
  Se borraran ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos
    `,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: `
      Aceptar
    `,
    confirmButtonAriaLabel: "Thumbs up, great!",
    cancelButtonText: `
     Cancelar
    `,
    cancelButtonAriaLabel: "Thumbs down"

  }).then((result) => {
    if (result.isConfirmed) {
      productosEnCarrito.length = 0 
      localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
      cargarProductosCarrito()
    }
  });


}

 function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
  total.innerText =`${totalCalculado}` ;
};


botonComprar.addEventListener("click", comprarCarrito)

function comprarCarrito() {

  productosEnCarrito.length = 0;
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))

  contenedorCarritoVacio.classList.add("disabled");
  contenedorCarritoProductos.classList.add("disabled");
  contenedorCarritoAcciones.classList.add("disabled");
  contenedorCarritoComprado.classList.remove("disabled");

  Swal.fire({
    position: "center-center",
    icon: "success",
    title: "Tu compra ha sido realizada.",
    showConfirmButton: false,
    timer: 2000
  });

}


