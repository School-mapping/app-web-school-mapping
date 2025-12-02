var database = require("../database/config");

function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL - cadastrar:", nome, email, senha);

    var instrucaoSql = `CALL SP_CadastrarUsuario(?, ?, ?, ?);`;
    var parametros = [nome, email, senha, 1];

    return database.executarComParametros(instrucaoSql, parametros)
    .then(resultado => {
        console.log("Resultado da PROC:", resultado[0][0]);
        return resultado[0][0];
    });

}

function vincular(idUsuario, token) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function vincular(): ", idUsuario, token)
    var instrucaoSql = `
        UPDATE TB_Usuarios SET id_empresa = (SELECT id_empresa FROM TB_Tokens WHERE token = '${token}') WHERE id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function logar(usuario, senha) {
    console.log("ACESSEI O USUARIO MODEL - logar:", usuario, senha);

    var instrucaoSql = `CALL SP_LogarUsuario(?, ?);`;

    var parametros = [usuario, senha];

    return database.executarComParametros(instrucaoSql, parametros)
        .then(resultado => {
            return resultado[0][0];
        });
    }

function getInfoUser(id) {
    console.log("ACESSEI O USUARIO MODEL - getInfoUser:", id);

    var instrucaoSql = `
        SELECT id, nome, email, senha, 
               date_format(data_cadastro, '%d/%m/%Y') as criado_em
        FROM TB_Usuarios 
        WHERE id = ?;
    `;
    var parametros = [id];

    return database.executarComParametros(instrucaoSql, parametros);
}

function atualizarEmail(id, email) {
    console.log("ACESSEI O USUARIO MODEL - atualizarEmail:", id, email);

    var instrucaoSql = `CALL SP_AtualizarEmail(?, ?);`;
    var parametros = [id, email];

    return database.executarComParametros(instrucaoSql, parametros)
        .then(resultado => {
            return resultado[0][0];
        });
}

function atualizarSenha(id, senha) {
    console.log("ACESSEI O USUARIO MODEL - atualizarSenha:", id, senha);

    var instrucaoSql = `CALL SP_AtualizarSenha(?, ?);`;

    var parametros = [id, senha];

    return database.executarComParametros(instrucaoSql, parametros)
        .then(resultado => {
            return resultado[0][0]; 
        });

}

function deletarConta(id) {
    console.log("ACESSEI O USUARIO MODEL - deletarConta:", id);

    var instrucaoSql = `CALL SP_DeletarUsuario(?);`;
    var parametros = [id];

    return database.executarComParametros(instrucaoSql, parametros)
        .then(resultado => {
            return resultado[0][0]; 
        });
}

module.exports = {
    cadastrar,
    logar,
    vincular,
    getInfoUser,
    atualizarEmail,
    atualizarSenha,
    deletarConta
};
