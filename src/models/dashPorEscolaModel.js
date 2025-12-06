var database = require("../database/config");


function listarEscolas() {

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

function carregarDadosDashboard(id) {

    var instrucaoSql = `
        SELECT
            id_escola,
            nome_escola,
            ano_ptrf,
            soma_ptrf,
            nota_ideb,
            ano_ideb
        FROM
            vw_escolas
        where
            codigo_inep = ${id}
        order by ano;
            `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function carregarKpiRank() {

    var instrucaoSql = `
       SELECT 
            nome_escola,
            nota_ideb,
            soma_ptrf, 
            ano_ideb,
            codigo_inep,
            (select max(ano) from vw_escolas) as maior_ano,
            DENSE_RANK() OVER (
                ORDER BY 
                    CASE WHEN nota_ideb = 'N/A' THEN 0 ELSE 1 END DESC,
                    CAST(REPLACE(nota_ideb, ',', '.') AS DECIMAL(10,1)) DESC,
                    soma_ptrf ASC
            ) AS ranking
        FROM 
            vw_escolas 
        where nota_ideb <> 'N/A'
        ORDER BY 
            nome_escola ASC;
            `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    listarEscolas,
    carregarDadosDashboard,
    carregarKpiRank
};