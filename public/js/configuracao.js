var usuarioInfo = "";
var emailInfo = "";
var senhaInfo = "";
var dataInfo = "";

function getInfoUser() {
    var id = sessionStorage.ID_USUARIO;

    if (!id) {
        console.error("ID do usuário não definido no sessionStorage");
        return;
    }

    fetch(`/usuarios/getInfoUser/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(function (resposta) {
        console.log(resposta);

        if (resposta.ok) {
          console.log('Busquei informações do usuário', resposta)
          return resposta.json();
        } else {
          throw "Erro ao buscar dados no data base";
        }
    })
        .then(function (infoUser) {
            console.log(infoUser)
            bdUsuario.innerHTML = infoUser[0].usuario;
            bdEmail.innerHTML = infoUser[0].email;
            bdSenha.innerHTML = infoUser[0].senha;
            bdData.innerHTML = infoUser[0].criado_em;

            usuarioInfo = infoUser[0].usuario;
            emailInfo = infoUser[0].email;
            senhaInfo = infoUser[0].senha;
            dataInfo = infoUser[0].criado_em;

    })
        .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

let emailValido = false;

function verificarAtualizarEmail() {

    email = novoEmail.value;
    var mensagemEmail = "";

    if (email == "") {
        mensagemEmail = "<span style='color:red'>E-Mail é obrigatório.</span>";
        mensagemAtualizarEmail.innerHTML = mensagemEmail;
        return;
    }
    
    if (!email.includes(".") || !email.includes("@") || (email.length < 8 || email.length > 100)) {
        mensagemEmail = "<span style='color:red'>E-Mail inválido.</span>";
        mensagemAtualizarEmail.innerHTML = mensagemEmail;
        return;
    }

    mensagemEmail = "<span style='color:Lime'>E-Mail válido.</span>";
    emailValido = true;
    mensagemAtualizarEmail.innerHTML = mensagemEmail;
}

function atualizarEmail() {
    var senhaAtualizarEmail = confirmarSenhaEmail.value;
    var email = novoEmail.value;
    var id = sessionStorage.ID_USUARIO;

    if (emailValido) {
        if (senhaAtualizarEmail === senhaInfo) {

        fetch(`/usuarios/atualizarEmail/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email })
    })
    .then(function (resposta) {
        console.log(resposta);

        if (resposta.ok) {
          console.log('Busquei informações do usuário', resposta)
          alert("Email atualizado.");
          window.location = "configuracao.html";
        } else {
          throw "Erro ao tentar deletar conta.";
        }
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });    
        } else {

            alert("Senha incorreta.")
        }
    }
}

function voltarEmail() {
    document.getElementById("confirmarEmail").style.display= "none";
}

function deletarMensagem() {
    document.getElementById("confirmarDelete").style.display= "block";
}

function voltarDelete() {
    document.getElementById("confirmarDelete").style.display= "none";
}

function deletarConta() {
    var id = sessionStorage.ID_USUARIO;

    fetch(`/usuarios/deletarConta/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(function (resposta) {
        console.log(resposta);

        if (resposta.ok) {
          console.log('Busquei informações do usuário', resposta)
          alert("Conta excluída.");
          window.location = "cadastro.html";
        } else {
          throw "Erro ao tentar deletar conta.";
        }
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}