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

    if (usuario == undefined) {
        res.status(400).send("Seu usuário está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.logar(usuario, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                            res.json({
                                id: resultadoAutenticar[0].id,
                                usuario: resultadoAutenticar[0].usuario,
                                email: resultadoAutenticar[0].email
                            });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
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

    if (id == undefined) {
        console.log("id está indefinido!");
    } else if (email == undefined) {
        console.log("E-Mmail está indefinido!");
    } else {
        usuarioModel.atualizarEmail(id, email)
        .then(
            function () {
                res.json("E-Mail atualizado.");
            }
        ).catch(
            function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

function atualizarSenha(req, res) {
    var id = req.params.id;
    var senha = req.body.senha;

    if (id == undefined) {
        console.log("id está indefinido!");
    } else if (senha == undefined) {
        console.log("Senha está indefinido!");
    } else {
        usuarioModel.atualizarSenha(id, senha)
        .then(
            function () {
                res.json("Senha atualizada.");
            }
        ).catch(
            function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

function deletarConta(req, res) {
    var id = req.params.id;

    if (id == undefined) {
        console.log("id está indefinido!");
    } else {
        usuarioModel.deletarConta(id)
        .then(
            function () {
                res.json("Usuário deletado.");
            }
        ).catch(
            function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}


module.exports = {
    cadastrar,
    logar,
    getInfoUser,
    atualizarEmail,
    atualizarSenha,
    deletarConta
}