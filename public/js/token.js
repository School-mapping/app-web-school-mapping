const { link } = require("../../src/routes/empresas");

function aceitar() {
    document.getElementById("modalTokenId").style.display = "none";
    document.getElementById("modalVincularId").style.display = "flex";
}

function cancelar() {
    window.location = "login.html"
}

function sair() {
    document.getElementById("modalTokenId").style.display = "flex";
    document.getElementById("modalVincularId").style.display = "none";
}

function vincular() {

    var idUsuario = sessionStorage.getItem("ID_USUARIO");
    var token = inputToken.value;

    fetch("/usuarios/vincular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            idUsuarioServer: idUsuario,
            tokenServer: token
        })
    })
        .then(function (resposta) {
            console.log(resposta);

            if (resposta.ok && token != "") {
                console.log(resposta)
                mensagemInsertToken.innerHTML = "Sucesso!"

                setTimeout(() => {
                    window.location = "login.html";
                }, 1500)
            } else {
                mensagemInsertToken.innerHTML = "Token inválido"
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}