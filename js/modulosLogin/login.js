// Modulos
import { crearUsuario } from "./crearUsuarios.js";
import { loginUser } from "./loginUsuario.js";
import { recuperarContra } from "./recuperarContraseña.js";

// Alertas
export const grabAlertEmail = document.querySelector("#alertaEmail");
export const grabAlertVerificar = document.querySelector("#alertaVerificar");
export const grabAlertWelcome = document.querySelector("#Bienvenido");
export const grabAlertRecu = document.querySelector("#alertaRecuperar");

// Usuario persistente
export let userEmail = document.querySelector("#email");
export let password = document.querySelector("#pass");

firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(userEmail.value, password.value);
  });

//Create login
const formCreateUsr = document.querySelector("#usr-form");
formCreateUsr.addEventListener("submit", crearUsuario);

//User login
const loginF = document.querySelector("#lgForm");
loginF.addEventListener("submit", loginUser);

// Recuperar contraseña
const btnRecu = document.querySelector("#enviarMail");
export const inputRecu = document.querySelector("#emailRecu");

btnRecu.addEventListener("click", recuperarContra);

//Google login
const googleAcc = document.querySelector("#googleAcc");

googleAcc.addEventListener("click", (e) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => {
      location.href = "./index.html";
    })
    .catch((error) => {
      console.log(error.message);
    });
});
