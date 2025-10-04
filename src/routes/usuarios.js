var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/logar", function (req, res) {
    usuarioController.logar(req, res);
});

router.get("/getInfoUser/:id", function(req, res) {
    usuarioController.getInfoUser(req, res);
});

router.put("/atualizarEmail/:id", function(req, res) {
    usuarioController.atualizarEmail(req, res);
});

router.put("/atualizarSenha/:id", function(req, res) {
    usuarioController.atualizarSenha(req, res);
})

router.delete("/deletarConta/:id", function(req, res) {
    usuarioController.deletarConta(req, res);
});

module.exports = router;