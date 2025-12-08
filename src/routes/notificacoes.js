var express = require("express");
var router = express.Router();

var notificacaoController = require("../controllers/notificacaoController");

router.get("/canal/:idUsuario", function(req, res) {
    notificacaoController.buscarCanais(req, res);
});

router.post("/inserir", function(req, res) {
    notificacaoController.inserirNotificacao(req, res);
});

router.get("/buscar/:idUsuario", function(req, res) {
    notificacaoController.buscarNotificacoes(req, res);
    
});


router.delete("/deletar/:id", function(req, res) {
    notificacaoController.deletarNotificacao(req, res);
});

module.exports = router;