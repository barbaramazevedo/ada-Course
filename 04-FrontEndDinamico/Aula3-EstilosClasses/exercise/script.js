//REFATORANDO
const inputLista = document.querySelector("input#input");
const button = document.querySelector("#add");
const lista = document.querySelector("#lista");

function toggleConluido(event) {
  const checkboxItem = event.target;
  const spanItem = checkboxItem.nextElementSibling;
  const concluido = checkboxItem.checked;

  spanItem.classList.toggle("checked", concluido);
  checkboxItem.classList.toggle("checked", concluido);  
}

// function criarItem(texto) {
  
// }

// function adicionarItem() {
//   if (inputLista.value.length <= 2 ){
//     window.alert("O item deve ter mais que 2 letras")
//   } else {
//     lista.appendChild(criarItem(inputLista.value));
//     inputLista.value = ""; //serve para limpar o campo de texto
//   }
// }

function removerItem(event) {
  lista.removeChild(event.target.parentElement);
}

// ---------------------- ADICIONANDO ESTILO ---------------------

const styleTag = document.createElement("style");

styleTag.innerHTML = `
  body {
    background-color: #ece0e0;
    color: #000000;
    margin: 2rem;
    width: 50%;
  }
`;

document.querySelector("head").appendChild(styleTag)

//Estilo checked(linha por cima) para itens concluídos




button.addEventListener("click", (event) => {
  if (inputLista.value.length <= 2 ){
    window.alert("O item deve ter mais que 2 letras")
  } else {
    const novoItem = document.createElement("li");

    const checkboxItem = document.createElement("input");
    checkboxItem.setAttribute("type", "checkbox");

    const textItem = document.createElement("span");
    textItem.textContent = inputLista.value;    

    const removeButtonItem = document.createElement("button")
    removeButtonItem.textContent = "x";


    // Inserindo o checkbox, o texto e o botão de remover na li (novoItem)
    novoItem.insertAdjacentElement("beforeend", checkboxItem);
    novoItem.insertAdjacentElement("beforeend", textItem);
    novoItem.insertAdjacentElement("beforeend", removeButtonItem);

    lista.appendChild(novoItem);
    //rempve o item adicionado ao clicar nele
    removeButtonItem.addEventListener("click", removerItem);

    checkboxItem.addEventListener("click", toggleConluido);

    //remove o valor que estiver digitado no input
    inputLista.value = "";
  }
});