var agregadosChamados = [];

function enviarChamado() {
    var idUsuario = sessionStorage.getItem("ID_USUARIO");
    // var nome = document.getElementById("nome-chamado").value;
    var assunto = document.getElementById("assunto-chamado").value;
    var descricao = document.getElementById("descricao-chamado").value;

    if (assunto.trim() !== "" && descricao.trim() !== "") {

        fetch("/chamados/enviarChamado", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idServer: idUsuario,
                assuntoServer: assunto,
                descricaoServer: descricao,
            }),
        })
            .then(function (resposta) {
                if (!resposta.ok) {
                    throw "Erro ao enviar chamado!";
                }
                return resposta.json();
            })
            .then(function (dadosChamado) {
                setTimeout(() => {
                    window.location = "testechamados.html";
                }, 1500);
            })
            .catch(function (erro) {
                console.error("Erro na requisição:", erro);
            });

    } else {
        console.error("Preencha todos os campos.");
    }
}

function finalizarChamado(botao) {
    var idChamado = botao.getAttribute("data-id");

    console.log("ID do chamado clicado:", idChamado);

    fetch(`/chamados/finalizarChamado/${idChamado}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resposta => {
            if (!resposta.ok) throw "Erro ao finalizar chamado";
            return resposta.json();
        })
        .then(res => {
            console.log("Chamado finalizado:", res);
            carregarChamados();
        })
        .catch(erro => {
            console.log("#ERRO:", erro);
        });
}

function deletarChamado(botao) {
    var idChamado = botao.getAttribute("data-id");

    console.log("ID do chamado clicado:", idChamado);

    fetch(`/chamados/deletarChamado/${idChamado}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resposta => {
            if (!resposta.ok) throw "Erro ao deletar chamado";
            return resposta.json();
        })
        .then(res => {
            console.log("Chamado deletado:", res);
            carregarChamados();
        })
        .catch(erro => {
            console.log("#ERRO:", erro);
        });
}