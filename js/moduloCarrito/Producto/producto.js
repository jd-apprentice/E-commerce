// Clase Producto
export const refCarrito = db.collection("carrito");
export class Producto {
  constructor(usuario, nombre, precio, imagen, descripcion, cantidad) {
    this.usuario = usuario;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.descripcion = descripcion;
    this.cantidad = parseInt(cantidad);
  }

  // Funcion para agregar producto al carrito
  agregarProducto() {
    refCarrito
      .doc(this.usuario)
      .get()
      .then((doc) => {
        if (doc.exists) { // Si el usuario ya tiene un carrito
          let carrito = doc.data();
          let productos = carrito.productos;
          let producto = {
            nombre: this.nombre,
            precio: this.precio,
            imagen: this.imagen,
            descripcion: this.descripcion,
            cantidad: this.cantidad,
          };
        productos.push(producto);
        refCarrito.doc(this.usuario).set({  
          productos: productos
        });
        } else { // Si el usuario no tiene un carrito
          let producto = {
            nombre: this.nombre,
            precio: this.precio,
            imagen: this.imagen,
            descripcion: this.descripcion,
            cantidad: this.cantidad,
          };
          let productos = [];
          productos.push(producto);
          refCarrito.doc(this.usuario).set({
            productos: productos
          });
        }
      });
  }

  // Funcion para eliminar producto del carrito
  eliminarProducto(usuario, nombre) {
    refCarrito
      .doc(usuario)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // Si el usuario ya tiene un carrito
          let carrito = doc.data();
          let productos = carrito.productos;
          let producto = productos.find(
            (producto) => producto.nombre === nombre
          );
          if (producto) {
            productos.splice(productos.indexOf(producto), 1);
            refCarrito.doc(usuario).set({ productos: productos });
          }
        }
      });
  }

  // Funcion para actualizar la cantidad de productos
  sumarCantidad(usuario, nombre, cantidad) {
    refCarrito
    .doc(usuario)
    .get()
    .then((doc) => {
      if (doc.exists) {
        // Si el usuario ya tiene un carrito
        let carrito = doc.data();
        let productos = carrito.productos;
        let producto = productos.find(
          (producto) => producto.nombre === nombre
        );
        if (producto) {
          producto.cantidad += cantidad;
          refCarrito.doc(usuario).set({ productos: productos });
        }
      }
    });
  }

  // Funcion para actualizar el carrito
  actualizarCarrito(usuario, productos) {
    refCarrito
      .doc(usuario)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // Si el usuario ya tiene un carrito
          let carrito = doc.data();
          let productos = carrito.productos;
          refCarrito.doc(usuario).set({ productos: productos });
        }
      });
  }
}
