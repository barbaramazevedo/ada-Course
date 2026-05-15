document.getElementById("btnLoading")
    .addEventListener("click", e => {
        e.target.textContent = "Carregando...";
    
        setTimeout(() => {
            e.target.textContent = "Enviado"
        }, 2000)


        setTimeout(() => {
        document.getElementById("TextoEnviado")
            .textContent = "O arquivo foi enviado com sucesso";
        }, 2500);
});


let contador = 0;
const number = document.getElementById("numberCounter")

function add() {
    contador++;
    number.textContent = contador;
}

function deduct() {
    contador--;
    number.textContent = contador;
}

document.getElementById("btnAdd").addEventListener("click", add);
document.getElementById("btnDeduct").addEventListener("click", deduct);