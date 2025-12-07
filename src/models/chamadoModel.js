var database = require("../database/config");

function enviarChamado(id, assunto, descricao, tipo) {
    console.log("ACESSEI O CHAMADO MODEL - enviarChamado:", id, assunto, descricao, tipo);

    var instrucaoSql = `CALL SP_EnviarChamado(?, ?, ?);`;
    var parametros = [id, assunto, descricao];

    return database.executarComParametros(instrucaoSql, parametros)
        .then(resultado => {
            console.log("Resultado da PROC:", resultado[0][0]);
            return resultado[0][0];
        });
}

function carregarChamados(id, perfil) {
    console.log("ACESSEI O CHAMADO MODEL - carregarChamados:", id, perfil);

    var instrucaoSql = `CALL SP_CarregarChamados(?, ?);`;
    var parametros = [id, perfil];

    return database.executarComParametros(instrucaoSql, parametros)
        .then(resultado => {
            console.log("Resultado da PROC:", resultado[0]);
            return resultado[0];
        });
}

function finalizarChamado(idChamado) {
    console.log("ACESSEI O CHAMADO MODEL - finalizarChamado:", idChamado);

    var instrucaoSql = `CALL SP_FinalizarChamado(?);`;
    var parametros = [idChamado];

    return database.executarComParametros(instrucaoSql, parametros)
        .then(resultado => {
            console.log("Resultado da PROC:", resultado[0][0]);
            return resultado[0][0];
        });
}

function deletarChamado(idChamado) {
    console.log("ACESSEI O CHAMADO MODEL - deletarChamado:", idChamado);

    var instrucaoSql = `CALL SP_DeletarChamado(?);`;
    var parametros = [idChamado];

    return database.executarComParametros(instrucaoSql, parametros)
        .then(resultado => {
            console.log("Resultado da PROC:", resultado[0][0]);
            return resultado[0][0];
        });
}

module.exports = {
    enviarChamado,
    carregarChamados,
    finalizarChamado,
    deletarChamado
};