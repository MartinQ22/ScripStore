//Base de datos de productos
let productos = [
  {
    //Item Puma Rosa
    title: "DC CONVER",
    image: "images/zapatilla_Rosa.png",
    category: "Zapatillas de Moda para Hombre",
    price: 259999,
    button: "Agregar al Carrito",
  },
  {
    //Item Puma Rosa
    title: "PUMA HOOPS X TORTUGAS NINJA MB.03 LO KRANG",
    image: "images/zapatilla_Rosa.png",
    category: "Zapatillas de Moda para Hombre",
    price: 259999,
    button: "Agregar al Carrito",
  },
  {
    //Item Puma Rosa
    title: "PUMA HOOPS X TORTUGAS NINJA MB.03 LO KRANG",
    image: "images/zapatilla_Rosa.png",
    category: "Zapatillas de Moda para Hombre",
    price: 259999,
    button: "Agregar al Carrito",
  },
  {
    //Item Puma Rosa
    title: "PUMA HOOPS X TORTUGAS NINJA MB.03 LO KRANG",
    image: "images/zapatilla_Rosa.png",
    category: "Zapatillas de Moda para Hombre",
    price: 259999,
    button: "Agregar al Carrito",
  },
  /////////////////////////////////////////////
  {
    //Item Nike Blanca
    title: "NIKE SB ZOOM NYJAH 3 PREMIUM",
    image: "images/zapatilla_Blanca.png",
    category: "Zapatillas de Moda para Hombre",
    price: 219999,
    button: "Agregar al Carrito",
  },
  {
    //Item Nike Blanca
    title: "NIKE SB ZOOM NYJAH 3 PREMIUM",
    image: "images/zapatilla_Blanca.png",
    category: "Zapatillas de Moda para Hombre",
    price: 219999,
    button: "Agregar al Carrito",
  },
  {
    //Item Nike Blanca
    title: "NIKE SB ZOOM NYJAH 3 PREMIUM",
    image: "images/zapatilla_Blanca.png",
    category: "Zapatillas de Moda para Hombre",
    price: 219999,
    button: "Agregar al Carrito",
  },
  {
    //Item Nike Blanca
    title: "NIKE SB ZOOM NYJAH 3 PREMIUM",
    image: "images/zapatilla_Blanca.png",
    category: "Zapatillas de Moda para Hombre",
    price: 219999,
    button: "Agregar al Carrito",
  },
  {
    //Item Nike Blanca
    title: "NIKE SB ZOOM NYJAH 3 PREMIUM",
    image: "images/zapatilla_Blanca.png",
    category: "Zapatillas de Moda para Hombre",
    price: 219999,
    button: "Agregar al Carrito",
  },
];

// FUNCION: mostrar los productos en la página

const contenedorZapatillas = document.getElementById(
  "containerListaZapatillas"
);

function mostrarProductos() {
  let todasLasCards = "";
  productos.forEach((producto) => {
    todasLasCards += `<div class="cardProducto">
            <img src="${producto.image}" alt="${
      producto.title
    }" class="imagenCardProducto">
            <h3 class="nombreDeProducto">${producto.title}</h3>
            <p class="categoriaCard">${producto.category}</p>
            <p class="precioProductoCard">$${producto.price}</p>
            <button class="botonCardAgregarCart agregar-carrito" data-id="${productos.indexOf(
              producto
            )}">Agregar al Carrito</button>
        </div>`;
  });
  contenedorZapatillas.innerHTML = todasLasCards;
}

mostrarProductos();

// CODIGO DE CARRITO

// Boton carrito
const btnCart = document.querySelector(".containerIconCarrito");
// Lista row de los productos
const containerCartProducts = document.querySelector(
  ".container-cart-products"
);

//FUNCION: abrir o cerrar lista del carrito
btnCart.addEventListener("click", () => {
  containerCartProducts.classList.toggle("hidden-cart");
});

// Items de la lista row
const cartInfo = document.querySelector(".cart-product");
const rowProduct = document.querySelector(".row-product");
// Lista de todos los contenedores de productos
const productsList = document.querySelector(".contenedorDeItems");
// Precio a pagar Final
const valorTotal = document.querySelector(".total-pagar");
// Circulo que cuenta cantidad de productos
const countProducts = document.querySelector("#contador-productos");
// parrafo con mensaje "que esta el carrito vacio"
const cartEmpty = document.querySelector(".cart-empty");
// Div donde sale el total a pagar
const cartTotal = document.querySelector(".cart-total");
// Div de card de items
const itemProduct = document.querySelector(".cardProducto");

// Variable de arreglos de Productos
let allProducts = [];

//FUNCION: abrir o cerrar lista del carrito
productsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("botonCardAgregarCart")) {
    const product = e.target.parentElement;

    const infoProduct = {
      quantity: 1,
      title: product.querySelector(".nombreDeProducto").textContent,
      price: product.querySelector(".precioProductoCard").textContent,
    };

    const exits = allProducts.some(
      (product) => product.title === infoProduct.title
    );

    if (exits) {
      const products = allProducts.map((product) => {
        if (product.title === infoProduct.title) {
          product.quantity++;
          return product;
        } else {
          return product;
        }
      });
      allProducts = [...products];
    } else {
      allProducts = [...allProducts, infoProduct];
    }

    showHTML();
  }
});

rowProduct.addEventListener("click", (e) => {
  if (e.target.classList.contains("icon-close")) {
    const product = e.target.parentElement;
    const title = product.querySelector("p").textContent;

    allProducts = allProducts.filter((product) => product.title !== title);

    console.log(allProducts);

    showHTML();
  }
});

// FUNCION: mostrar en el HTML
const showHTML = () => {
  if (!allProducts.length) {
    cartEmpty.classList.remove("hidden");
    rowProduct.classList.add("hidden");
    cartTotal.classList.add("hidden");
  } else {
    cartEmpty.classList.add("hidden");
    rowProduct.classList.remove("hidden");
    cartTotal.classList.remove("hidden");
  }

  // Limpiar HTML
  rowProduct.innerHTML = "";

  let total = 0;
  let totalOfProducts = 0;

  // FUNCION: ciclo de lista HTML
  allProducts.forEach((product) => {
    const containerProduct = document.createElement("div");
    containerProduct.classList.add("cart-product");

    containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}-</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
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

    rowProduct.append(containerProduct);

    total = total + parseInt(product.quantity * product.price.slice(1));
    totalOfProducts = totalOfProducts + product.quantity;
  });

  valorTotal.innerText = `$${total}`;
  countProducts.innerText = totalOfProducts;

  //LOCALSTORAGE - se guardan los items en la variable "allProducts"
  localStorage.setItem("carrito", JSON.stringify(allProducts));
};

//LOCALSTORAGE
document.addEventListener("DOMContentLoaded", () => {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    allProducts = JSON.parse(carritoGuardado);

    showHTML();
  }
});
