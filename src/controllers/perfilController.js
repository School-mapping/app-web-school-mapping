var perfilModel = require("../models/perfilModel");

function carregarPerfil(req, res) {
    var id = req.params.id;

    if (id == undefined) {
        console.log('id está indefinido!');
    } else {
        perfilModel.carregarPerfil(id)
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

module.exports = {
    carregarPerfil
}