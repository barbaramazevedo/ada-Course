const form = document.querySelector("form");
const erroEmail = document.querySelector("#erroLoginEmail");
const erroSenha = document.querySelector("#erroLoginSenha");

function showAlert(id) {
    const alerta = document.getElementById(id);
    alerta.classList.remove("alert-hidden");
    alerta.classList.add("alert-visivel");

    setTimeout(() => {
        alerta.classList.remove("alert-visivel");
        alerta.classList.add("alert-hidden");
    }, 2000);
}

function loginUser(email, senha) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(user => user.email === email && user.senha === senha);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let formularioValido = true;

    erroEmail.textContent = "";
    erroSenha.textContent = "";
    document.getElementById("inputLoginEmail").style.border = "";
    document.getElementById("inputLoginSenha").style.border = "";

    const email = document.querySelector("#inputLoginEmail").value;
    if (!email) {
        erroEmail.textContent = "Campo obrigatório";
        formularioValido = false;
        document.getElementById("inputLoginEmail").style.border = "solid 2px red";
    }

    const senha = document.querySelector("#inputLoginSenha").value;
    if (!senha) {
        erroSenha.textContent = "Campo obrigatório";
        formularioValido = false;
        document.getElementById("inputLoginSenha").style.border = "solid 2px red";
    } else if (senha.length < 6) {
        erroSenha.textContent = "A senha deve ter 6 dígitos ou mais.";
        formularioValido = false;
        document.getElementById("inputLoginSenha").style.border = "solid 2px red";
    }

    if (formularioValido) {
        if (loginUser(email, senha)) {
            showAlert("loginAlert");
            setTimeout(() => window.location.href = "../home/index.html", 2000);
        } else {
            showAlert("loginAlertError");
        }
    }
});

