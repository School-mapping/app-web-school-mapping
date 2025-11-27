var database = require("../database/config")

function cadastrarEmpresa(razaoSocial, cnpj, email, telefone) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", razaoSocial, cnpj, email, telefone);

    var instrucaoSql = `
            INSERT INTO TB_Empresas (razao_social, cnpj, email, telefone) VALUES ('${razaoSocial}', '${cnpj}', '${email}', '${telefone}');
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function carregarEmpresas() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function carregarEmpresas():");

    var instrucaoSql = `
            SELECT id, razao_social, cnpj, email, telefone FROM TB_Empresas;
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function salvarAtualizarEmpresa(id, razaoSocial, cnpj, email, telefone) {
     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function salvarAtualizarEmpresa():", id, razaoSocial, cnpj, email, telefone);

    var instrucaoSql = `
            UPDATE TB_Empresas SET razao_social = "${razaoSocial}", cnpj = "${cnpj}", email = "${email}", telefone = "${telefone}" WHERE id = ${id};
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarEmpresa(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarEmpresa():", id);

    var instrucaoSql = `
            DELETE FROM TB_Empresas WHERE id = ${id};
            `
            console.log("Executando a instrução SQL: \n" + instrucaoSql);
            return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarEmpresa,
    carregarEmpresas,
    salvarAtualizarEmpresa,
    deletarEmpresa
};