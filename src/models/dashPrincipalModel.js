var database = require("../database/config");

function carregarGraficoBarra(req, res) {

    var instrucaoSql = `
           SELECT * FROM vw_notas;
            `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function carregarGraficoBidirecional(req, res) {

    var instrucaoSql = `
           SELECT
                n.regiao,
                n.media_nota,
                v.media_ptrf,
                n.ano_nota AS ano
            FROM
                vw_notas n
                JOIN vw_verbas v ON v.regiao = n.regiao
                AND v.ano_verba = n.ano_nota
            WHERE
                n.ano_nota = (
                    SELECT
                        MAX(ano_nota)
                    FROM
                        vw_notas
                    WHERE
                        ano_nota IN (
                            SELECT
                                ano_verba
                            FROM
                                vw_verbas
                        )
                )
            ORDER BY n.regiao;
            `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}


function buscarSomaPtrf(req, res) {

    var instrucaoSql = `
        SELECT
            -- 1. Soma Total do Último Ano
            SUM(CASE
                WHEN vw.ano_verba = (SELECT MAX(ano_verba) FROM vw_verbas)
                THEN vw.soma_ptrf
                ELSE 0
            END) AS soma_ultimo_ano,

            -- 2. Soma Total do Penúltimo Ano
            SUM(CASE
                WHEN vw.ano_verba = (
                    SELECT
                        ano_verba
                    FROM
                        vw_verbas
                    GROUP BY
                        ano_verba
                    ORDER BY
                        ano_verba DESC
                    LIMIT 1 OFFSET 1
                )
                THEN vw.soma_ptrf
                ELSE 0
            END) AS soma_penultimo_ano,

            -- 3. Diferença (Calculada após as somas)
            (
                SUM(CASE
                    WHEN vw.ano_verba = (SELECT MAX(ano_verba) FROM vw_verbas)
                    THEN vw.soma_ptrf
                    ELSE 0
                END)
                -
                SUM(CASE
                    WHEN vw.ano_verba = (
                        SELECT
                            ano_verba
                        FROM
                            vw_verbas
                        GROUP BY
                            ano_verba
                        ORDER BY
                            ano_verba DESC
                        LIMIT 1 OFFSET 1
                    )
                    THEN vw.soma_ptrf
                    ELSE 0
                END)
            ) AS diferenca_ptrf,
            
            -- 4. ACRESCENTADO: Último Ano (MAX)
            (SELECT MAX(ano_verba) FROM vw_verbas) AS ultimo_ano,

            -- 5. ACRESCENTADO: Penúltimo Ano
            (
                SELECT
                    ano_verba
                FROM
                    vw_verbas
                GROUP BY
                    ano_verba
                ORDER BY
                    ano_verba DESC
                LIMIT 1 OFFSET 1
            ) AS penultimo_ano
        FROM
            vw_verbas AS vw;
            `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    carregarGraficoBarra,
    carregarGraficoBidirecional,
    buscarSomaPtrf
};