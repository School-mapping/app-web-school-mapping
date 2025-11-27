var database = require("../database/config")

function carregarPerfil(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function carregarPerfil():", id);

    var instrucaoSql = `CALL SP_CarregarPerfil(${id});`;

    return database.executar(instrucaoSql)
        .then(resultado => {
            console.log("Resultado da PROC:", resultado[0]);
            return resultado[0];
        });

}

module.exports = {
    carregarPerfil
};