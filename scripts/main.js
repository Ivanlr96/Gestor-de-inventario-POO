/*
Autor: Iván Lorenzo Ruiz
Link Github: https://github.com/Ivanlr96/Gestor-de-Inventario
*/
// Importamos las 2 clases que hemos creado en los otros archivos
import { Product } from './product.js';
import { ProductManager } from './productManager.js';
const table = document.getElementById("tabla")

//Función para calcular el valor total del inventario
const calcularTotalIventario = () => {
    const products = productManager.listProducts();
    let precioTotal = 0;
    // bucle que recorre el array para ir sumando el resultado de la operación de cada elemento del array
    products.forEach((product => {
        precioTotal += product.cantidad * product.precio;

    }))
    document.getElementById("total").textContent= precioTotal+"€";

}

// Instanciamos la clase que administra los productos
const productManager = new ProductManager();
updateInventoryTable();
// Función que insertará los productos a través del formulario
const insertProduct = (event) => {
    event.preventDefault()
    // Se recogen los valores de los inputs
    const nombre = document.getElementById('nombre').value
    const categoria = document.getElementById('categoria').value
    const cantidad = parseInt(document.getElementById('cantidad').value)
    const precio = parseFloat(document.getElementById('precio').value)
    // Instanciamos la clase Productos, creando el producto que se almacenará dentro del array de Product Manager y en Local Storage 
    const newProduct = new Product(Date.now(), nombre, categoria, cantidad, precio);
    console.log(newProduct);
    // Introducimos el producto en el array, con el método add product
    productManager.addProduct(newProduct);
    document.getElementById('form').reset();
    // Actualizamos la tabla
    updateInventoryTable();
    // Llamamos a la función que activa un keyframe y hace girar el botón
    refreshBtn();
}

// Se declara un indice para editar para poder usarlo más tarde
let idToEdit = null;
// las ventana modal está hecha mediante boostrap, para que funcione es necesario esta línea de código
const modal = new bootstrap.Modal(document.getElementById("ventanaModal"));

/* esta es una función global usando window. en vez de const. Se requiere para poder añadir las funciones directamente a la etiqueta de los botones en el archivo list. 
En este tipo de función, no es posible el uso de export directamente como con las otras funciones, por tanto se dejan aquí para que funcionen correctamente */
window.showEditModal = (productId) => {
// En esta ocasión, en POO usamos productID en vez de Index
const product=productManager.getProductById(productId)
    idToEdit=productId
    console.log(product,idToEdit)
    // Utilizamos los getter para lo que necesitamos
    document.getElementById('nombreMod').value = product.nombre
    document.getElementById('categoriaMod').value = product.categoria
    document.getElementById('cantidadMod').value = product.cantidad
    document.getElementById('precioMod').value = product.precio
    // Usamos el método show de las ventanas modales de Bootstrap para mostrar la ventana modal donde se podrá editar el producto//
    modal.show(); 
} 
// funcion para editar el producto
const editProduct = (e) => {
    e.preventDefault()
    //Volvemos a utilizar los getter
    const product=productManager.getProductById(idToEdit)
    product.nombre = document.getElementById('nombreMod').value
    product.categoria = document.getElementById('categoriaMod').value
    product.cantidad = parseInt(document.getElementById('cantidadMod').value)
    product.precio = parseFloat(document.getElementById('precioMod').value)
    productManager.updateProductById(idToEdit, product)
    // Mostramos la tabla, una vez editado el producto
    updateInventoryTable()
    // Utilizamos el método hide, también de las ventanas modales de Bootstrap para ocultarla cuando terminamos la edición
    modal.hide();
}

// Función que actualiza y crea los elementos de la tabla
function updateInventoryTable() {
      // se limpia la tabla
      table.innerHTML = ''
      // se localizan los elementos del array
      const products = productManager.listProducts();
    products.forEach(product => {
         
          // se crean las partes de la tabla
          const fila = document.createElement('tr')
      fila.classList.add('product')
  
      // los botones tienen las funciones en las propias etiquetas para su correcto funcionamiento, en esta ocasión reciben el id capturado mediante el getter como parámetro para poder borrar el elemento correcto
          const celdas =
          // Las celdas llevan los elementos capturados mediante los getter
              ` 
      <td>${product.nombre}</td>
      <td>${product.categoria}</td>
      <td>${product.cantidad}</td>
      <td>${product.precio}€</td>
      <td>
      <div>
      <button class="btn btn-secondary" id="btnE" onclick="showEditModal(${product.id})">Editar</button>
      <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Borrar</button>
      </div>`
          fila.innerHTML = celdas
          table.append(fila)
      })
      // Cada vez que se crea una nueva fila, se calcula el total del inventario
      calcularTotalIventario();
}

// Evento que nos permite usar el buscador. Corregido el fallo respecto la tarea del tema 2 que hacía que no se encontraran ocurrencias si la primera letra estaba en mayúsculas. La búsqueda ahora se realiza tanto en minúsculas como en mayúsculas.
document.addEventListener("keyup", e => {
    const products = productManager.listProducts();
    if (e.target.matches('#buscador')) {
        document.querySelectorAll('.product').forEach(product => {
            product.textContent.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
        // Operador ternario que añadirá o quitará la clase filtro que contiene un display none, para que se oculten aquellos elementos que no coincidan con la búsqueda 
                ? product.classList.remove('filtro')
                : product.classList.add('filtro');

        })
        /* en caso de que todos los elementos tengan la clase filtro, significará que no ha encontrado ningún elemento que coincida con la búsqueda
           Por tanto, saltará la alerta con el mensaje , pero también se mostrará la tabla para que no quede vacía al no haber resultados de la búsqueda */ 
        if (document.querySelectorAll('.filtro').length === products.length) {
            alert("No hay coincidencias")
           updateInventoryTable();
        }
    }
})
window.deleteProduct = (productId) => {
    // Utiliza el método para encontrar el producto a través del id
const product=productManager.getProductById(productId)
    if (confirm(`¿Seguro que desea borrar ${product.nombre}?`)) {
        // Borra sólo el elemento que coincide con el elemento del array del que pulsamos el botón borrar
        productManager.deleteProductById(productId)
        // Una vez eliminado el producto, muestra la tabla de nuevo
        updateInventoryTable();
    }
}
// Función para activar el keyframe que hace que el botón de añadir producto rote y se activará al pulsarlo. Como la temática es de un gestor de una tienda de informática, simula un disipador RGB que gira mostrando distintos colores.
function refreshBtn(){
    let rotacion= (360/100) * 2.5; 
    setTimeout(()=>{
    document.getElementById('btnA').classList.add('rotate');
    }, 100);
    
    setTimeout(()=>{
    document.getElementById('btnA').classList.remove('rotate');
    }, rotacion);

}
// Se actualiza la tabla al abrir la página
updateInventoryTable();
// Esto captura el submit que del formulario, que se producirá al pulsar el botón añadir y ejecutará la función para añadir el producto
document.getElementById('form').addEventListener('submit', insertProduct);
// Funciona igual que la de arriba, pero en este caso lo hará con el formulario correspondiente a la ventana modal y capturará el submit del botón de esta ventana. Ejecuta la función de editar
document.getElementById('formModal').addEventListener('submit', editProduct);