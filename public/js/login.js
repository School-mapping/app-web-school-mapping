let usuarioVar = "";
let senhaVar = "";
let mensagem = "";

function logar() {

    usuarioVar = inputUsuario.value;
    senhaVar = inputSenha.value;

    if (usuarioVar == "" || senhaVar == "") {

        console.error("Sem credenciais para login.");

        mensagem = "<span style='color:red'>Preencha todos os campos para fazer login!</span>"

        resultadoLogin.innerHTML = mensagem;
        return;
    }

    fetch("/usuarios/logar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuarioServer: usuarioVar,
            senhaServer: senhaVar
        })
    }).then(resposta => {
        if (!resposta.ok) throw new Error("Login inválido");
        return resposta.json();
    })
        .then(json => {
            console.log(json);
            sessionStorage.ID_USUARIO = json.id;
            sessionStorage.USUARIO = json.nome;
            sessionStorage.EMAIL_USUARIO = json.email;
            mensagem = "<span style='color:Lime'>Login concluído! Entrando...</span>";
            resultadoLogin.innerHTML = mensagem;
            setTimeout(() => { window.location = "./private/dash.html"; }, 1500);
        })
        .catch(erro => {
            console.error(erro);
            mensagem = "<span style='color:red'>Seu usuário ou senha estão incorretos.</span>";
            resultadoLogin.innerHTML = mensagem;
        });
}