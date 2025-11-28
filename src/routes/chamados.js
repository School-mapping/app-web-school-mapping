var express = require("express");
var router = express.Router();

var chamadoController = require("../controllers/chamadoController");

router.post("/enviarChamado", function (req, res) {
    chamadoController.enviarChamado(req, res);
});

router.get("/carregarChamados/:idUsuario/:perfil", function(req, res) {
    chamadoController.carregarChamados(req, res);
});

router.put("/finalizarChamado/:idChamado", function (req, res) {
    chamadoController.finalizarChamado(req, res);
});

router.put("/deletarChamado/:idChamado", function (req, res) {
    chamadoController.deletarChamado(req, res);
});

module.exports = router;