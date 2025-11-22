var database = require("../database/config")

function carregarPerfil(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function carregarPerfil():", id);

    var instrucaoSql = `
            SELECT id_perfil FROM TB_Usuarios WHERE id = ${id};
            `
            console.log("Executando a instrução SQL: \n" + instrucaoSql);
            return database.executar(instrucaoSql);
}

module.exports = {
    carregarPerfil
};