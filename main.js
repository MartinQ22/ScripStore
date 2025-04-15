// Simulador de pago con cuotas

function calcularCuotas() {
  // Valor del producto
  const valorDelProducto = 255000;

  // Definición de opciones de cuotas
  const opciones = {
    tresCuotas: {
      cuotas: 3,
      interes: 0.06,

      // esta funcion calcula el precio final con intereses
      total: function () {
        return valorDelProducto * (1 + this.interes);
      },

      // esta funcion calcula el valor de cada cuota
      valor: function () {
        return this.total() / this.cuotas;
      },
    },

    seisCuotas: {
      cuotas: 6,
      interes: 0.12,

      // esta funcion calcula el precio final con intereses
      total: function () {
        return valorDelProducto * (1 + this.interes);
      },

      // esta funcion calcula el valor de cada cuota
      valor: function () {
        return this.total() / this.cuotas;
      },
    },
    doceCuotas: {
      cuotas: 12,
      interes: 0.24,

      // esta funcion calcula el precio final con intereses
      total: function () {
        return valorDelProducto * (1 + this.interes);
      },

      // esta funcion calcula el valor de cada cuota
      valor: function () {
        return this.total() / this.cuotas;
      },
    },
  };

  // mensaje del prompt
  const mensaje = `Gracias por comprar con nosotros!
  
 Por favor, elegi una opción de pago para tus zapatillas Nike Under de $${valorDelProducto}:
    
   1. 3 cuotas con 6% de interés - vas a pagar $${opciones.tresCuotas.total()} pesos.
   2. 6 cuotas con 12% de interés - vas a pagar $${opciones.seisCuotas.total()} pesos.
   3. 12 cuotas con 24% de interés - vas a pagar $${opciones.doceCuotas.total()} pesos.

Ingrese abajo el número de la opción de pago (1, 2 o 3):`;

  // Mostrar el prompt al usuario
  let seleccion = prompt(mensaje);

  // Resultados
  let resultado = "";

  switch (seleccion) {
    case "1":
      resultado = `Ha seleccionado: 3 cuotas
      Valor del producto: $${valorDelProducto}
      Interés: 6%
      Monto total a pagar: $${opciones.tresCuotas.total().toFixed(2)}
      Valor de cada cuota: $${opciones.tresCuotas.valor().toFixed(2)}`;
      break;
    case "2":
      resultado = `Ha seleccionado: 6 cuotas
      Valor del producto: $${valorDelProducto}
      Interés: 12%
      Monto total a pagar: $${opciones.seisCuotas.total().toFixed(2)}
      Valor de cada cuota: $${opciones.seisCuotas.valor().toFixed(2)}`;
      break;
    case "3":
      resultado = `Ha seleccionado: 12 cuotas
      Valor del producto: $${valorDelProducto}
      Interés: 24%
      Monto total a pagar: $${opciones.doceCuotas.total().toFixed(2)}
      Valor de cada cuota: $${opciones.doceCuotas.valor().toFixed(2)}`;
      break;

    // if si elige un numero no definido de cuotas
    default:
      resultado =
        "Cantidad de cuotas no válida. Por favor recargue la página e intente nuevamente.";
  }

  // El resultado en la ventana emergente
  alert(resultado);
}

calcularCuotas();
