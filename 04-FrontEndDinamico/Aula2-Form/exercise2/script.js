//Não permitir a adição de um item vazio ou com menos de duas letras.
//Limpar o input após adicionar um item.
//Remover um item ao clicar sobre ele.

const input = document.querySelector("input#input");
const button = document.querySelector("button");
const lista = document.querySelector("#lista");

button.addEventListener("click", (event) => {
  if (input.value.length <= 2 ){
    window.alert("O item deve ter mais que 2 letras")
  } else {
    const novoItem = document.createElement("li");
    novoItem.textContent = input.value;    
    lista.appendChild(novoItem);

    //rempve o item adicionado ao clicar nele
    novoItem.addEventListener("click", removerItem);

    //remove o valor que estiver digitado no input
    input.value = "";
  }
});

function removerItem(event) {
  lista.removeChild(event.target);
}