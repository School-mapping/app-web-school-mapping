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
        }).then(function (resposta) {
            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.ID_USUARIO = json.id;
                    sessionStorage.USUARIO = json.usuario;
                    sessionStorage.EMAIL_USUARIO = json.email;

                    mensagem = "<span style='color:Lime'>Login concluído! Entrando...</span>"
                    resultadoLogin.innerHTML = mensagem;
                    setTimeout(function () {
                        window.location = "./dash.html";
                    }, 1500); // apenas para exibir o loading

                });

            } else {
                mensagem = "<span style='color:red'>Seu usuário ou senha estão incorretos.</span>"
                resultadoLogin.innerHTML = mensagem;

                console.log("Houve um erro ao tentar realizar o login!");
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
}