var database = require("../database/config")

function cadastrar(usuario, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", usuario, email, senha);
    
    var instrucaoSql = `
        INSERT INTO TB_Usuarios (usuario, email, senha) VALUES ('${usuario}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function logar(usuario, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", usuario, senha)
    var instrucaoSql = `
        SELECT id, usuario, email, senha FROM TB_Usuarios WHERE usuario = '${usuario}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getInfoUser(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getInfoUser():", id);

    var instrucaoSql = `
            SELECT id, 
                usuario, 
                email, 
                senha, 
                date_format(criado_em, '%d/%m/%Y') as criado_em
            FROM TB_Usuarios WHERE id = ${id};
            `
            console.log("Executando a instrução SQL: \n" + instrucaoSql);
            return database.executar(instrucaoSql);
}

function atualizarEmail(id, email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarEmail():", id, email);

    var instrucaoSql = `
            UPDATE TB_Usuarios SET email = "${email}" WHERE id = ${id};
            `
            console.log("Executando a instrução SQL: \n" + instrucaoSql);
            return database.executar(instrucaoSql);
}

function atualizarSenha(id, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarSenha():", id, senha);

    var instrucaoSql = `
            UPDATE TB_Usuarios SET senha = "${senha}" WHERE id = ${id};
            `
            console.log("Executando a instrução SQL: \n" + instrucaoSql);
            return database.executar(instrucaoSql);
}

function deletarConta(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarConta():", id);

    var instrucaoSql = `
            DELETE FROM TB_Usuarios WHERE id = ${id};
            `
            console.log("Executando a instrução SQL: \n" + instrucaoSql);
            return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    logar,
    getInfoUser,
    atualizarEmail,
    atualizarSenha,
    deletarConta
};