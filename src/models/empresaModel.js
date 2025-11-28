var database = require("../database/config")

function cadastrarEmpresa(razaoSocial, cnpj, email, telefone) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", razaoSocial, cnpj, email, telefone);

    var instrucaoSql = `
            INSERT INTO TB_Empresas (razao_social, cnpj, email, telefone) VALUES ('${razaoSocial}', '${cnpj}', '${email}', '${telefone}');
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function gerarToken(idEmpresa, tokenEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function gerarTOken():", idEmpresa, tokenEmpresa);

    var instrucaoSql = `
            INSERT INTO TB_Tokens (id_empresa, token, ativo) VALUES ('${idEmpresa}', '${tokenEmpresa}', '1');
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function carregarEmpresas() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function carregarEmpresas():");

    var instrucaoSql = `
            SELECT * FROM TB_Empresas e join TB_Tokens k on e.id = k.id_empresa;
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
            UPDATE TB_Usuarios SET id_empresa = null WHERE id_empresa = ${id}; 
            `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .then(() => {
            var instrucaoSql2 = `
                DELETE FROM TB_Tokens WHERE id_empresa = ${id};
            `
            console.log("Executando SQL (tokens):\n", instrucaoSql2);
            return database.executar(instrucaoSql2);
        })
        .then(() => {
            var instrucaoSql3 = `DELETE FROM TB_Empresas WHERE id = ${id};`;
            console.log("Executando SQL (empresa):\n", instrucaoSql3);
            return database.executar(instrucaoSql3);
        })
}

module.exports = {
    gerarToken,
    cadastrarEmpresa,
    carregarEmpresas,
    salvarAtualizarEmpresa,
    deletarEmpresa
};