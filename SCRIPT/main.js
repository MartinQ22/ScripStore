let productos = [];

// FETCH (con async await)
async function obtenerProductosDataBase() {
  try {
    const response = await fetch("../database.json"); 
    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }
    const data = await response.json();
    productos = data;
    if (contenedorZapatillas) {
      mostrarProductosIniciales();
    }
    if (document.getElementById("containerListaZapatillasColeccion")) {
      mostrarProductosColeccion();
    }
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        allProducts = JSON.parse(carritoGuardado);
        showHTML(); 
    }
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    alert("Disculpa, no se pudo obtener los productos. Por favor, intente mas tarde (Mantenimiento)");
    // Puse mantenimiento para que nos de tiempo de arreglarlo y el usuario se quede tranquilo
  }
  finally {
    console.log("Productos obtenidos");
  }
}

obtenerProductosDataBase();

// Menu hamburguesa (boton para mobile)
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 610) {
                    hamburgerMenu.classList.remove('active');
                    mainNav.classList.remove('active');
                }
            });
        });
    }
});

// // Base de datos de productos (vieja)
// let productos = [
//   {
//       title: "PUMA HOOPS x TORTUGAS NINJA MB.04 L&M",
//       image: "../images/zapatilla_TortugaNaranja.png", 
//       category: "Zapatillas de Moda para Hombre",
//       price: 259999,
//       button: "Agregar al Carrito",
//   },
//   {
//       title: "PUMA x TORTUGAS NINJA Suede XL 2",
//       image: "../images/zapatilla_RosaSuedo.png",
//       category: "Zapatillas de Moda para Mujer",
//       price: 209999,
//       button: "Agregar al Carrito",
//   },
//   {
//       title: "PUMA x TORTUGAS NINJA Suede XL",
//       image: "../images/zapatilla_VerdeSuedo.png",
//       category: "Zapatillas de Moda para Hombre",
//       price: 209999,
//       button: "Agregar al Carrito",
//   },
//   {
//       title: "PUMA HOOPS X TORTUGAS NINJA MB.03 LO KRANG",
//       image: "../images/zapatilla_Rosa.png",
//       category: "Zapatillas de Moda para Hombre",
//       price: 259999,
//       button: "Agregar al Carrito",
//   },
//   {
//       title: "Nike Dunk Low Retro",
//       image: "../images/zapatilla_NikeDunk.png",
//       category: "Zapatillas de Moda para Hombre",
//       price: 199999,
//       coleccion: "classic",
//       button: "Agregar al Carrito",
//   },
//   {
//       title: "Nike Air Force 1 '07",
//       image: "../images/zapatilla_NikeAirBlanca.png",
//       category: "Zapatillas de Moda para Hombre",
//       price: 199999,
//       coleccion: "classic",
//       button: "Agregar al Carrito",
//   },
//   {
//       title: "Air Jordan 1 Low",
//       image: "../images/zapatilla_NikeJordan.png",
//       category: "Zapatillas de Moda para Hombre",
//       coleccion: "classic",
//       price: 199999,
//       button: "Agregar al Carrito",
//   },
//   {
//       title: "Air Jordan 4 Retro",
//       image: "../images/zapatilla_NikeRetroJordan4.png",
//       category: "Zapatillas de Moda para Hombre",
//       coleccion: "classic",
//       price: 399999,
//       button: "Agregar al Carrito",
//   },
//   {
//       title: "Nike Air Max Pulse",
//       image: "../images/zapatilla_NikeDeportivaGris.png",
//       category: "Zapatillas de Moda para Hombre",
//       price: 299999,
//       button: "Agregar al Carrito",
//   },
//   {
//       title: "NIKE SB ZOOM NYJAH 3 PREMIUM",
//       image: "../images/zapatilla_Blanca.png",
//       category: "Zapatillas de Moda para Hombre",
//       price: 219999,
//       button: "Agregar al Carrito",
//   },
// ];

// FUNCION: mostrar los productos en la página principal (index.html)
const contenedorZapatillas = document.getElementById("containerListaZapatillas");

if (contenedorZapatillas) {
  function mostrarProductosIniciales() {
      let todasLasCards = "";
      productos.forEach((producto, index) => { 
          todasLasCards += `<div class="cardProducto">
              <img src="${producto.image}" alt="${producto.title}" class="imagenCardProducto">
              <h3 class="nombreDeProducto">${producto.title}</h3>
              <p class="categoriaCard">${producto.category}</p>
              <p class="precioProductoCard">$${producto.price.toLocaleString('es-AR')}</p>
              <button class="botonCardAgregarCart agregar-carrito" data-id="${index}">Agregar al Carrito</button>
          </div>`;
      });
      contenedorZapatillas.innerHTML = todasLasCards;
  }
  mostrarProductosIniciales();
}

// FILTRO: Filtrar productos de la coleccion "classic"
function mostrarProductosColeccion() {
    console.log("Intentando mostrar productos de colección");
    console.log("Productos disponibles:", productos);
    
    const contenedorProductosColeccion = document.getElementById("containerListaZapatillasColeccion");
    console.log("Contenedor encontrado:", contenedorProductosColeccion);
    
    if (contenedorProductosColeccion && productos && productos.length > 0) {
        let todasLasCards = "";
        const productosClassic = productos.filter(producto => {
            return producto.coleccion && producto.coleccion.toLowerCase() === "classic";
        });
        console.log("Productos classic encontrados:", productosClassic);
        
        productosClassic.forEach((producto, index) => {
            todasLasCards += `<div class="cardProducto">
                <img src="${producto.image}" alt="${producto.title}" class="imagenCardProducto">
                <h3 class="nombreDeProducto">${producto.title}</h3>
                <p class="categoriaCard">${producto.category}</p>
                <p class="precioProductoCard">$${producto.price.toLocaleString('es-AR')}</p>
                <button class="botonCardAgregarCart agregar-carrito" data-id="${index}">Agregar al Carrito</button>
            </div>`;
        });
        contenedorProductosColeccion.innerHTML = todasLasCards;
    }
}

// CODIGO DE CARRITO

// Boton carrito (del header)
const btnCart = document.querySelector(".containerIconCarrito");
// Lista row de los productos (mini-carrito del header)
const containerCartProducts = document.querySelector(".container-cart-products");

// Elementos de la página del carrito (si existen)
const carritoConProductos = document.querySelector(".carritoConProductos");
const carritoVacioDiv = document.querySelector(".carritoVacio");
const tituloCarrito = document.querySelector(".tituloCarrito");

// Cerrar carrito del header
if (btnCart) { 
  btnCart.addEventListener("click", () => {
      containerCartProducts.classList.toggle("hidden-cart");
  });
}

// Items de la lista row (carrito del header)
const rowProduct = document.querySelector(".row-product");
// Lista de todos los contenedores de productos (en index.html)
const productsList = document.querySelector(".contenedorDeItems");
// Precio a pagar Final (carrito del header)
const valorTotal = document.querySelector(".total-pagar");
// Circulo que cuenta cantidad de productos (carrito del header)
const countProducts = document.querySelector("#contador-productos");
// parrafo con mensaje "que esta el carrito vacio" (carrito del header)
const cartEmpty = document.querySelector(".cart-empty");
// Div donde sale el total a pagar (carrito del header)
const cartTotal = document.querySelector(".cart-total");

// Variable de arreglos de Productos en el carrito
let allProducts = [];

// Event listener para agregar productos al carrito (solo en index.html)
if (productsList) { 
  productsList.addEventListener("click", (e) => {
      if (e.target.classList.contains("botonCardAgregarCart")) {
          const productElement = e.target.closest(".cardProducto");
          const productId = parseInt(e.target.dataset.id); 
          const productoOriginal = productos[productId]; 

          const infoProduct = {
              quantity: 1,
              title: productoOriginal.title,
              price: `$${productoOriginal.price.toLocaleString('es-AR')}`, 
              image: productoOriginal.image, 
          };

          const exits = allProducts.some(
              (product) => product.title === infoProduct.title
          );

          if (exits) {
              const products = allProducts.map((product) => {
                  if (product.title === infoProduct.title) {
                      product.quantity++;
                      return product;
                  }
                  return product;
              });
              allProducts = [...products];
          } else {
              allProducts = [...allProducts, infoProduct];
          }
          showHTML();
      }
  });
}

// Event listener para eliminar productos del carrito (header)
if (rowProduct) {
  rowProduct.addEventListener("click", (e) => {
      if (e.target.classList.contains("icon-close")) {
          const productElement = e.target.parentElement;
          const title = productElement.querySelector(".titulo-producto-carrito").textContent;

          allProducts = allProducts.filter((product) => product.title !== title);
          showHTML();
      }
  });
}

// FUNCION: mostrar en el HTML (carrito y carrito.html)
const showHTML = () => {
  // Lógica para el carrito del header
  if (!allProducts.length) {
      cartEmpty.classList.remove("hidden");
      rowProduct.classList.add("hidden");
      cartTotal.classList.add("hidden");
  } else {
      cartEmpty.classList.add("hidden");
      rowProduct.classList.remove("hidden");
      cartTotal.classList.remove("hidden");
  }

  // Limpiar HTML del carrito
  rowProduct.innerHTML = "";

  // Limpiar HTML del carrito en la página de carrito.html (si existe)
  if (carritoConProductos) {
      carritoConProductos.innerHTML = "";
  }

  let total = 0;
  let totalOfProducts = 0;

  // Iterar sobre los productos del carrito
  allProducts.forEach((product) => {
      const containerProduct = document.createElement("div");
      containerProduct.classList.add("cart-product");

      containerProduct.innerHTML = `
          <div class="info-cart-product">
              <div class="imagen-producto-carrito">
                  <img class="imagen-producto-carrito" src="${product.image}" alt="${product.title}">
              </div>
              <span class="cantidad-producto-carrito">${product.quantity}x</span>
              <div>
                  <p class="titulo-producto-carrito">${product.title}</p>
                  <span class="precio-producto-carrito">${product.price}</span>
              </div>
          </div>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="icon-close"
          >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
              />
          </svg>
      `;

      // Añadir al carrito del header
      if (rowProduct) { // Solo si rowProduct existe (estamos en index.html o carrito.html)
          rowProduct.append(containerProduct.cloneNode(true)); 
      }

      // Añadir a la página del carrito si el contenedor existe
      if (carritoConProductos) {
          carritoConProductos.append(containerProduct);
      }

      // Calcula el total, quitando el '$' y usando `parseFloat` o `parseInt`
      const priceValue = parseFloat(product.price.replace('$', '').replace('.', '')); // Eliminar '$' y '.' para convertir correctamente
      total += product.quantity * priceValue;
      totalOfProducts += product.quantity;
  });

  // Actualizar el carrito del header
  valorTotal.innerText = `$${total.toLocaleString('es-AR')}`;
  countProducts.innerText = totalOfProducts;

  // Mostrar u ocultar elementos en la página del carrito (carrito.html)
  if (carritoConProductos && carritoVacioDiv && tituloCarrito) {
      if (!allProducts.length) {
          carritoVacioDiv.classList.remove("hidden");
          carritoVacioDiv.classList.add("flex");
          carritoConProductos.classList.add("hidden");
          tituloCarrito.classList.add("hidden");
      } else {
          carritoVacioDiv.classList.add("hidden");
          carritoConProductos.classList.remove("hidden");
          tituloCarrito.classList.remove("hidden");
          // Actualizar el total en la página del carrito
          const totalPage = document.createElement('div');
          totalPage.classList.add('cart-total-page');
          totalPage.innerHTML = `
              <h3>Total a Pagar:</h3>
              <span id="total-pagar-page">$${total.toLocaleString('es-AR')}</span>
          `;
          // Asegurarse de que solo haya un total en la página del carrito
          const existingTotalPage = document.querySelector('.cart-total-page');
          if (existingTotalPage) {
              existingTotalPage.remove();
          }
          carritoConProductos.append(totalPage);

          // Añadir el botón de finalizar compra
          const finalizarCompraBtn = document.createElement('button');
          finalizarCompraBtn.classList.add('boton-finalizar-compra');
          finalizarCompraBtn.textContent = 'Finalizar Compra';
          const existingFinalizarCompraBtn = document.querySelector('.boton-finalizar-compra');
          if(existingFinalizarCompraBtn) {
              existingFinalizarCompraBtn.remove();
          }
          carritoConProductos.append(finalizarCompraBtn);
      }
  }
  const botonFinalizarCompra = document.querySelector(".boton-finalizar-compra");
  // Event listener para el botón de finalizar compra
   if (botonFinalizarCompra) {
    botonFinalizarCompra.addEventListener('click', () => {
           window.location.href = "../index.html";
       });
   };


  // LOCALSTORAGE - se guardan los items en la variable "allProducts"
  localStorage.setItem("carrito", JSON.stringify(allProducts));
};

// LOCALSTORAGE - Cargar productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
      allProducts = JSON.parse(carritoGuardado);
      showHTML(); // Renderizar el carrito al cargar
  }
});

// Botón "Ir Al Carrito" en el carrito header
const btnIrAlCarrito = document.querySelector("#botonIrAlCarrito");

if (btnIrAlCarrito) {
  btnIrAlCarrito.addEventListener("click", () => {
      window.location.href = "pages/carrito.html";
  });
};

// Botón "Ir Al Carrito" en el carrito desde la carpeta pages
const btnIrAlCarritoPages = document.querySelector("#botonIrAlCarritoPages");

if (btnIrAlCarritoPages) {
  btnIrAlCarritoPages.addEventListener("click", () => {
      window.location.href = "carrito.html";
  });
};

// Event listener para manejar la eliminación en la página del carrito (si es que esta existe)
if (carritoConProductos) {
  carritoConProductos.addEventListener("click", (e) => {
      if (e.target.classList.contains("icon-close")) {
          const productElement = e.target.closest(".cart-product");
          const title = productElement.querySelector(".titulo-producto-carrito").textContent;

          allProducts = allProducts.filter((product) => product.title !== title);
          showHTML();
      }
  });
}

// Mapa de la pagina nosotros
function initMap() {
    // Coordenadas de ejemplo para Boulevard street 186, Córdoba, Argentina
    const mapLocation = { lat: -31.418840548674446, lng: -64.18113800000002 };

    // Crea un nuevo mapa
    const map = new google.maps.Map(document.getElementById("map-canvas"), {
        zoom: 15,
        center: mapLocation
    });

    // Añade un marcador
    new google.maps.Marker({
        position: mapLocation,
        map: map,
        title: "Chacabuco 186, Córdoba"
    });
}