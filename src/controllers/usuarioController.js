var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var usuario = req.body.usuarioServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (usuario == undefined) {
        res.status(400).send("Seu usuário está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.cadastrar(usuario, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function logar(req, res) {
    var usuario = req.body.usuarioServer;
    var senha = req.body.senhaServer;

    if (!usuario || !senha) {
        return res.status(400).send("Credenciais inválidas.");
    }

    usuarioModel.logar(usuario, senha)
        .then(resultado => {

            if (!resultado) {
                return res.status(403).send("Usuário ou senha incorretos.");
            }

            res.json({
                id: resultado.id_usuario,
                nome: resultado.nome,
                email: resultado.email
            });

        })
        .catch(erro => {
            console.log("\nErro ao fazer login:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


function getInfoUser(req, res) {
    var id = req.params.id;

    if (id == undefined) {
        console.log('id está indefinido!');
    } else {
        usuarioModel.getInfoUser(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve erro ao buscar informações do usuário! ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizarEmail(req, res) {
    var id = req.params.id;
    var email = req.body.email;

    if (!id) return res.status(400).send("ID indefinido!");
    if (!email) return res.status(400).send("Email indefinido!");

    usuarioModel.atualizarEmail(id, email)
        .then(resultado => {
            if (resultado.linhas_afetadas === 0) {
                return res.status(404).json("Nenhum e-mail foi atualizado.");
            }

            res.json("E-Mail atualizado.");
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function atualizarSenha(req, res) {
    var id = req.params.id;
    var senha = req.body.senha;

    if (!id) return res.status(400).send("ID indefinido!");
    if (!senha) return res.status(400).send("Senha indefinida!");

    usuarioModel.atualizarSenha(id, senha)
        .then(resultado => {
            if (resultado.linhas_afetadas === 0) {
                return res.status(404).json("Nenhuma senha foi atualizada.");
            }

            res.json("Senha atualizada.");
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}


function deletarConta(req, res) {
    var id = req.params.id;

    if (!id) return res.status(400).send("ID indefinido!");

    usuarioModel.deletarConta(id)
        .then(resultado => {
            if (resultado.linhas_afetadas === 0) {
                return res.status(404).json("Usuário não encontrado.");
            }

            res.json("Usuário deletado.");
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}


module.exports = {
    cadastrar,
    logar,
    getInfoUser,
    atualizarEmail,
    atualizarSenha,
    deletarConta
}