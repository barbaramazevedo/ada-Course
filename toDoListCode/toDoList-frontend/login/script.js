const form = document.querySelector("form");
const erroEmail = document.querySelector("#erroLoginEmail");
const erroSenha = document.querySelector("#erroLoginSenha");

function showAlert() {
    const alerta = document.getElementById("loginAlert");

    alerta.classList.remove("alert-hidden");
    alerta.classList.add("alert-visivel");

    setTimeout(() => {
        alerta.classList.remove("alert-visivel");
        alerta.classList.add("alert-hidden");
    }, 2000);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let formularioValido = true;

    // limpando o estado dos erros
    erroEmail.textContent = "";
    erroSenha.textContent = "";
    document.getElementById("inputLoginEmail").style.border = "";
    document.getElementById("inputLoginSenha").style.border = "";

    // Validação campo email
    const email = document.querySelector("#inputLoginEmail").value;
    if (!email) {
        erroEmail.textContent = "Campo obrigatório";
        formularioValido = false;
        document.getElementById("inputLoginEmail").style.border = "solid 2px red";
    }


    // Validação campo senha
    const senha = document.querySelector("#inputLoginSenha").value;
    if (!senha) {
        erroSenha.textContent = "Campo obrigatório";
        formularioValido = false;
        document.getElementById("inputLoginEmail").style.border = "solid 2px red";
    } else if (senha.length < 6) {
        erroSenha.textContent = "A senha deve ter 6 dígitos ou mais.";
        formularioValido = false;
        document.getElementById("inputLoginEmail").style.border = "solid 2px red";
    }


    if (formularioValido) {
       showAlert();
    }
})

