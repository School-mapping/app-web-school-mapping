var notificacaoModel = require("../models/notificacaoModel");

function buscarCanais(req, res) {
  notificacaoModel
    .buscarCanais()
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve erro ao buscar informações dos canais! ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function inserirNotificacao(req, res) {
const idUsuario = req.body.idUsuario
const idCanal = req.body.idCanal
const tipoAlerta = req.body.tipoAlerta


  notificacaoModel
    .inserirNotificacao(idUsuario, idCanal, tipoAlerta)
    .then(function (resultado) {
      res.status(200).json("Inserido com sucesso " + resultado)
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve erro ao inserir notificação! ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    
    });
}

function buscarNotificacoes(req, res){
const idUsuario = req.params.idUsuario

notificacaoModel
.buscarNotificacoes(idUsuario)
.then(function(resultado){
      res.status(200).json(resultado)
})
.catch(function(erro){
  console.log(erro);
  console.log(
     "\nHouve erro ao inserir notificação! ",
        erro.sqlMessage
  );
  res.status(500).json(erro.sqlMessage);
})
}

module.exports = {
  buscarCanais,
  inserirNotificacao,
  buscarNotificacoes
};
