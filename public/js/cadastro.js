// VAR GLOBAIS
let usuario = "";
let email = "";
let senha = "";
let confirmar = "";

// FLAGS
var validacaoUsuario;
var validacaoEmail;
var validacaoSenha;
var validacaoConfirmar;

function verificarUsuario() {

    validacaoUsuario = false;

    usuario = inputUsuario.value;
    var mensagemUsuario = "";

    if (usuario == "") {
        mensagemUsuario = "<span style='color:red'>Digite o nome de usuário.</span>";
        resultadoUsuario.innerHTML = mensagemUsuario;
        return;
    }

    if (usuario.length < 3 || usuario.length > 20) {
        mensagemUsuario = "<span style='color:red'>O nome deve ter entre 3 e 20 caracteres.</span>";
        resultadoUsuario.innerHTML = mensagemUsuario;
        return;
    }

    mensagemUsuario = "<span style='color:Lime'>Nome válido.</span>";
    validacaoUsuario = true;
    resultadoUsuario.innerHTML = mensagemUsuario;
}

function verificarEmail() {

    validacaoEmail = false;

    email = inputEmail.value;
    var mensagemEmail = "";

    if (email == "") {
        mensagemEmail = "<span style='color:red'>E-Mail é obrigatório.</span>";
        resultadoEmail.innerHTML = mensagemEmail;
        return;
    }

    if (!email.includes(".") || !email.includes("@") || (email.length < 8 || email.length > 100)) {
        mensagemEmail = "<span style='color:red'>E-Mail inválido.</span>";
        resultadoEmail.innerHTML = mensagemEmail;
        return;
    }

    mensagemEmail = "<span style='color:Lime'>E-Mail válido.</span>";
    validacaoEmail = true;
    resultadoEmail.innerHTML = mensagemEmail;
}

function verificarSenha() {

    validacaoSenha = false;

    senha = inputSenha.value;
    var mensagemSenha = "";

    if (senha == "") {
        mensagemSenha = "<span style='color:red'>Senha é obrigatório.</span>";
        resultadoSenha.innerHTML = mensagemSenha;
        return;
    }

    if (senha.length < 6) {
        mensagemSenha = "<span style='color:red'>Senha deve conter pelo menos 6 caracteres.</span>";
        resultadoSenha.innerHTML = mensagemSenha;
        return;
    }

    var senhaMinuscula = senha.toLowerCase();

    if (senha === senhaMinuscula) {
        mensagemSenha = "<span style='color:red'>Senha deve conter pelo menos 1 letra maiúscula.</span>";
        resultadoSenha.innerHTML = mensagemSenha;
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
        resultadoSenha.innerHTML = mensagemSenha;
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
        resultadoSenha.innerHTML = mensagemSenha;
        return;
    }

    mensagemSenha = "<span style='color:Lime'>Senha válida.</span>";
    resultadoSenha.innerHTML = mensagemSenha;
    validacaoSenha = true;
}

function verificarConfirmar() {

    validacaoConfirmar = false;

    confirmar = inputConfirmar.value;
    var mensagemConfirmar = "";

    if (!validacaoSenha) {
        mensagemConfirmar = "<span style='color:red'>Senha inválida.</span>";
        resultadoConfirma.innerHTML = mensagemConfirmar;
        return;
    }

    if (senha != confirmar) {
        mensagemConfirmar = "<span style='color:red'>Senhas não são iguais.</span>";
        resultadoConfirma.innerHTML = mensagemConfirmar;
        return;
    }

    mensagemConfirmar = "<span style='color:Lime'>Senha válida.</span>";
    validacaoConfirmar = true;
    resultadoConfirma.innerHTML = mensagemConfirmar;
}

function cadastrar() {

    if (validacaoUsuario && validacaoEmail && validacaoSenha && validacaoConfirmar) {

        var usuarioVar = usuario;
        var emailVar = email;
        var senhaVar = senha;

        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usuarioServer: usuarioVar,
                emailServer: emailVar,
                senhaServer: senhaVar
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    console.log('Credenciais enviadas para o backend.')
                    document.getElementById("mensagemCadastro").style.display = "block";
                    return resposta.json();
                } else {
                    throw "Erro ao finalizar cadastro!";
                }
            })
            .then(function (dadosCadastro) {
                const idUsuario = dadosCadastro.id_usuario; 
                sessionStorage.setItem("ID_USUARIO", idUsuario);

                setTimeout(() => {
                    window.location = "token.html";
                }, 1500);
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        return false;
    } else {
        console.error("CADASTRO NÃO REALIZADO.\nAS VALIDAÇÕES DAS CREDENCIAIS NÃO FORAM ATENDIDAS.")
    }
}