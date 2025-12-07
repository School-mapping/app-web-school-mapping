var razaoSocialOk = false;
var cnpjOk = false;
var emailOk = false;
var telefoneOk = false;

function validarRazaoSocial() {
    var razaoSocial = document.getElementById("empresa-nome").value;

    if (razaoSocial.length < 4 || razaoSocial.length > 60) {
        document.getElementById("mensagem-razao-social").style.color = "red";
        document.getElementById("mensagem-razao-social").innerHTML = "Menor que 4 ou maior que 60 letras.";
        razaoSocialOk = false;
    } else {
        document.getElementById("mensagem-razao-social").style.color = "green";
        document.getElementById("mensagem-razao-social").innerHTML = "Ok.";
        razaoSocialOk = true;
    }
}

function validarCnpj() {
    var cnpj = document.getElementById("empresa-cnpj").value;

    if (cnpj.length != 14) {
        document.getElementById("mensagem-cnpj").style.color = "red";
        document.getElementById("mensagem-cnpj").innerHTML = "CNPJ deve ter 14 digitos.";
        cnpjOk = false;
    } else {
        document.getElementById("mensagem-cnpj").style.color = "green";
        document.getElementById("mensagem-cnpj").innerHTML = "Ok.";
        cnpjOk = true;
    }
}

function validarEmail() {
    var email = document.getElementById("empresa-email").value;

    if (!email.includes(".") || !email.includes("@")) {
        document.getElementById("mensagem-email").style.color = "red";
        document.getElementById("mensagem-email").innerHTML = "Email inválido.";
        emailOk = false;
    } else {
        document.getElementById("mensagem-email").style.color = "green";
        document.getElementById("mensagem-email").innerHTML = "Ok.";
        emailOk = true;
    }
}

function validarTelefone() {
    var telefone = document.getElementById("empresa-telefone").value;

    if (telefone.length != 11) {
        document.getElementById("mensagem-telefone").style.color = "red";
        document.getElementById("mensagem-telefone").innerHTML = "Telefone inválido (11 caracteres)";
        telefoneOk = false;
    } else {
        document.getElementById("mensagem-telefone").style.color = "green";
        document.getElementById("mensagem-telefone").innerHTML = "Ok.";
        telefoneOk = true;
    }
}

function cadastrarUmaEmpresa() {
    document.getElementById("adicionar-empresa").style.display = "block"
    document.getElementById("update-empresa").style.display = "none"
    document.getElementById("deletar-empresa").style.display = "none";
}

function gerarToken() {
    return Math.random().toString(36).substring(2, 12);
}

function salvarEmpresa() {
    var razaoSocial = document.getElementById("empresa-nome").value;
    var cnpj = document.getElementById("empresa-cnpj").value;
    var email = document.getElementById("empresa-email").value;
    var telefone = document.getElementById("empresa-telefone").value;

    if (razaoSocialOk && cnpjOk && emailOk && telefoneOk) {

        fetch("/empresas/cadastrarEmpresa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                razaoSocialServer: razaoSocial,
                cnpjServer: cnpj,
                emailServer: email,
                telefoneServer: telefone
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (!resposta.ok) {
                    throw "Erro ao cadastrar empresa!";
                }

                return resposta.json();
            })
            .then(function (dadosEmpresa) {

                const idEmpresa = dadosEmpresa.id_empresa;
                const tokenEmpresa = gerarToken();
                console.log("token gerado: ", tokenEmpresa);

                return fetch("/empresas/gerarToken", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        tokenServer: tokenEmpresa,
                        idEmpresaServer: idEmpresa
                    })
                });
            })
            .then(function (respostaToken) {

                console.log("Segunda resposta: ", respostaToken);

                if (!respostaToken.ok) {
                    throw "Erro ao salvar token!";
                }

                console.log("Token salvo com sucesso!");

                setTimeout(() => {
                    window.location = "empresas.html";
                }, 1500);
            })
            .catch(function (erro) {
                console.error("Erro na requisição:", erro);
            });

    } else {
        console.error("Credenciais para cadastrar a empresa estão incorretas.");
    }
}

function sairEmpresa() {
    document.getElementById("empresa-nome").value = "";
    document.getElementById("empresa-cnpj").value = "";
    document.getElementById("empresa-email").value = "";
    document.getElementById("empresa-telefone").value = "";
    document.getElementById("adicionar-empresa").style.display = "none";
}

// ---------------------------

var agregadorEmpresas = [];

function carregarEmpresas() {

    fetch(`/empresas/carregarEmpresas`, {
        method: "GET",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(function (resposta) {
            console.log(resposta);

            if (resposta.ok) {
                console.log('Busquei informações no banco', resposta)
                return resposta.json();

            } else {
                throw "Erro ao buscar dados no data base";
            }
        })
        .then(function (empresasList) {
            console.log(empresasList)

            for (var i = 0; i < empresasList.length; i++) {
                var empresaAtual = empresasList[i];
                agregadorEmpresas = empresasList;

                var tabelaEmpresas = document.getElementById("tabela-empresas");

                var novaTr = document.createElement("tr");

                novaTr.innerHTML = `
                    <td>${empresaAtual.razao_social}</td>
                    <td>${empresaAtual.cnpj}</td>
                    <td>${empresaAtual.email}</td>
                    <td>${empresaAtual.telefone}</td>
                    <td>${empresaAtual.token}</td>
                    <td
                        ><button class="botaoEditar" 
                                data-id="${empresaAtual.id}"
                                onclick="atualizarEmpresa(this)">
                                <img src="../assets/icon_att.png" />
                        </button>
                    </td>
                    <td>
                        <button class="botaoRemover" 
                                data-id="${empresaAtual.id}"
                                onclick="removerEmpresa(this)">
                                <img src="../assets/cancel.png">
                        </button>
                    </td>
                `;

                tabelaEmpresas.appendChild(novaTr);
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

// ---------------------------

var razaoSocialAtualizarOk = false;
var cnpjAtualizarOk = false;
var emailAtualizarOk = false;
var telefoneAtualizarOk = false;

function validarRazaoSocialAtualizar() {
    var razaoSocial = document.getElementById("empresa-nome-atualizar").value;

    if (razaoSocial.length < 4 || razaoSocial.length > 60) {
        document.getElementById("mensagem-razao-social-atualizar").style.color = "red";
        document.getElementById("mensagem-razao-social-atualizar").innerHTML = "Menor que 4 ou maior que 60 letras.";
        razaoSocialAtualizarOk = false;
    } else {
        document.getElementById("mensagem-razao-social-atualizar").style.color = "green";
        document.getElementById("mensagem-razao-social-atualizar").innerHTML = "Ok.";
        razaoSocialAtualizarOk = true;
    }
}

function validarCnpjAtualizar() {
    var cnpj = document.getElementById("empresa-cnpj-atualizar").value;

    if (cnpj.length != 14) {
        document.getElementById("mensagem-cnpj-atualizar").style.color = "red";
        document.getElementById("mensagem-cnpj-atualizar").innerHTML = "CNPJ deve ter 14 digitos.";
        cnpjAtualizarOk = false;
    } else {
        document.getElementById("mensagem-cnpj-atualizar").style.color = "green";
        document.getElementById("mensagem-cnpj-atualizar").innerHTML = "Ok.";
        cnpjAtualizarOk = true;
    }
}

function validarEmailAtualizar() {
    var email = document.getElementById("empresa-email-atualizar").value;

    if (!email.includes(".") || !email.includes("@")) {
        document.getElementById("mensagem-email-atualizar").style.color = "red";
        document.getElementById("mensagem-email-atualizar").innerHTML = "Email inválido.";
        emailAtualizarOk = false;
    } else {
        document.getElementById("mensagem-email-atualizar").style.color = "green";
        document.getElementById("mensagem-email-atualizar").innerHTML = "Ok.";
        emailAtualizarOk = true;
    }
}

function validarTelefoneAtualizar() {
    var telefone = document.getElementById("empresa-telefone-atualizar").value;

    if (telefone.length != 11) {
        document.getElementById("mensagem-telefone-atualizar").style.color = "red";
        document.getElementById("mensagem-telefone-atualizar").innerHTML = "Telefone inválido (11 caracteres)";
        telefoneAtualizarOk = false;
    } else {
        document.getElementById("mensagem-telefone-atualizar").style.color = "green";
        document.getElementById("mensagem-telefone-atualizar").innerHTML = "Ok.";
        telefoneAtualizarOk = true;
    }
}

var empresaDesejada;

function atualizarEmpresa(botao) {
    document.getElementById("update-empresa").style.display = "block"
    document.getElementById("adicionar-empresa").style.display = "none"
    document.getElementById("deletar-empresa").style.display = "none";

    console.log(`botao id ${botao.dataset.id}`)

    for (var i = 0; i < agregadorEmpresas.length; i++) {
        if (botao.dataset.id == agregadorEmpresas[i].id) {
            empresaDesejada = agregadorEmpresas[i]
            break;
        }
    }

    console.log("empresa desejada: ", empresaDesejada);

    document.getElementById("empresa-nome-atualizar").value = empresaDesejada.razao_social;
    document.getElementById("empresa-cnpj-atualizar").value = empresaDesejada.cnpj;
    document.getElementById("empresa-email-atualizar").value = empresaDesejada.email;
    document.getElementById("empresa-telefone-atualizar").value = empresaDesejada.telefone;

    razaoSocialAtualizarOk = true;
    cnpjAtualizarOk = true;
    emailAtualizarOk = true;
    telefoneAtualizarOk = true;
}

function salvarAtualizarEmpresa() {

    var razaoSocial = document.getElementById("empresa-nome-atualizar").value;
    var cnpj = document.getElementById("empresa-cnpj-atualizar").value;
    var email = document.getElementById("empresa-email-atualizar").value;
    var telefone = document.getElementById("empresa-telefone-atualizar").value;

    var id = empresaDesejada.id

    if (razaoSocialAtualizarOk && cnpjAtualizarOk && emailAtualizarOk && telefoneAtualizarOk) {

        fetch(`/empresas/salvarAtualizarEmpresa/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                razaoSocialServer: razaoSocial,
                cnpjServer: cnpj,
                emailServer: email,
                telefoneServer: telefone
            })
        })
            .then(function (resposta) {
                console.log(resposta);

                if (resposta.ok) {
                    console.log('Busquei informações da empresa', resposta)

                    setTimeout(() => {
                        window.location = "empresas.html";
                    }, 1500);
                } else {
                    throw "Erro ao atualizar empresa.";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    } else {
        console.error("Credenciais para atualizar a empresa estão incorretas.")
    }
}

function sairAtualizarEmpresa() {
    document.getElementById("empresa-nome-atualizar").value = "";
    document.getElementById("empresa-cnpj-atualizar").value = "";
    document.getElementById("empresa-email-atualizar").value = "";
    document.getElementById("empresa-telefone-atualizar").value = "";
    document.getElementById("update-empresa").style.display = "none";
}

// --------------------------

function removerEmpresa(botao) {
    document.getElementById("deletar-empresa").style.display = "flex";
    document.getElementById("adicionar-empresa").style.display = "none";
    document.getElementById("update-empresa").style.display = "none";

    console.log(`botao id ${botao.dataset.id}`)

    for (var i = 0; i < agregadorEmpresas.length; i++) {
        if (botao.dataset.id == agregadorEmpresas[i].id) {
            empresaDesejada = agregadorEmpresas[i]
            break;
        }
    }

    document.getElementById("mensagem-remover").innerHTML = `Deseja remover a empresa ${empresaDesejada.razao_social}?`;

    console.log("empresa desejada: ", empresaDesejada);
}

function deletarEmpresa() {

    var id = empresaDesejada.id;

    fetch(`/empresas/deletarEmpresa/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(function (resposta) {
            console.log(resposta);

            if (resposta.ok) {
                console.log('Busquei informações da empresa', resposta)
                console.log('Empresa deletada.')
                setTimeout(() => {
                    window.location = "empresas.html"
                }, 1500);
            } else {
                throw "Erro ao tentar deletar conta.";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function cancelarRemoverEmpresa() {
    document.getElementById("deletar-empresa").style.display = "none";
    document.getElementById("adicionar-empresa").style.display = "none";
    document.getElementById("update-empresa").style.display = "none";
}