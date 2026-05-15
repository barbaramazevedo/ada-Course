// Um input do tipo checkbox para que o usuário possa marcar (ou desmarcar) um produto da lista como comprado.
// Uma span para incluir o nome do produto, ou seja, de fato o texto que o usuário digitar.
// E, por fim, um button que vai ter a função de remover o produto da lista. Ao invés de clicar sobre o produto para remover ele da lista, iremos remover apenas se clicarmos no botão.

const inputLista = document.querySelector("input#input");
const button = document.querySelector("button");
const lista = document.querySelector("#lista");

button.addEventListener("click", (event) => {

  if (inputLista.value.length <= 2 ){
    window.alert("O item deve ter mais que 2 letras")
  } else {
    const novoItem = document.createElement("li");
    const checkboxItem = document.createElement("input");
    const textItem = document.createElement("span");
    const removeButtonItem = document.createElement("button")

    textItem.textContent = inputLista.value;    
    checkboxItem.setAttribute("type", "checkbox");

    //Inserir estulo ao checkbox
    checkboxItem.addEventListener("click", (event) => {
      if (event.target.checked) {
        textItem.style.textDecoration = "line-through";
        textItem.style.opacity = 0.6;
        checkboxItem.style.opacity = 0.6;
      } else {
        textItem.style.textDecoration = "none";
        textItem.style.opacity = 1;
        checkboxItem.style.opacity = 1;
      }
    })

    removeButtonItem.textContent = "x";

    // Inserindo o checkbox, o texto e o botão de remover na li (novoItem)
    novoItem.insertAdjacentElement("beforeend", checkboxItem);
    novoItem.insertAdjacentElement("beforeend", textItem);
    novoItem.insertAdjacentElement("beforeend", removeButtonItem);

    lista.appendChild(novoItem);
    //rempve o item adicionado ao clicar nele
    removeButtonItem.addEventListener("click", removerItem);

    //remove o valor que estiver digitado no input
    inputLista.value = "";
  }
});

function removerItem(event) {
  lista.removeChild(event.target.parentElement);
}

document.querySelector("#btnFixedRemove").addEventListener("click", removerItem)

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

const headTag = document.querySelector("head");

headTag.appendChild(styleTag)

//Estilo checked(linha por cima) para itens concluídos
const checkboxFixed = document.getElementById("checkboxFixed");
const spanFixed = document.getElementById("spanFixed");

checkboxFixed.addEventListener("click", (event) => {
    if (event.target.checked) {
      spanFixed.style.textDecoration = "line-through";
    } else {
      spanFixed.style.textDecoration = "none"
    }
})