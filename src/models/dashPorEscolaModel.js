var database = require("../database/config");


function listarEscolas(req, res) {

    var instrucaoSql = `
           select 
                nome_escola,
                codigo_inep,
                nota_ideb,
                endereco,
                cep
            from
                vw_escolas
                where ano = (select max(ano) from vw_escolas)
            order by
                nota_ideb desc ;
            `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    listarEscolas
};