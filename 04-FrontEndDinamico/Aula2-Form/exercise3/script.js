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
    removeButtonItem.textContent = "Remover";

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

document.querySelector("#btnRemove").addEventListener("click", removerItem)
