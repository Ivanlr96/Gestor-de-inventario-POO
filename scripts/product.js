/// Clase para el producto, con sus atributos, constructor getters y setters
export class Product {
    #id;
    #nombre;
    #categoria;
    #cantidad;
    #precio;
    constructor(id, nombre, categoria, cantidad, precio) {
        this.#id = id;
        this.#nombre = nombre;
        this.#categoria = categoria;
        this.#cantidad = cantidad;
        this.#precio = precio;
    }
    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(value) {
        this.#nombre = value
    }
    get categoria() {
        return this.#categoria;
    }
    set categoria(value) {
        this.#categoria = value
    }

    get cantidad() {
        return this.#cantidad;
    }

    set cantidad(value) {
        this.#cantidad = value
    }

    get precio() {
        return this.#precio;
    }

    set precio(value) {
        this.#precio = value
    }
    //Método para mostrar el objeto por consola
    showProduct() {
        console.log(`ID: ${this.#id}, Nombre: ${this.#nombre}, Categoría: ${this.#categoria} Cantidad: ${this.#cantidad}, Precio: ${this.#precio}`);
    }
    // Método para trasformar en JSON, que devuelve los atributos del objeto y utilizaremos en productManager
    toJSON() {
        return {
            id: this.#id,
            nombre: this.#nombre,
            categoria: this.#categoria,
            cantidad: this.#cantidad,
            precio: this.#precio
        }
    }
}