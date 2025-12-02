var express = require("express");
var router = express.Router();

var notificacaoController = require("../controllers/notificacaoController");

router.get("/canal", function(req, res) {
    notificacaoController.buscarCanais(req, res);
});

router.post("/inserir", function(req, res) {
    notificacaoController.inserirNotificacao(req, res);
});

router.get("/buscar/:idUsuario", function(req, res) {
console.log("cheguei no routes")
    notificacaoController.buscarNotificacoes(req, res);
    
});


module.exports = router;