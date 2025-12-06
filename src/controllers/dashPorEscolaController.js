var dashPorEscolaModel = require("../models/dashPorEscolaModel");

function listarEscolas(req, res) {

    dashPorEscolaModel.listarEscolas()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao ler dados para a lista de escolas Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function carregarDadosDashboard(req, res) {

    const id_escola = req.params.id;

    dashPorEscolaModel.carregarDadosDashboard(id_escola)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar dados de escola Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function carregarKpiRank(req, res) {

    dashPorEscolaModel.carregarKpiRank(res)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar dados de ranking de escola Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarEscolas,
    carregarDadosDashboard,
    carregarKpiRank
}