//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// VARIABLES GLOBALES//////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// FUNCIONES///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
                <span id="info" class="info">Detalles</span>
            <button class="button producto-agregar" id="${producto.id}">
                <span class="button_lg">
                    <span class="button_sl"></span>
                    <span class="button_text">Agregar</span>
                </span>
            </button>
        </div>
      `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// BOTON AGREGAR /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// BOTON AGREGAR AL CARRITO///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }
    else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    Toastify({

        text: "Se agrego el producto =)",
        duration: 3000,
        style: {
            background: "#40caa8",
        },

    }).showToast();
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// ACTUALIZAR NUMERO CARRITO ///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

cargarProductos(productos);

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

////////////////////////////////////////////
function verInfo() {
    let info = document.querySelectorAll(".info");
    info.forEach(infoElement => {
        infoElement.addEventListener("click", function () {
            let idProducto = this.parentNode.querySelector('.producto-agregar').id;
            let producto = productos.find(producto => producto.id === idProducto);
            if (producto) {
                let divInfo = document.createElement("div");
                divInfo.classList.add("div_info");
                divInfo.innerHTML = `
                    <span class="cerrar">&times;</span>
                    <h3 class="div__titulo">${producto.titulo}</h3>
                <div class="div__flex">
                    <img class="div__img" src="${producto.imagen}">
                    <p class="div__p">${producto.info}</p>
                    </div>
                `;
                document.body.appendChild(divInfo);

                let cerrarBoton = divInfo.querySelector(".cerrar");
                cerrarBoton.addEventListener("click", function () {
                    document.body.removeChild(divInfo);
                });
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    verInfo();
});