var database = require("../database/config");

function buscarCanais(idUsuario) {
  console.log(
    "ACESSEI O NOTIFICAÇÃO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n "
  );

  var instrucaoSql = `
            SELECT * FROM TB_Canal_Slack WHERE id_usuario IS NULL OR id_usuario = ${idUsuario};
        `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function inserirNotificacao(idUsuario, idCanal, tipoAlerta) {
  console.log(
    "ACESSEI O NOTIFICAÇÃO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n "
  );
  const instrucaoSql = `
INSERT INTO TB_Notificacao_Config(id_usuario, id_canal, tipo_alerta) values(${idUsuario}, ${idCanal}, '${tipoAlerta}')
`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarNotificacoes(idUsuario) {
  console.log(
    "ACESSEI O NOTIFICAÇÃO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n "
  );
  const instrucaoSql = `
SELECT nc.id id_notificacao, cs.nome canalNome ,id_canal, tipo_alerta, date_format( ultimo_disparo,'%d/%m/%Y %h:%i:%s') AS ultimo_disparo FROM TB_Notificacao_Config nc 
JOIN TB_Canal_Slack cs ON nc.id_canal = cs.id WHERE nc.id_usuario = ${idUsuario};
   `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function deletarNotificacao(idNotificacao) {
  console.log(
    "ACESSEI O NOTIFICAÇÃO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n "
  );

  const instrucaoSql = `
DELETE FROM TB_Notificacao_Config WHERE id = ${idNotificacao}
   `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarCanais,
  inserirNotificacao,
  buscarNotificacoes,
  deletarNotificacao,
};
