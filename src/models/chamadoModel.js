var database = require("../database/config")

function enviarChamado(id, assunto, descricao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function enviarChamado():", id, assunto, descricao);

    var instrucaoSql = `
            INSERT INTO TB_Chamados (id_usuario, assunto, descricao) VALUES ('${id}', '${assunto}', '${descricao}');
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function carregarChamados(id, perfil) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function carregarChamados():", id, perfil);

    if (perfil == 1) {
        var instrucaoSql = `
            SELECT 
                c.id AS id_chamado,
                u.nome AS nome,
                u.email AS email,
                p.cargo AS perfil,
                e.razao_social,
                c.assunto,
                c.descricao,
                c.status,
                DATE_FORMAT(c.data_chamado, '%d/%m/%Y') AS data_chamado
            FROM TB_Chamados c
            JOIN TB_Usuarios u ON c.id_usuario = u.id
            JOIN TB_Perfis p ON u.id_perfil = p.id
            LEFT JOIN TB_Empresas e ON u.id_empresa = e.id
            WHERE u.id = ${id}
              AND c.status != 'Descontinuado';
        `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    } else {
        var instrucaoSql = `
            SELECT 
                c.id AS id_chamado,
                u.nome AS nome,
                u.email AS email,
                p.cargo AS perfil,
                e.razao_social,
                c.assunto,
                c.descricao,
                c.status,
                DATE_FORMAT(c.data_chamado, '%d/%m/%Y') AS data_chamado
            FROM TB_Chamados c
            JOIN TB_Usuarios u ON c.id_usuario = u.id
            JOIN TB_Perfis p ON u.id_perfil = p.id
            LEFT JOIN TB_Empresas e ON u.id_empresa = e.id;
        `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }
}

function finalizarChamado(idChamado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function finalizarChamado():", idChamado);

    var instrucaoSql = `
        UPDATE TB_Chamados SET status = 'Finalizado' WHERE id = ${idChamado} AND status = 'Aberto';
    `;

    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarChamado(idChamado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarChamado():", idChamado);

    var instrucaoSql = `
        UPDATE TB_Chamados SET status = 'Descontinuado' WHERE id = ${idChamado} AND status = 'Aberto';
    `;

    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    enviarChamado,
    carregarChamados,
    finalizarChamado,
    deletarChamado
};