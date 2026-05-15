
// VERSAO 1
// const buttonAdicionar = document.querySelector("button");

// buttonAdicionar.addEventListener("click", () => {
//     window.alert("Você clicou no botão de adicionar")
// })

// VERSÁO 2
// const button = document.querySelector("button");

// function showAlert() {
//   window.alert("Você clicou no botão Adicionar!");
// }

// button.addEventListener("click", showAlert);

// VERSÁO 3
// document.querySelector("button").addEventListener("click", () => {
//     window.alert("Você clicou no botão de adicionar")
// })

// AO CLICAR NO BOTAO DISPARA ALERT
// const input = document.querySelector("input#input");

// input.addEventListener("input", (event) => {
//     console.log(event.target.value)
// });

const input = document.querySelector("input#input");
const button = document.querySelector("button");
const lista = document.querySelector("#lista");

button.addEventListener("click", (event) => {
  lista.innerHTML += `<li>${input.value}</li>`;
});