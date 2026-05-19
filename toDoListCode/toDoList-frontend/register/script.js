const form = document.querySelector("form");
const erroNome = document.querySelector("#erro-nome");
const erroEmail = document.querySelector("#erro-email");
const erroSenha = document.querySelector("#erro-senha");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let formularioValido = true;

    // limpando o estado dos erros
    erroNome.textContent = "";
    erroEmail.textContent = "";
    erroSenha.textContent = "";
    document.getElementById("inputNome").style.border = "";
    document.getElementById("inputEmail").style.border = "";
    document.getElementById("inputSenha").style.border = "";
    document.getElementById("inputConfirmarSenha").style.border = "";

    // Validação campo nome
    const nome = document.querySelector("#inputNome").value;
    if (!nome) {
        erroNome.textContent = "Campo Obrigatório";
        formularioValido = false;
        document.getElementById("inputNome").style.border = "solid 2px red";
    }

    // Validação campo email
    const email = document.querySelector("#inputEmail").value;
    if (!email) {
        erroEmail.textContent = "Campo Obrigatório";
        formularioValido = false;
        document.getElementById("inputEmail").style.border = "solid 2px red";
    }

    // Validação campo de senha
    const senha = document.querySelector("#inputSenha").value;
    const senhaConfirmar = document.querySelector("#inputConfirmarSenha").value;

    if (!senha) {
        erroSenha.textContent = "Campo Obrigatório";
        formularioValido = false;
        document.getElementById("inputSenha").style.border = "solid 2px red";
    } else if (senha.length < 6) {
        erroSenha.textContent = "A senha deve ter no mínimo 6 caracteres";
        formularioValido = false;
        document.getElementById("inputSenha").style.border = "solid 2px red";
    } else if (!senhaConfirmar) {
        erroSenha.textContent = "Confirme sua senha";
        formularioValido = false;
        document.getElementById("inputConfirmarSenha").style.border = "solid 2px red";
    } else if (senha !== senhaConfirmar) {
        erroSenha.textContent = "As senhas não coincidem";
        formularioValido = false;
        document.getElementById("inputConfirmarSenha").style.border = "solid 2px red";
    }


    if (formularioValido) {
        const userCreated = addUser(nome, email, senha);

        if (userCreated) {
            showAlert("Cadastro realizado com sucesso!");
            setTimeout(() => window.location.href = "../login/index.html", 2000);
        }
    }
});

function showAlert(message) {
    const alert = document.getElementById("cadastroAlert");
    const alertMessage = document.getElementById("alertMessage");

    alertMessage.textContent = message;

    alert.classList.remove("alert-hidden");
    alert.classList.add("alert-visivel");

    setTimeout(() => {
        alert.classList.remove("alert-visivel");
        alert.classList.add("alert-hidden");
    }, 2000);
}

function showAlertError(message) {
    const alert = document.getElementById("registerAlertError");
    const alertMessage = document.getElementById("alertMessageError");

    alertMessage.textContent = message;

    alert.classList.remove("alert-hidden");
    alert.classList.add("alert-visivel");

    setTimeout(() => {
        alert.classList.remove("alert-visivel");
        alert.classList.add("alert-hidden");
    }, 2000);
}

function addUser(nome, email, senha) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExistent = users.some(
        (user) => user.email === email
    );

    if(userExistent) {
        showAlertError("Usuário existente, cadastre outro e-mail ou faça login.");
        return false;
    }

    const newUser = {
        nome,
        email,
        senha
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    return true;
}