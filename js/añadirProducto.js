//Modulos

import { addButtons } from "../js/modulosProductosAdmin/anadirBotones.js";
import { pintarProductos } from "../js/modulosProductosAdmin/pintarProductos.js";
import { btnEdit } from "../js/modulosProductosAdmin/botonEditar.js";
// Inicializar Firebase
// var storage = firebase.storage();
export const db = firebase.firestore();

//Btn Editar Modal
export const editarM = document.querySelector("#editarM");
export const modalProdName = document.querySelector("#modalProdName");
export const modalProdPrice = document.querySelector("#modalProdPrice");

// Cuando la pantalla carga verifica la lista de productos para agregar los botones

window.onload = async () => {
  await db
    .collection("carrousel")
    .get()
    .then((querySnapshot) => {
      let contP = 0;
      let nombreDB = "";
      let idSpan = "";
      querySnapshot.forEach((doc) => {
        if (contP < 4) {
          nombreDB = doc.data().nombre;
          idSpan = doc.id;
          let label = document.createElement("label");
          let input = document.createElement("input");
          let span = document.createElement("span");
          input.classList.add("form-check-input", "me-1");
          label.classList.add("list-group-item", "form-check-label");
          input.type = "radio";
          input.name = "flexRadioDefault";
          span.setAttribute("id", idSpan);
          span.innerText = nombreDB;
          label.append(input, span);
          grabLista.append(label);
          contP++;
        }
      });
    });
  // LocalStorage
  let contadorCheck = localStorage.getItem("contadorCheck");
  if (contadorCheck == 4) {
    addButtons();
  }
  const grabInputs = document.querySelectorAll(".form-check-input");
  grabInputs.forEach((e) => {
    e.addEventListener("change", () => editarM.classList.remove("disabled"));
  });
};

// Variables
const btnSubir = document.querySelector("#lgForm");
export const grabLista = document.querySelector("#listaProductos");

let botonDisplay = false;
let archivo = document.querySelector("#fileItem");
let fileAll = "";
let fileName = "";
let cont = 0;

// LocalStorage

let contadorCheck = localStorage.getItem("contadorCheck");

// Toma nombre de archivo
archivo.addEventListener("change", () => {
  fileAll = archivo.files[0];
  fileName = archivo.files[0].name;
});

// Pintar productos en la lista

export let getImput = () => {
  const nameProduct = document.querySelector("#nameProduct").value;
  return nameProduct;
};

// Subir productos a firebase y actualizar lista
btnSubir.addEventListener("submit", async (e) => {
  e.preventDefault();
  const modalProduct = document.querySelector("#modalProdName");
  const modalPrice = document.querySelector("#modalProdPrice");
  let contadorCheck = localStorage.getItem("contadorCheck");
  if (contadorCheck < 4) {
    // Generar contador en localstorage
    const nameProduct = await getImput();
    // const precioProduct = document.querySelector("#precioP").value;
    var storageRef = firebase.storage().ref(`imagenes/${nameProduct}`);
    await storageRef.put(fileAll).then(function (snapshot) {
      console.log("Uploaded a blob or file!");
      localStorage.setItem(
        "contadorCheck",
        Number(localStorage.getItem("contadorCheck")) + 1
      );
    });
    pintarProductos();
    addButtons();
    btnSubir.reset();
  } else {
    alert("Esta lleno");
  }
});

//Boton editar Funciones

editarM.addEventListener("click", btnEdit);
