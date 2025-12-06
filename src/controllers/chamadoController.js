var chamadoModel = require("../models/chamadoModel");

function enviarChamado(req, res) {
    var id = req.body.idServer
    var assunto = req.body.assuntoServer;
    var descricao = req.body.descricaoServer;

    if (id == undefined) {
        console.log("id está indefinido!")
    } else if (assunto == undefined) {
        console.log("Assunto está indefinido!");
    } else if (descricao == undefined) {
        console.log("descricao está indefinido!")
    } else {
        chamadoModel.enviarChamado(id, assunto, descricao)
            .then(
                function () {
                    res.json("Chamado enviado.");
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

function carregarChamados(req, res) {

    var id = req.params.idUsuario;
    var perfil = req.params.perfil;

    if (id == undefined) {
        console.log("id está indefinido!");
    } else if (perfil == undefined) {
        console.log("perfil está indefinido!");
    } else {
        chamadoModel.carregarChamados(id, perfil)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function finalizarChamado(req, res) {
    var idChamado = req.params.idChamado;

    if (idChamado == undefined) {
        console.log("ID do chamado está indefinido!");
    } else {
        chamadoModel.finalizarChamado(idChamado)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function deletarChamado(req, res) {
    var idChamado = req.params.idChamado;

    if (idChamado == undefined) {
        console.log("ID do chamado está indefinido!");
    } else {
        chamadoModel.deletarChamado(idChamado)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    enviarChamado,
    carregarChamados,
    finalizarChamado,
    deletarChamado
}