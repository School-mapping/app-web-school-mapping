var dashPrincipalModel = require("../models/dashPrincipalModel");

function carregarGraficoBarra(req, res) {

    dashPrincipalModel.carregarGraficoBarra()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao ler dados para o grafico de colunas! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarMediaFluxoZona(req, res) {
    dashPrincipalModel.buscarMediaFluxoZona()
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao ler dados para o grafico de Bidirecional! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function carregarGraficoBidirecional(req, res) {

    dashPrincipalModel.carregarGraficoBidirecional()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao ler dados para o grafico de Bidirecional! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarSomaPtrf(req, res) {

    dashPrincipalModel.buscarSomaPtrf()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao ler dados para o grafico de colunas! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


module.exports = {
    carregarGraficoBarra,
    carregarGraficoBidirecional,
    buscarSomaPtrf,
    buscarMediaFluxoZona
}