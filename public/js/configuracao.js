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
        cache:"no-store",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(function (resposta) {
        console.log(resposta);

        if (resposta.ok) {
          console.log('Busquei informações do usuário', resposta)
         return resposta.json()
          
        } else {
          throw "Erro ao buscar dados no data base";
        }
    })
        .then(function (infoUser) {
            console.log(infoUser)
            bdUsuario.value = infoUser[0].nome;
            bdEmail.value = infoUser[0].email;
            bdSenha.value = infoUser[0].senha;
            bdData.value = infoUser[0].criado_em;

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
          throw "Erro ao atualizar e-mail da conta.";
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

function atualizarEmailMensagem() {
    document.getElementById("confirmarEmail").style.display= "block";
}

function voltarEmail() {
    document.getElementById("confirmarEmail").style.display= "none";
}

function visualizarSenha() {
    
    if (bdSenha.type == "password") {
        bdSenha.type = "text";
        mascaraImagem.setAttribute("src", "./assets/senha_visivel.png");
    } else {
        bdSenha.type = "password"
        document.getElementById("mascaraImagem").setAttribute("src", "./assets/senha_oculta.png");
    }
}

var senhaValida = false;

function verificarAtualizarSenha() {
    senha = novaSenha.value;
    var mensagemSenha = "";

    if (senha == "") {
        mensagemSenha = "<span style='color:red'>Senha é obrigatório.</span>";
        mensagemAtualizarSenha.innerHTML = mensagemSenha;
        return;
    } 

    if (senha.length < 6) {
        mensagemSenha = "<span style='color:red'>Senha deve conter pelo menos 6 caracteres.</span>";
        mensagemAtualizarSenha.innerHTML = mensagemSenha;
        return;
    }

    var senhaMinuscula = senha.toLowerCase();
    
    if (senha === senhaMinuscula) {
        mensagemSenha = "<span style='color:red'>Senha deve conter pelo menos 1 letra maiúscula.</span>";
        mensagemAtualizarSenha.innerHTML = mensagemSenha;
        return;
    }

    if (!senha.includes("1") &&
        !senha.includes("2") &&
        !senha.includes("3") &&
        !senha.includes("4") &&
        !senha.includes("5") &&
        !senha.includes("6") &&
        !senha.includes("7") &&
        !senha.includes("8") &&
        !senha.includes("9") &&
        !senha.includes("0")) {
            mensagemSenha = "<span style='color:red'>Senha deve conter pelo menos 1 número.</span>";
            mensagemAtualizarSenha.innerHTML = mensagemSenha;
            return;
        }

    if (!senha.includes("!") &&
        !senha.includes("@") &&
        !senha.includes("#") &&
        !senha.includes("$") &&
        !senha.includes("%") &&
        !senha.includes("&") &&
        !senha.includes("*") &&
        !senha.includes("(") &&
        !senha.includes(")") &&
        !senha.includes("=") &&
        !senha.includes("=")) {
            mensagemSenha = "<span style='color:red'>Senha deve conter pelo menos 1 caractere especial.</span>";
            mensagemAtualizarSenha.innerHTML = mensagemSenha;
            return;
        }

    mensagemSenha = "<span style='color:Lime'>Senha válida.</span>";
    mensagemAtualizarSenha.innerHTML = mensagemSenha;
    senhaValida = true;
}

function atualizarSenha() {
    var senhaAtualizarSenha = confirmarSenhaSenha.value;
    var senha = novaSenha.value;
    var id = sessionStorage.ID_USUARIO;

    if (senhaValida) {
        if (senhaAtualizarSenha === senhaInfo) {

        fetch(`/usuarios/atualizarSenha/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ senha: senha })
    })
    .then(function (resposta) {
        console.log(resposta);

        if (resposta.ok) {
          console.log('Busquei informações do usuário', resposta)
          alert("Senha atualizada.");
          window.location = "configuracao.html";
        } else {
          throw "Erro ao atualizar senha da conta.";
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

function atualizarSenhaMensagem() {
    document.getElementById("confirmarSenha").style.display= "block";
}

function voltarSenha() {
    document.getElementById("confirmarSenha").style.display= "none";
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

            sessionStorage.setItem("ID_USUARIO", "")
            sessionStorage.setItem("EMAIL_USUARIO", "")
            sessionStorage.setItem("USUARIO", "")
        } else {
          throw "Erro ao tentar deletar conta.";
        }
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}