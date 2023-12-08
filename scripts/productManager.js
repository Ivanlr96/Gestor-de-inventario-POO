// Importamos la clase producto de su archivo para poder usar el método toJSON
import { Product } from "./product.js";
// Clase de Product Manager, que controlará las funciones relacionadas con almacenar los productos y otras acciones como editar o borrar. Además aquí incluimos las acciones relacionadas con Local Storage.
export class ProductManager {
    #products;
    //El constructor incluye la creación del array de objetos y la función que comprobará si hay algo en el local Storage
    constructor() {
        this.#products = [];
        this.readFromLocalStorage();
    }


    // Método que usamos para obtener la lista de productos
    listProducts() {
        return this.#products;
    }

    /* Método para agregar el producto, se le pasan dos parámetros, product y otro para controlar si queremos añadir al local storage o no (por defecto es true). Cuando estamos leyendo los datos
    del local Storage, será falso y no guardará nada en el. Si es verdadero, guardará el producto en Local Storage
    */
    addProduct(product, saveToLocalStorage = true) {
        this.#products.push(product);
        if (saveToLocalStorage) {
            this.saveToLocalStorage();
        }
    }
    // Este método buscará un producto a través del id
    getProductById(id) {
        return this.#products.find(product => product.id === id)

    }
    // Método para actualizar un producto a través de su id
    updateProductById(id, updatedProduct) {
        const index = this.#products.findIndex(product => product.id === id);

        // Si no existe error (es coincidente el index), actualizará el producto y guardará el producto actualizado en el local storage
        if (index !== -1) {
            this.#products[index] = updatedProduct;
            this.saveToLocalStorage()

        }

    }

    // Método para eliminar un producto, borra el correspondiente al id del producto
    deleteProductById(id) {
        const index = this.#products.findIndex(product => product.id === id);

        if (index !== -1) {
            this.#products.splice(index, 1);
            this.saveToLocalStorage();

        }
    }

    // Método para mostrar  los productos dentro del Array
    showProducts() {
        for (const product of this.#products) {
            console.log(`ID: ${product.id}, Nombre: ${product.nombre}, Cantidad: ${product.cantidad}, Precio: ${product.precio}`);
        }
    }

    get products() {
        return this.#products;
    }

    set products(value) {
        this.#products = value;
    }
    // Función para guardar productos en local Storage. Aquí utilizamos el método toJSON de la clase Product y hacemos el Stringify
    saveToLocalStorage() {
        const products = this.#products.map(product => {
            return product.toJSON();
        })
        localStorage.setItem('productos', JSON.stringify(products))
    }
    // Funcion para leer los datos de Local Storage y comprobar si tiene algo almacenado 
    readFromLocalStorage() {
        const productos = localStorage.getItem('productos')
        // Este if comprueba si Local Storage contiene algo y además si el array de productos también tiene algún elemento
        if (productos && productos.length) {
            JSON.parse(productos).forEach((producto, index) => {
                    // Sumandole Index a Date.now() se soluciona un bug que provocaba que al crearse tan rápido por medio del bucle, tuvieran el mismo id varios productos distintos
                const newProduct = new Product(Date.now() + index, producto.nombre, producto.categoria, producto.cantidad, producto.precio);
                this.addProduct(newProduct, false)
            });
        }
    }
}