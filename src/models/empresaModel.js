var database = require("../database/config")

function cadastrarEmpresa(razaoSocial, cnpj, email, telefone) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", razaoSocial, cnpj, email, telefone);

    var instrucaoSql = `CALL SP_CadastrarEmpresa(?, ?, ?, ?);`;
    var parametros = [razaoSocial, cnpj, email, telefone];

    return database.executarComParametros(instrucaoSql, parametros)
    .then(resultado => { 
        console.log("Resultado da PROC:", resultado[0][0]);
        return resultado[0][0];
    });
}

function gerarToken(idEmpresa, tokenEmpresa) {
    console.log("ACESSEI O EMPRESA MODEL - gerarToken:", idEmpresa, tokenEmpresa);

    var instrucaoSql = `CALL SP_GerarToken(?, ?);`;
    var parametros = [idEmpresa, tokenEmpresa];

    return database.executarComParametros(instrucaoSql, parametros)
        .then(resultado => {
            console.log("Resultado da PROC:", resultado[0][0]);
            return resultado[0][0];
        });
}

function carregarEmpresas() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function carregarEmpresas():");

    var instrucaoSql = `CALL SP_CarregarEmpresas();`;

    return database.executar(instrucaoSql)
        .then(resultado => {
            console.log("Resultado da PROC:", resultado[0]);
            return resultado[0];
        });
}

function salvarAtualizarEmpresa(id, razaoSocial, cnpj, email, telefone) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function salvarAtualizarEmpresa():", id, razaoSocial, cnpj, email, telefone);

    var instrucaoSql = `CALL SP_AtualizarEmpresa(?, ?, ?, ?, ?);`;

    var parametros = [id, razaoSocial, cnpj, email, telefone];

    return database.executarComParametros(instrucaoSql, parametros)
    .then(resultado => {
        console.log("Resultado da PROC:", resultado[0][0]);
        return resultado[0][0];
    });
}

function deletarEmpresa(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarEmpresa():", id);

    var instrucaoSql = `CALL SP_DeletarEmpresa(?);`;

    var parametros = [id];

    return database.executarComParametros(instrucaoSql, parametros)
    .then(resultado => {
        console.log("Resultado da PROC:", resultado[0][0]);
        return resultado[0][0];
    });
}

module.exports = {
    gerarToken,
    cadastrarEmpresa,
    carregarEmpresas,
    salvarAtualizarEmpresa,
    deletarEmpresa
};