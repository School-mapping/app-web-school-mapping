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
module.exports = {
    listarEscolas
}